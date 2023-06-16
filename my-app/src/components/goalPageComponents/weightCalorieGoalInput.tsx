// Buffer Line
import { Fragment, useState, useEffect, useRef } from "react";
import { View, Text, Button, TextInput, ScrollView } from "react-native";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import { GoalInputData } from "../../utils/type";

function GoalInputPanel(props: { token: string }) {
  const { token } = props;
  const formInputs = useRef<GoalInputData>({
    targetType: "",
    weightTarget: 0,
    expectedDate: new Date(),
  });

  const updateWeightTarget = (newWeight: number) => {
    formInputs.current.weightTarget = newWeight;
  };

  return (
    <Fragment>
      <View>
        <Text>Weight Target : </Text>
        <TextInput
          inputMode={"decimal"}
          placeholder="Enter Weight Target Here"
        />
      </View>
    </Fragment>
  );
}

export default GoalInputPanel;
