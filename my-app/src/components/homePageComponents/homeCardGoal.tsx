import React, { useState, useEffect, useRef, useCallback } from "react";
import { Box, AspectRatio, Center } from "native-base";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import GoalDialog from "./homeCardGoalDialog";
import { BodyParams, ExInfo, GoalInputData } from "../../utils/type";
import { handleToken } from "../../hooks/use-token";
import { Domain } from "@env";
import axios from "axios";
import * as Progress from "react-native-progress";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export const CardGoal = (props: { exInfo: ExInfo[] }) => {
  const { exInfo } = props;
  const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false);
  const [inputInfo, updateInputInfo] = useState<GoalInputData>();

  const foodCalories = useRef<number>(0);
  const exerciseCalories = exInfo.reduce(
    (acc, elem) => acc + parseFloat(parseFloat(elem.burnt_calories).toFixed(2)),
    0
  );
  const goalCalories = useRef<number>(0);
  const tokenRef = useRef<string>("");
  const [bodyParams, setBodyParams] = useState<BodyParams>({
    height: 0,
    weight: 0,
  });

  const [progress, setProgress] = useState(0);
  const [dummy, forceUpdate] = useState<boolean>(false);

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
    updateInputInfo(personalTarget);
  };

  const getFoodCalories = async () => {
    const caloriesResult = await axios
      .get(`${Domain}/mealItem/nutritionDetail/${new Date().toISOString()}/1`)
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
    foodCalories.current = caloriesResult;
  };

  const getFullInfo = async () => {
    await getBodyParams();
    await getFoodCalories();
    await getInputData();
    forceUpdate((dummy: boolean) => !dummy);
  };

  const returnNewProgress = () => {
    const updatedGoalCalories = goalCalories.current;
    const updatedFoodCalories = foodCalories.current;
    //console.log(exerciseCalories);
    const remainingCalories =
      updatedGoalCalories * 1000 + updatedFoodCalories - exerciseCalories;

    //console.log(updatedGoalCalories);
    //console.log(foodCalories);
    //console.log(exerciseCalories);

    //console.log(`remaining calories :${remainingCalories}`);
    let result: number;
    if (remainingCalories < 0) {
      result = 100;
    } else if (updatedGoalCalories === 0) {
      result = 0;
    } else {
      result = parseFloat(
        (
          (updatedGoalCalories * 1000 - remainingCalories) /
          (updatedGoalCalories * 1000)
        ).toFixed(2)
      );
    }
    console.log(result);

    return result < 0 ? 0 : result * 100;
  };

  useEffect(() => {
    getFullInfo();
  }, []);

  useEffect(() => {
    setProgress(returnNewProgress());
  }, [inputInfo, foodCalories, exInfo]);

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
    <Pressable
      onPress={() => {
        handleGoalDialog();
      }}
    >
      <View style={styles.card} className="mt-2 m-3 p-3">
        <Box className="flex-row justify-around">
          <Center
            bg="violet.600"
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
              {/*<Progress.Circle
              progress={progress}
              showsText
              animated
              direction="clockwise"
              unfilledColor="white"
              color="#38668E"
              thickness={2}
              size={150}
              className="mt-9 mr-36"
        />*/}
              <View className="mt-9">
                <View className="flex-row items-center justify-between">
                  <View className="">
                    <AnimatedCircularProgress
                      size={150}
                      fill={progress}
                      width={15}
                      tintColor="#29a0b1"
                      backgroundColor="#d7e0e8"
                      rotation={0}
                    >
                      {(progress) => (
                        <Text className="text-2xl">{`${progress}%`}</Text>
                      )}
                    </AnimatedCircularProgress>
                  </View>
                  <View className="mx-7 flex-col justify-center">
                    <View className="flex-row items-center mb-2">
                      <Entypo name="flag" size={24} color="#8699a3" />
                      <View className="mx-1">
                        <Text>Target</Text>
                        <Text>{`${goalCalories.current * 1000}`}</Text>
                      </View>
                    </View>
                    <View className="flex-row items-center mb-2">
                      <MaterialCommunityIcons
                        name="silverware-fork-knife"
                        size={24}
                        color="#000C66"
                      />
                      <View className="mx-1">
                        <Text>Food</Text>
                        <Text>{`${Math.ceil(
                          +foodCalories.current.toFixed(2)
                        )}`}</Text>
                      </View>
                    </View>
                    <View className="flex-row items-center">
                      <MaterialIcons
                        name="local-fire-department"
                        size={24}
                        color="#ed7377"
                      />
                      <View className="mx-1">
                        <Text>Exercise</Text>
                        <Text>{`${exerciseCalories}`}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </AspectRatio>
          {/*<View className="mr-3 mt-1">
            <FontAwesome5 name="plus" size={20} color="black" />
                        </View>*/}
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
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 270,
    width: "94%",
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
