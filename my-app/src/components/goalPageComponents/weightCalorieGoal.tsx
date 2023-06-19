// Buffer Line
import { Fragment, useState, useEffect, useRef, useCallback } from "react";
import { View, Text, Button, TextInput, ScrollView } from "react-native";
import { getFromSecureStore } from "../../storage/secureStore";
import { BodyParams, GoalInputData } from "../../utils/type";
import { Domain } from "@env";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import GoalInputPanel from "./weightCalorieGoalInput";

function GoalInputDisplayPanel() {
  const [inputPanelOpen, toggleInputPanel] = useState<boolean>(false);
  const [inputInfo, updateInputInfo] = useState<GoalInputData>();

  const tokenRef = useRef<string>("");
  const bodyParams = useRef<BodyParams>({ height: 0, weight: 0 });

  const { height, weight } = bodyParams.current;

  const getInputData = async () => {
    const token = await getFromSecureStore("token");
    tokenRef.current = token || "";

    const res = await fetch(`${Domain}/personalTarget`, {
      headers: { authorization: `Bearer ${token}` },
    });
    const result = await res.json();
    if (result.error) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "An Error Occurred",
        textBody: result.error,
        autoClose: 1500,
      });
      return;
    }
    const personalTargetResult = result.personalTargetResult;
    if (personalTargetResult.length === 0) {
      return [];
    }

    const { id, user_id, ...personalTarget } = personalTargetResult[0];
    return personalTarget;
  };

  const getBodyParams = async () => {
    const res = await fetch(`${Domain}/bodyParams}`, {
      headers: { authorization: `Bearer ${tokenRef.current}` },
    });
    const result = await res.json();

    if (result.error) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "An Error Occurred",
        textBody: result.error,
      });
      return;
    }

    bodyParams.current = result.bodyParams;
  };

  const getInputInfo = useCallback(async () => {
    const inputData = await getInputData();
    updateInputInfo(inputData);
    await getBodyParams();
  }, []);

  useEffect(() => {
    getInputInfo();
  }, []);

  const toggleInputPanelVisibility = () =>
    toggleInputPanel((visible: boolean) => !visible);

  const saveInputInfo = (input: GoalInputData) => updateInputInfo(input);

  const countDaysRemaining = (dueDay: Date) => {
    const remainingDays = Math.ceil(
      (dueDay.getTime() - new Date().getTime()) / (24 * 3600 * 1000)
    );
    return remainingDays > 0 ? remainingDays : "Goal Due-Day has been reached";
  };

  const BMRCalculation = () => {
    const { height, weight } = bodyParams.current;
    return (10 * weight + 6.25 * height - 5 * 30 - 73) * 1.375;
  };

  const calculateAverageCalorieNeeded = (inputInfo: GoalInputData) => {
    const { target_type, weight_target, start_date, expected_date } = inputInfo;
    const numberOfDays = Math.ceil(
      (expected_date.getTime() - start_date.getTime()) / (24 * 3600 * 1000)
    );
    let avgCalorieNeeded: number;
    avgCalorieNeeded = BMRCalculation();
    if (target_type === "Maintain Weight") {
      avgCalorieNeeded > 0 ? avgCalorieNeeded : 0;
    } else {
      const netWeight = Math.abs(weight - weight_target);
      const requiredCalories = (netWeight / 0.45) * 3500;
      target_type === "Lose Weight"
        ? (avgCalorieNeeded -= requiredCalories / numberOfDays)
        : (avgCalorieNeeded += requiredCalories / numberOfDays);
    }
    return avgCalorieNeeded;
  };

  return (
    <Fragment>
      {inputPanelOpen ? (
        <GoalInputPanel
          token={tokenRef.current}
          weight={weight}
          togglePanelVisible={toggleInputPanelVisibility}
          updateInputInfo={saveInputInfo}
        />
      ) : (
        <Fragment>
          <View>
            <Text>Target :</Text>
            <Text>{inputInfo ? inputInfo.target_type : "Not Yet Set"}</Text>
          </View>
          <View>
            <Text>Desired weight : </Text>
            <Text>{inputInfo ? inputInfo.weight_target : "Not Yet Set"}</Text>
          </View>
          <View>
            <Text>Days to Complete Goal :</Text>
            <Text>
              {inputInfo
                ? countDaysRemaining(inputInfo.expected_date)
                : "Not Yet Set"}
            </Text>
          </View>
          {inputInfo ? (
            <View>
              <Text>{"Recommended Average Daily Calorie Consumption"}</Text>
              <Text>{calculateAverageCalorieNeeded(inputInfo)}</Text>
            </View>
          ) : null}
        </Fragment>
      )}

      {inputPanelOpen ? null : (
        <Button title="Update" onPress={() => toggleInputPanelVisibility()} />
      )}
    </Fragment>
  );
}

export default GoalInputDisplayPanel;
