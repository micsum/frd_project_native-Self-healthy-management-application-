// Buffer Line
import { Fragment, useState, useEffect, useRef } from "react";
import { View, Text, Button, TextInput, ScrollView } from "react-native";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import { GoalInputData } from "../../utils/type";
import SelectDropdown from "react-native-select-dropdown";
import DateTimePicker from "@mohalla-tech/react-native-date-time-picker";
import { AntDesign } from "@expo/vector-icons";
import { Domain } from "@env";

function GoalInputPanel(props: {
  token: string;
  weight: number;
  togglePanelVisible: () => void;
  updateInputInfo: (input: GoalInputData) => void;
}) {
  const { token, weight, togglePanelVisible, updateInputInfo } = props;

  const [selectedDate, selectNewDate] = useState<Date>(new Date());
  const formInputs = useRef<GoalInputData>({
    targetType: "",
    weightTarget: 0,
    expectedDate: new Date(),
    startDate: new Date(),
  });

  const targetTypeSelections = [
    "Lose Weight",
    "Maintain Weight",
    "Gain Weight",
  ];

  const updateTargetChoice = (choice: string) => {
    formInputs.current.targetType = choice;
  };

  const updateWeightTarget = (newWeight: number) => {
    formInputs.current.weightTarget = newWeight;
  };

  useEffect(() => {
    formInputs.current.expectedDate = new Date(
      new Date(selectedDate).getTime() + 8 * 3600000
    );
  }, [selectedDate]);

  const updateGoalInputs = async () => {
    const { targetType, weightTarget } = formInputs.current;
    if (weightTarget < 0.01) {
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

    if (targetType === "Lose Weight" && weight < weightTarget) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "Impossible Expectation",
        textBody: "Target weight can't be more than current weight",
      });
      return;
    } else if (targetType === "Gain Weight" && weight > weightTarget) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "Impossible Expectation",
        textBody: "Target weight can't be less than current weight",
      });
      return;
    }

    // const res = await fetch(`${Domain}/""/${token}`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formInputs.current),
    // });
    // const result = await res.json();
    // if (result.error) {
    //   Dialog.show({
    //     type: ALERT_TYPE.DANGER,
    //     title: "An Error Occurred",
    //     textBody: result.error,
    //     autoClose: 1500,
    //   });
    //   return;
    // }
    updateInputInfo(formInputs.current);
    togglePanelVisible();
  };

  return (
    <Fragment>
      <View>
        <SelectDropdown
          data={targetTypeSelections}
          defaultButtonText={"Weight Loss"}
          onSelect={(selectedItem, index) => updateTargetChoice(selectedItem)}
          buttonTextAfterSelection={(selectedItem, index) => selectedItem}
          renderDropdownIcon={() => {
            return <AntDesign name="caretdown" size={24} color="black" />;
          }}
          dropdownIconPosition="right"
        />
      </View>
      <View>
        <Text>Target Weight : </Text>
        <TextInput
          inputMode={"decimal"}
          placeholder="Enter Weight Target Here"
          onChangeText={(e: any) => {
            updateWeightTarget(parseFloat(e));
          }}
        />
      </View>
      <View>
        <DateTimePicker
          mode="date"
          initialValue={selectedDate}
          onChange={(date: Date) => selectNewDate(() => date)}
          setError={(err: string) => console.log(err)}
        />
      </View>
      <View>
        <Button title="Confirm" onPress={() => updateGoalInputs()} />
      </View>
    </Fragment>
  );
}

export default GoalInputPanel;
