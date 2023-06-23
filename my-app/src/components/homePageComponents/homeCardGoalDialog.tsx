// Buffer Line
import { useState, useRef, useEffect, useCallback } from "react";
import { View, Text } from "react-native";
import { AlertDialog, Button } from "native-base";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { GoalDataInfo, GoalInputData } from "../../utils/type";
import { gps } from "../goalPageComponents/goalPageComponentStyleSheet";
import GoalInputPanel from "../goalPageComponents/weightCalorieGoalInput";

export default function GoalDialog(props: {
  token: string;
  weight: number;
  targetInfo: GoalDataInfo | undefined;
  isOpen: boolean;
  onClose: () => void;
  updateInputInfo: (input: GoalInputData) => void;
}) {
  const { token, weight, targetInfo, isOpen, onClose, updateInputInfo } = props;

  const [inputPanelOpen, toggleInputPanel] = useState<boolean>(false);

  const cancelRef = useRef(null);
  const toggleInputPanelVisibility = () =>
    toggleInputPanel((visible: boolean) => !visible);

  const countDaysRemaining = (dueDay: Date) => {
    console.log(dueDay);
    console.log(typeof dueDay);

    const remainingDays = Math.ceil(
      (new Date(dueDay).getTime() - new Date().getTime()) / (24 * 3600 * 1000)
    );
    return remainingDays > 0 ? remainingDays : "Goal Due-Day has been reached";
  };

  return (
    <View>
      <AlertNotificationRoot>
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}
          size="xl"
        >
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header borderBottomWidth={0}>
              <Text>Calories Goal</Text>
            </AlertDialog.Header>
            <AlertDialog.Body>
              {inputPanelOpen ? (
                <GoalInputPanel
                  token={token}
                  weight={weight}
                  togglePanelVisible={toggleInputPanelVisibility}
                  updateInputInfo={updateInputInfo}
                />
              ) : (
                <View
                  style={{ paddingStart: 1, paddingEnd: 5 }}
                  className="-p-2 -m-1"
                >
                  <View style={gps.goalDisplayDiv}>
                    <Text style={gps.goalDisplayTitle}>Target Type :</Text>
                    <Text style={gps.goalDisplayText}>
                      {targetInfo ? targetInfo.targetType : "Not Yet Set"}
                    </Text>
                  </View>
                  <View style={gps.goalDisplayDiv}>
                    <Text style={gps.goalDisplayTitle}>Desired Weight : </Text>
                    <Text style={gps.goalDisplayText}>
                      {targetInfo ? targetInfo.desiredWeight : "Not Yet Set"}
                    </Text>
                  </View>
                  <View style={gps.goalDisplayDiv}>
                    <Text style={gps.goalDisplayTitle}>
                      Days to Complete Goal :
                    </Text>
                    <Text style={gps.goalDisplayText}>
                      {targetInfo
                        ? countDaysRemaining(targetInfo.dueDate)
                        : "Not Yet Set"}
                    </Text>
                  </View>
                  {targetInfo ? (
                    <View style={gps.goalDisplayDiv}>
                      <Text style={gps.goalDisplayTitle}>
                        {`Recommended Average \nDaily Calorie Consumption :`}
                      </Text>
                      <Text style={gps.goalDisplayText}>
                        {`${targetInfo.avgCalorieConsumption} kcal`}
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
            </AlertDialog.Body>
          </AlertDialog.Content>
        </AlertDialog>
      </AlertNotificationRoot>
    </View>
  );
}
