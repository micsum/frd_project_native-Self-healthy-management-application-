// Buffer Line
import { Fragment, useState, useEffect, useRef, useCallback } from "react";
import { View, Text, Button, TextInput, ScrollView } from "react-native";
import { getFromSecureStore } from "../../storage/secureStore";
import { GoalInputData } from "../../utils/type";
import { Domain } from "@env";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import GoalInputPanel from "./weightCalorieGoalInput";

function GoalInputDisplayPanel() {
  const [inputPanelOpen, toggleInputPanel] = useState<boolean>(false);
  const tokenRef = useRef<string>("");
  const inputInfo = useRef<GoalInputData>();

  const getInputData = async () => {
    const token = await getFromSecureStore("token");
    tokenRef.current = token || "";

    const res = await fetch(`${Domain}/""/${token}`);
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
    return result;
  };

  const getInputInfo = useCallback(async () => {
    const inputData = await getInputData();
    inputInfo.current = inputData;
  }, []);

  //   useEffect(() => {
  //     getInputInfo();
  //   }, []);

  const toggleInputPanelVisibility = () => {
    toggleInputPanel((visible: boolean) => !visible);
  };

  return (
    <Fragment>
      {inputPanelOpen ? (
        <GoalInputPanel token={tokenRef.current} />
      ) : (
        <Fragment>
          <View>
            <Text>
              Weight{" "}
              <Text>
                {inputInfo.current ? inputInfo.current.targetType : ""}
              </Text>{" "}
              Target
            </Text>
            <Text>
              {inputInfo.current
                ? inputInfo.current.weightTarget
                : "Not Yet Set"}
            </Text>
          </View>
          <View>
            <Text>Days to Complete Goal :</Text>
            <Text>{inputInfo.current ? /**/ null : "Not Yet Set"}</Text>
          </View>
          <View>
            <Text>Recommended Average Calories' Consumption</Text>
            <Text>{}</Text>
          </View>
        </Fragment>
      )}

      <Button
        title={inputPanelOpen ? "Close" : "Update"}
        onPress={() => toggleInputPanelVisibility()}
      />
    </Fragment>
  );
}

export default GoalInputDisplayPanel;
