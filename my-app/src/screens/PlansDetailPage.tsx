import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Button, Center, NativeBaseProvider, ScrollView } from "native-base";
import { WorkoutDetailItem } from "../components/plansPageComponents/workoutDetail";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Domain } from "@env";
import { Table, Row, Rows } from "react-native-table-component";

export const PlanDetailScreen = ({ route }: any) => {
  const { id, type } = route.params;
  const [workoutData, setWorkoutData] = useState<any[]>([]);
  useEffect(() => {
    const fetchWorkoutData = async () => {
      console.log("123");
      let res = await fetch(`${Domain}/workout/detail/${id}`);
      let workout_data = await res.json();
      setWorkoutData(workout_data);
    };
    fetchWorkoutData();
  }, []);
  return (
    // <View
    //   style={{
    //     flex: 1,
    //     flexDirection: "row",
    //     justifyContent: "space-between",
    //     padding: 15,
    //     marginTop: 50,
    //   }}
    // >
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView>
          <NativeBaseProvider>
            <Center flex={1} px="3"></Center>
          </NativeBaseProvider>
          {/* <WorkoutDetailItem /> */}
          <Text>id:{id}</Text>

          {workoutData.map((workout) => (
            <>
              <Text>{workout.title}</Text>

              <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
                <Row
                  data={workout.headers}
                  // style={styles.head}
                  // textStyle={styles.text}
                />
                <Rows data={workout.rows} />
              </Table>
            </>
          ))}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
