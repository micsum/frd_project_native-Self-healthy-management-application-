import React, { useState, useEffect, useRef, useCallback } from "react";
import { Box, AspectRatio, Center } from "native-base";
import { View, StyleSheet, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import GoalDialog from "./homeCardGoalDialog";
import { BodyParams, GoalInputData } from "../../utils/type";
import { handleToken } from "../../hooks/use-token";
import { Domain } from "@env";
import axios from "axios";

export const CardGoal = () => {
  const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false);
  const [inputInfo, updateInputInfo] = useState<GoalInputData>();
  const [foodCalories, setFoodCalories] = useState<number>(0);

  const goalCalories = useRef<number>();
  const tokenRef = useRef<string>("");
  const [bodyParams, setBodyParams] = useState<BodyParams>({
    height: 0,
    weight: 0,
  });

  const { token } = handleToken();

  const getBodyParams = async () => {
    tokenRef.current = token || "";

    const res = await fetch(`${Domain}/user/bodyParams`, {
      headers: { authorization: `Bearer ${tokenRef.current}` },
    });
    const result = await res.json();
    console.log(result);

    if (result.error) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "An Error Occurred",
        textBody: result.error,
      });
      return;
    }

    let bodyParamsResult = result[0];
    let height = parseFloat(bodyParamsResult.height);
    let weight = parseFloat(bodyParamsResult.weight);

    setBodyParams({ height, weight });
  };

  const getInputData = async () => {
    const res = await fetch(`${Domain}/user/personalTarget`, {
      headers: { authorization: `Bearer ${token}` },
    });

    const result = await res.json();
    console.log({ result });

    if (result.error) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "An Error Occurred",
        textBody: result.error,
        autoClose: 1500,
      });
      return;
    }

    const personalTargetResult = result.personalTarget;
    if (personalTargetResult.length === 0) {
      return null;
    }
    const { id, user_id, ...personalTarget } = personalTargetResult[0];
    return personalTarget;
  };

  const getFoodCalories = async () => {
    const caloriesResult = await axios
      .get(`${Domain}/mealItem/nutritionDetail/${new Date()}/1`)
      .then((response: any) => {
        const result = response.data;
        if (result.error) {
          if (result.error.message) {
            return Dialog.show({
              type: ALERT_TYPE.DANGER,
              title: "An Error Occurred",
              textBody: result.error.message[0],
              autoClose: 1500,
            });
          }
          return Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: "An Error Occurred",
            textBody: result.error,
            autoClose: 1500,
          });
        }

        return result.dailyNutritionResult[0].calories;
      });
    setFoodCalories(caloriesResult);
  };

  useEffect(() => {
    console.log(`here`);

    console.log(foodCalories);
  }, [foodCalories]);

  const getFullInfo = useCallback(async () => {
    await getBodyParams();
    await getFoodCalories();
    const inputData = await getInputData();
    updateInputInfo(inputData);
  }, []);

  useEffect(() => {
    getFullInfo();
  }, []);

  const handleGoalDialog = () => {
    setIsGoalDialogOpen((open: boolean) => !open);
  };

  const BMRCalculation = () => {
    const { height, weight } = bodyParams;
    return (10 * weight + 6.25 * height - 5 * 60 - 161) * 1.25;
  };

  const calculateAverageCalorieNeeded = (inputInfo: GoalInputData) => {
    const { target_type, weight_target, start_date, expected_date } = inputInfo;

    const numberOfDays = Math.ceil(
      (new Date(expected_date).getTime() - new Date(start_date).getTime()) /
        (24 * 3600 * 1000)
    );
    if (numberOfDays < 1) {
      return 0;
    }

    let avgCalorieNeeded: number;
    avgCalorieNeeded = BMRCalculation();
    if (target_type === "Maintain Weight") {
      avgCalorieNeeded > 0 ? avgCalorieNeeded : 0;
    } else {
      const netWeight = Math.abs(bodyParams.weight - weight_target);
      const requiredCalories = netWeight * 1500;
      target_type === "Lose Weight"
        ? (avgCalorieNeeded -= requiredCalories / numberOfDays)
        : (avgCalorieNeeded += requiredCalories / numberOfDays);
    }
    avgCalorieNeeded = parseFloat((avgCalorieNeeded / 1000).toFixed(2));
    return avgCalorieNeeded;
  };

  const generateTargetInfo = (inputInfo: GoalInputData | undefined) => {
    if (inputInfo === undefined) {
      return undefined;
    }
    goalCalories.current = calculateAverageCalorieNeeded(inputInfo);
    const { target_type, weight_target, expected_date } = inputInfo;
    return {
      targetType: target_type,
      desiredWeight: weight_target,
      dueDate: expected_date,
      avgCalorieConsumption: goalCalories.current,
    };
  };

  const changeInputInfo = (input: GoalInputData) => {
    updateInputInfo(input);
  };

  return (
    <View style={styles.card} className="mt-2 m-3 p-3">
      <Box className="flex-row justify-around">
        <Center
          bg="violet.500"
          _dark={{
            bg: "violet.400",
          }}
          _text={{
            color: "warmGray.50",
            fontWeight: "700",
            fontSize: "md",
          }}
          position="absolute"
          top="0"
          mx="1"
          mt="0"
          px="3"
          py="1.5"
          borderRadius={"sm"}
        >
          Goal
        </Center>
        <AspectRatio w="100%" ratio={16 / 9}>
          <View className="flex-col items-center ml-3">
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Calories</Text>
            <Text className="text-slate-500 ml-5">
              Remaining = Goal + Food - Exercise
            </Text>
          </View>
        </AspectRatio>
        <View className="mr-3 mt-1">
          <FontAwesome5
            name="plus"
            size={20}
            color="black"
            onPress={() => {
              handleGoalDialog();
            }}
          />
        </View>
      </Box>
      <GoalDialog
        token={tokenRef.current}
        weight={bodyParams.weight}
        targetInfo={generateTargetInfo(inputInfo)}
        isOpen={isGoalDialogOpen}
        onClose={handleGoalDialog}
        updateInputInfo={changeInputInfo}
      ></GoalDialog>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 300,
    width: "95%",
    backgroundColor: "white",
    borderRadius: 15,
    elevation: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});
