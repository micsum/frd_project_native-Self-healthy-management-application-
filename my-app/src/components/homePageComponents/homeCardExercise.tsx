import { View, StyleSheet, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import * as Progress from "react-native-progress";

import {
  AuthorizationPermissions,
  FitnessDataType,
  FitnessTracker,
  // GoogleFitDataType,
  HealthKitDataType,
} from "@kilohealth/rn-fitness-tracker";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
const permissions: AuthorizationPermissions = {
  healthReadPermissions: [HealthKitDataType.StepCount],
  // googleFitReadPermissions: [GoogleFitDataType.Steps],
};

export const GetStepsToday = () => {
  const [steps, setSteps] = useState<number | undefined>();
  useEffect(() => {
    const getStepsToday = async () => {
      try {
        const authorized = await FitnessTracker.authorize(permissions);

        if (!authorized) return;

        const stepsToday = await FitnessTracker.getStatisticTodayTotal(
          FitnessDataType.Steps
        );

        // returns the number of steps walked today, e.g. 320
        console.log(stepsToday);
        setSteps(stepsToday);
      } catch (error) {
        // Handle error here
        console.log("error", error);

        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: `${error}`,
          textBody: "Please try again",
          button: "close",
          autoClose: 5000,
        });
      }
    };

    getStepsToday();
  }, []);

  return steps ? (
    <Text className="mx-2 mt-1 text-lg font-bold">{steps}</Text>
  ) : (
    <Text className="mx-2 mt-1 text-lg font-bold">0</Text>
  );
};

export const CardFitnessData = ({ stepsGoal }: { stepsGoal: number }) => {
  const [stepsProgress, setStepsProgress] = useState<number>(0);
  const progress = (stepsProgress / stepsGoal) * 100;
  const handleStepsUpdate = (steps: number) => {
    setStepsProgress(steps);
  };
  return (
    <View style={styles.card} className="mt-5 mx-3">
      <View style={styles.header} className="justify-between">
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Steps Today</Text>
        <FontAwesome5
          name="plus"
          size={20}
          color="black"
          onPress={() => {
            console.log("test");
          }}
        />
      </View>
      <View className="flex-col justify-center items-center">
        <View className="mt-10 flex-row mx-5 items-center justify-center">
          <FontAwesome5 name="shoe-prints" size={32} color="green" />
          <GetStepsToday />
        </View>
        <Progress.Bar className="mt-3" progress={progress} width={200} />
      </View>
    </View>
  );
};

export const CardExercise = () => {
  const {} = useState();

  return (
    <View style={styles.card} className="mt-5 mx-3">
      <View style={styles.header}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Exercise</Text>
      </View>
      <Text style={{ color: "gray" }}></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 150,
    width: "80%",
    backgroundColor: "white",
    borderRadius: 15,
    elevation: 10,
    padding: 10,
    //shadowColor: "#000",
    //shadowOffset: { width: 0, height: 3 },
    //shadowOpacity: 0.5,
    //shadowRadius: 5,
  },

  header: {
    flexDirection: "row",
  },
});
