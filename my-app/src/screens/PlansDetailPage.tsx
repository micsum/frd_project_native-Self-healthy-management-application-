import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Image,
  Text,
  Button,
  Center,
  NativeBaseProvider,
  ScrollView,
} from "native-base";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Domain } from "@env";
import { Table, Row, Rows } from "react-native-reanimated-table";
import { handleToken } from "../hooks/use-token";

export const PlanDetailScreen = ({ route }: any) => {
  const { id } = route.params;
  const [workoutData, setWorkoutData] = useState<any[]>([]);
  const [mealplanData, setMealplanData] = useState<any[]>([]);
  const { token } = handleToken();

  useEffect(() => {
    const fetchWorkoutData = async () => {
      console.log(token);
      try {
        let res = await fetch(`${Domain}/workout/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        let workout_data = await res.json();
        console.log({ workout_data });
        setWorkoutData(workout_data);
      } catch (error) {
        console.log(`can't fetch the data`);
      }
    };
    fetchWorkoutData();
  }, []);

  useEffect(() => {
    const fetchMealPlanData = async () => {
      try {
        let res = await fetch(`${Domain}/meal/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        let mealplan_data = await res.json();
        console.log({ mealplan_data });
        setMealplanData(mealplan_data);
      } catch (error) {
        console.log(`can't fetch the data`);
      }
    };
    fetchMealPlanData();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView>
          <NativeBaseProvider></NativeBaseProvider>

          {mealplanData.map((mealplan) => (
            <View key={mealplan.id}>
              <Text fontSize="2xl" underline>
                {mealplan.name}
              </Text>

              <Image
                source={{
                  uri: mealplan.cover_image,
                }}
                // alt="Alternate Text"
                size="2xl"
                alt="image"
              />
              {mealplan.content.map((content: any) => (
                <View key={content.id}>
                  <Text fontSize="lg">
                    {content.name} (Calories:{content.calories})
                  </Text>
                  {content.foods.map((food: any) => (
                    <Text key={food.name}>- {food.name}</Text>
                  ))}
                </View>
              ))}
            </View>
          ))}

          {workoutData.map((workout) => (
            <View key={workout.id}>
              <Text fontSize={"xl"}>{workout.title}</Text>

              <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
                <Row
                  data={workout.headers}
                  style={styles.head}
                  textStyle={styles.text}
                />
                <Rows data={workout.rows} textStyle={styles.text} />
              </Table>
              <Text></Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#fff",
  },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { textAlign: "center" },
});
