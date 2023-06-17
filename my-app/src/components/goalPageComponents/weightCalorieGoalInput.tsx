// Buffer Line
import { Fragment, useState, useEffect, useRef } from "react";
import { View, Text, Button, TextInput, ScrollView } from "react-native";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import { GoalInputData } from "../../utils/type";
import SelectDropdown from "react-native-select-dropdown";
import DateTimePicker from "@mohalla-tech/react-native-date-time-picker";
import { AntDesign } from "@expo/vector-icons";

function GoalInputPanel(props: { token: string }) {
  const { token } = props;

  const [selectedDate, selectNewDate] = useState<Date>(new Date());
  const formInputs = useRef<GoalInputData>({
    targetType: "",
    weightTarget: 0,
    expectedDate: new Date(),
  });

  const targetTypeSelections = [
    "Weight Loss",
    "Maintain Weight",
    "Weight Gain",
  ];

  const updateTargetChoice = (choice: string) => {
    formInputs.current.targetType = choice;
  };

  const updateWeightTarget = (newWeight: number) => {
    formInputs.current.weightTarget = newWeight;
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
        <Text>Weight Target : </Text>
        <TextInput
          inputMode={"decimal"}
          placeholder="Enter Weight Target Here"
          onTextInput={(e: any) => {
            updateWeightTarget(e.target.value);
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
    </Fragment>
  );
}

export default GoalInputPanel;
