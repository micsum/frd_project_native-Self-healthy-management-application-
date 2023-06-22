import { View, StyleSheet, Text, Platform } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as Progress from "react-native-progress";
import {
  AuthorizationPermissions,
  FitnessDataType,
  FitnessTracker,
  GoogleFitDataType,
  HealthKit,
  HealthKitDataType,
} from "@kilohealth/rn-fitness-tracker";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Dialog,
} from "react-native-alert-notification";
import { AlertDialog, Button, Center, Input } from "native-base";
import axios from "axios";
import { Domain } from "@env";
import { handleToken } from "../../hooks/use-token";
import { store } from "../../store";
import DateTimePicker from "@react-native-community/datetimepicker";

const permissions: AuthorizationPermissions = {
  healthReadPermissions: [HealthKitDataType.StepCount],
  googleFitReadPermissions: [GoogleFitDataType.Steps],
};

export const GetStepsToday = ({
  onStepsUpdate,
}: {
  onStepsUpdate: (steps: number) => void;
}) => {
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
        console.log("stepToday", stepsToday);
        setSteps(stepsToday);
        onStepsUpdate(stepsToday);
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
  }, [onStepsUpdate]);

  return steps ? (
    <Text className="mx-2 mt-1 text-lg font-bold">{steps}</Text>
  ) : (
    <Text className="mx-2 mt-1 text-lg font-bold">0</Text>
  );
};
const GoalDialog = ({
  isOpen,
  onClose,
  setStepGoal,
}: {
  isOpen: boolean;
  onClose: () => void;
  setStepGoal: Function;
}) => {
  const cancelRef = useRef(null);

  const updateStepGoal = async (goalInput: string) => {
    await axios.post(`${Domain}/user/stepsGoal`, { goalInput }).then(
      (response) => {
        if (response.data) {
          console.log("goal set");
          const dailyStepGoal: any = response.data;

          setStepGoal(goalInput);

          return Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: `Steps Goal Set`,
            textBody: "",
            button: "close",
            autoClose: 5000,
          });
        } else if (response.data.error) {
          console.log("error", response.data.error);
          return Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: `${response.data.error}`,
            textBody: "Please try again",
            button: "close",
            autoClose: 5000,
          });
        }
        return;
      },
      (error) => {
        console.log(error.response.data.message);
        return Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: "Error",
          textBody: `${error.response.data.message}`,
          button: "close",
          autoClose: 5000,
        });
      }
    );
  };

  const [goalInput, setGoalInput] = useState<string>("");
  const handleChange = (input: string) => {
    setGoalInput(input);
  };

  const handleSetGoal = () => {
    updateStepGoal(goalInput);
    setGoalInput("");
    onClose();
  };

  return (
    <View>
      <AlertNotificationRoot>
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header borderBottomWidth={0}>
              Set Steps Daily Goal
            </AlertDialog.Header>
            <AlertDialog.Body>
              <Input
                variant="rounded"
                placeholder="Steps"
                className="items-center justify-center text-center"
                value={goalInput}
                onChangeText={handleChange}
              />
            </AlertDialog.Body>
            <AlertDialog.Footer borderTopWidth={0}>
              <Button.Group space={2}>
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  onPress={onClose}
                  ref={cancelRef}
                >
                  Cancel
                </Button>
                <Button colorScheme="cyan" onPress={handleSetGoal}>
                  Set Goal
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </AlertNotificationRoot>
    </View>
  );
};

export const CardFitnessData = () => {
  const [stepsProgress, setStepsProgress] = useState<number>(0);
  const [stepGoal, setStepGoal] = useState<number | null>(null);
  const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const handleStepsUpdate = (steps: number) => {
    setStepsProgress(steps);
    // setStepGoal(steps);
  };

  const handleOpenGoalDialog = () => {
    setIsGoalDialogOpen(true);
  };

  const handleCloseGoalDialog = () => {
    setIsGoalDialogOpen(false);
  };

  const getStepGoal = async () => {
    const token = store.getState().auth?.token;
    let dbstep = await axios
      .get(`${Domain}/user/stepsGoal`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .catch(async function (error) {
        console.log(error);
      });

    console.log(dbstep?.data);
    const dailyStepGoal: number = dbstep?.data.getStep[0].steps_dailygoal;

    //console.log("stepdb", dbstep.data.getStep[0].steps_dailygoal);

    setStepGoal(dailyStepGoal);
  };

  useEffect(() => {
    getStepGoal();
  }, []);

  useEffect(() => {
    const progress = stepGoal ? stepsProgress / stepGoal : 0;
    setProgress(progress);
    //console.log("%", progress);
  }, [stepGoal, stepsProgress]);

  return (
    <View style={styles.card} className="mt-5 mx-3">
      <View style={styles.header} className="justify-between">
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Steps Today</Text>
        <FontAwesome5
          name="plus"
          size={20}
          color="black"
          onPress={() => {
            handleOpenGoalDialog();
          }}
        />
      </View>
      <View className="flex-col justify-center items-center">
        <View className="mt-6 flex-row mx-5 items-center justify-center">
          <FontAwesome5 name="shoe-prints" size={32} color="green" />
          <GetStepsToday onStepsUpdate={handleStepsUpdate} />
        </View>
        <Progress.Bar
          className="mt-3"
          progress={progress}
          width={200}
          animated
          unfilledColor="#eee"
          color="#369967"
        />
      </View>
      <GoalDialog
        isOpen={isGoalDialogOpen}
        onClose={handleCloseGoalDialog}
        setStepGoal={setStepGoal}
      />
      <View className="flex-row justify-center items-center mt-2">
        {stepGoal !== null ? (
          <Text className="text-slate-500">Daily Goal: {stepGoal}</Text>
        ) : (
          <Text className="text-slate-500">Loading...</Text>
        )}
      </View>
    </View>
  );
};

export const CardExercise = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState<"date" | "time">("date");
  const [show, setShow] = useState(false);
  const onChange = (event: any, selecedDate: Date) => {
    const currentDate = selecedDate;
    setShowPicker(false);
    setDateTime(currentDate);
  };
  const showMode = (currentMode: any) => {
    //if (Platform.OS === "android") {
    // for iOS, add a button that closes the picker
    //}
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View style={styles.card} className="mt-5 mx-3">
      <View style={styles.header}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Exercise</Text>
      </View>
      <Button onPress={showDatepicker}>"Show date picker!"</Button>
      <Button onPress={showTimepicker}>"Show time picker!"</Button>
      <Text>selected: {date.toLocaleString()}</Text>
      {show && (
        <>
          {Platform.OS === "ios" ? (
            <Button onPress={() => setShow(false)}>Close</Button>
          ) : null}
          <DateTimePicker
            testID="dateTimePicker"
            display="spinner"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={(event) => onChange(event, date)}
          />
        </>
      )}
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
