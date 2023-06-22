// Buffer Line
import { Fragment, useState, useEffect, useRef, useCallback } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import { Button } from "native-base";
import { BodyParams, GoalInputData } from "../../utils/type";
import { Domain } from "@env";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import GoalInputPanel from "./weightCalorieGoalInput";
import { gps } from "./goalPageComponentStyleSheet";
import { handleToken } from "../../hooks/use-token";

function GoalInputDisplayPanel() {
  const [inputPanelOpen, toggleInputPanel] = useState<boolean>(false);
  const [inputInfo, updateInputInfo] = useState<GoalInputData>();
  const tokenRef = useRef<string>("");
  const bodyParams = useRef<BodyParams>({ height: 0, weight: 0 });

  // const { height, weight } = bodyParams.current;
  const { token } = handleToken();

  const getInputData = async () => {
    tokenRef.current = token || "";

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

  const getBodyParams = async () => {
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

    bodyParams.current = { height, weight };
  };

  const getInputInfo = useCallback(async () => {
    const inputData = await getInputData();
    console.log({ inputData });

    updateInputInfo(inputData);
    await getBodyParams();
  }, []);

  useEffect(() => {
    try {
      getInputInfo();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const toggleInputPanelVisibility = () =>
    toggleInputPanel((visible: boolean) => !visible);

  const saveInputInfo = (input: GoalInputData) => updateInputInfo(input);

  const countDaysRemaining = (dueDay: Date) => {
    console.log(dueDay);
    console.log(typeof dueDay);

    const remainingDays = Math.ceil(
      (new Date(dueDay).getTime() - new Date().getTime()) / (24 * 3600 * 1000)
    );
    return remainingDays > 0 ? remainingDays : "Goal Due-Day has been reached";
  };

  const BMRCalculation = () => {
    const { height, weight } = bodyParams.current;
    return (10 * weight + 6.25 * height - 5 * 60 - 161) * 1.25;
  };

  const calculateAverageCalorieNeeded = (inputInfo: GoalInputData) => {
    const { target_type, weight_target, start_date, expected_date } = inputInfo;
    const numberOfDays = Math.ceil(
      (new Date(expected_date).getTime() - new Date(start_date).getTime()) /
        (24 * 3600 * 1000)
    );
    let avgCalorieNeeded: number;
    avgCalorieNeeded = BMRCalculation();
    if (target_type === "Maintain Weight") {
      avgCalorieNeeded > 0 ? avgCalorieNeeded : 0;
    } else {
      const netWeight = Math.abs(bodyParams.current.weight - weight_target);
      const requiredCalories = netWeight * 1500;
      target_type === "Lose Weight"
        ? (avgCalorieNeeded -= requiredCalories / numberOfDays)
        : (avgCalorieNeeded += requiredCalories / numberOfDays);
    }
    avgCalorieNeeded = parseFloat((avgCalorieNeeded / 1000).toFixed(2));
    return avgCalorieNeeded;
  };

  return (
    <Fragment>
      {inputPanelOpen ? (
        <GoalInputPanel
          token={tokenRef.current}
          weight={bodyParams.current.weight}
          togglePanelVisible={toggleInputPanelVisibility}
          updateInputInfo={saveInputInfo}
        />
      ) : (
        <View style={{ paddingStart: 1, paddingEnd: 5 }} className="-p-2 -m-1">
          <View style={gps.goalDisplayDiv}>
            <Text style={gps.goalDisplayTitle}>Target Type :</Text>
            <Text style={gps.goalDisplayText}>
              {inputInfo ? inputInfo.target_type : "Not Yet Set"}
            </Text>
          </View>
          <View style={gps.goalDisplayDiv}>
            <Text style={gps.goalDisplayTitle}>Desired Weight : </Text>
            <Text style={gps.goalDisplayText}>
              {inputInfo ? inputInfo.weight_target : "Not Yet Set"}
            </Text>
          </View>
          <View style={gps.goalDisplayDiv}>
            <Text style={gps.goalDisplayTitle}>Days to Complete Goal :</Text>
            <Text style={gps.goalDisplayText}>
              {inputInfo
                ? countDaysRemaining(inputInfo.expected_date)
                : "Not Yet Set"}
            </Text>
          </View>
          {inputInfo ? (
            <View style={gps.goalDisplayDiv}>
              <Text style={gps.goalDisplayTitle}>
                {`Recommended Average \nDaily Calorie Consumption :`}
              </Text>
              <Text style={gps.goalDisplayText}>
                {`${calculateAverageCalorieNeeded(inputInfo)} kcal`}
              </Text>
            </View>
          ) : null}
        </View>
      )}

      {inputPanelOpen ? null : (
        <View className="mt-3">
          <Button
            colorScheme="cyan"
            onPress={() => {
              toggleInputPanelVisibility();
            }}
          >
            Update
          </Button>
        </View>
      )}
    </Fragment>
  );
}

export default GoalInputDisplayPanel;
