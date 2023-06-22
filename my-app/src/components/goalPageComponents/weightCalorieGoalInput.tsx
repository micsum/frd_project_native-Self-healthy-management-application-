// Buffer Line
import { Fragment, useState, useEffect, useRef } from "react";
import { View, Text, Button, TextInput, ScrollView } from "react-native";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import { GoalInputData } from "../../utils/type";
import SelectDropdown from "react-native-select-dropdown";
import DateTimePicker from "@mohalla-tech/react-native-date-time-picker";
import { AntDesign } from "@expo/vector-icons";
import { Domain } from "@env";
import { gps } from "./goalPageComponentStyleSheet";

function GoalInputPanel(props: {
  token: string;
  weight: number;
  togglePanelVisible: () => void;
  updateInputInfo: (input: GoalInputData) => void;
}) {
  const { token, weight, togglePanelVisible, updateInputInfo } = props;

  const [selectedDate, selectNewDate] = useState<Date>(new Date());
  const formInputs = useRef<GoalInputData>({
    target_type: "Lose Weight",
    weight_target: 0,
    expected_date: new Date(),
    start_date: new Date(),
  });

  const targetTypeSelections = [
    "Lose Weight",
    "Maintain Weight",
    "Gain Weight",
  ];

  const updateTargetChoice = (choice: string) => {
    formInputs.current.target_type = choice;
  };

  const updateWeightTarget = (newWeight: number) => {
    formInputs.current.weight_target = newWeight;
  };

  useEffect(() => {
    formInputs.current.expected_date = new Date(
      new Date(selectedDate).getTime() + 8 * 3600000
    );
    // Date May Fail
  }, [selectedDate]);

  const updateGoalInputs = async () => {
    const { target_type, weight_target } = formInputs.current;
    if (weight_target < 0.01) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "Invalid Weight",
        textBody: "Please select a valid weight",
      });
      return;
    }

    if (selectedDate.getTime() < new Date().getTime()) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "Invalid Date",
        textBody: "Please select a day in the future",
      });
      return;
    }

    if (target_type === "Lose Weight" && weight < weight_target) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "Impossible Expectation",
        textBody: "Target weight can't be more than current weight",
      });
      return;
    } else if (target_type === "Gain Weight" && weight > weight_target) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "Impossible Expectation",
        textBody: "Target weight can't be less than current weight",
      });
      return;
    }
    console.log(formInputs.current);
    const res = await fetch(`${Domain}/user/personalTarget`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formInputs.current),
    });
    const result = await res.json();

    if (result.message) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "An Error Occurred",
        textBody: result.message[0],
        autoClose: 1500,
      });
      return;
    }

    if (result.error) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "An Error Occurred",
        textBody: result.error,
        autoClose: 1500,
      });
      return;
    }
    updateInputInfo(formInputs.current);
    togglePanelVisible();
  };

  return (
    <Fragment>
      <View style={gps.goalDisplayDiv}>
        <Text style={gps.goalDisplayTitle}>Target Type : </Text>
        <View style={{ borderWidth: 1, borderColor: "black" }}>
          <SelectDropdown
            data={targetTypeSelections}
            defaultButtonText={"Lose Weight"}
            onSelect={(selectedItem, index) => updateTargetChoice(selectedItem)}
            buttonTextAfterSelection={(selectedItem, index) => selectedItem}
            renderDropdownIcon={() => {
              return <AntDesign name="caretdown" size={24} color="black" />;
            }}
            dropdownIconPosition="right"
          />
        </View>
      </View>
      <View style={gps.goalDisplayDiv}>
        <Text style={gps.goalDisplayTitle}>Target Weight : </Text>
        <TextInput
          inputMode={"decimal"}
          placeholder="Enter Weight Target Here"
          onChangeText={(e: any) => {
            updateWeightTarget(parseFloat(e));
          }}
          style={{
            borderWidth: 1,
            borderColor: "black",
            fontSize: 20,
            padding: 3,
            margin: 1,
          }}
        />
      </View>
      <View>
        <Text style={gps.goalDisplayTitle}> Expected Target Date : </Text>
        <View>
          <DateTimePicker
            mode="date"
            initialValue={selectedDate}
            onChange={(date: Date) => selectNewDate(() => date)}
            setError={(err: string) => console.log(err)}
          />
        </View>
      </View>
      <View style={[gps.goalDisplayDiv, { justifyContent: "flex-end" }]}>
        <Button
          color="red"
          title="Cancel"
          onPress={() => togglePanelVisible()}
        />
        <View style={{ marginEnd: 10 }}>
          <Button title="Confirm" onPress={() => updateGoalInputs()} />
        </View>
      </View>
    </Fragment>
  );
}

export default GoalInputPanel;
