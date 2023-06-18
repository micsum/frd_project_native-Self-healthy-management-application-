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
  const bodyParams = useRef<{ height: number; weight: number }>({
    height: 0,
    weight: 0,
  });

  const { height, weight } = bodyParams.current;

  //   const getInputData = async () => {
  //     const token = await getFromSecureStore("token");
  //     tokenRef.current = token || "";

  //     const res = await fetch(`${Domain}/""/${token}`);
  //     const result = await res.json();
  //     if (result.error) {
  //       Dialog.show({
  //         type: ALERT_TYPE.DANGER,
  //         title: "An Error Occurred",
  //         textBody: result.error,
  //         autoClose: 1500,
  //       });
  //       return;
  //     }
  //     return result;
  //   };

  //   const getBodyParams = async () => {
  //     const res = await fetch(`${Domain}/""/${tokenRef.current}`);
  //     const result = await res.json();

  //     if (result.error) {
  //       Dialog.show({
  //         type: ALERT_TYPE.WARNING,
  //         title: "An Error Occurred",
  //         textBody: result.error,
  //       });
  //       return;
  //     }

  //     bodyParams.current = result;
  //   };

  //   const getInputInfo = useCallback(async () => {
  //     const inputData = await getInputData();
  //     getBodyParams()
  //     inputInfo(inputData);
  //   }, []);

  //   useEffect(() => {
  //     getInputInfo();
  //   }, []);

  const toggleInputPanelVisibility = () =>
    toggleInputPanel((visible: boolean) => !visible);

  const saveInputInfo = (input: GoalInputData) => updateInputInfo(input);

  const countDaysRemaining = (dueDay: Date) => {
    const remainingDays = Math.ceil(
      (dueDay.getTime() - new Date().getTime()) / (24 * 3600 * 1000)
    );
    return remainingDays > 0 ? remainingDays : "Goal Due-Day has been reached";
  };

  const BMRCalculation = (bodyParams: BodyParams) => {
    const { height, weight } = bodyParams;
    return (10 * weight + 6.25 * height - 5 * 30 - 73) * 1.375;
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
            <Text>{inputInfo ? inputInfo.targetType : "Not Yet Set"}</Text>
          </View>
          <View>
            <Text>Desired weight : </Text>
            <Text>{inputInfo ? inputInfo.weightTarget : "Not Yet Set"}</Text>
          </View>
          <View>
            <Text>Days to Complete Goal :</Text>
            <Text>
              {inputInfo
                ? countDaysRemaining(inputInfo.expectedDate)
                : "Not Yet Set"}
            </Text>
          </View>
          <View>
            <Text>Recommended Daily Calories Needs</Text>
            <Text>{}</Text>
          </View>
        </Fragment>
      )}

      {inputPanelOpen ? null : (
        <Button title="Update" onPress={() => toggleInputPanelVisibility()} />
      )}
    </Fragment>
  );
}

export default GoalInputDisplayPanel;
