import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, Button, Box, NativeBaseProvider, ScrollView } from "native-base";
import { PlanItem } from "../components/plansPageComponents/planItem";
import { PlanSelect } from "../components/plansPageComponents/planSelect";
import { createStackNavigator } from "@react-navigation/stack";
import { PlanDetailScreen } from "./PlansDetailPage";
import { Domain } from "@env";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export function PlansHomeScreen() {
  const [plans, setPlans] = useState<any[]>([
    // {
    //   id: 1,
    //   image:
    //     "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
    //   title: "8 Week Mass Building Hypertrophy Workout",
    //   introduction:
    //     "This 4-day program will help intermediate and advanced trainees gain size and strength. Rest-pause set, drop sets, and negatives will kick your muscle gains into high gear!",
    // },
    // {
    //   id: 2,
    //   image:
    //     "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
    //   title: "8 Week Mass Building Hypertrophy Workout",
    //   introduction:
    //     "This 4-day program will help intermediate and advanced trainees gain size and strength. Rest-pause set, drop sets, and negatives will kick your muscle gains into high gear!",
    // },
  ]);
  // useEffect(() => {
  //   const fetchMealData = async () => {
  //     let res = await fetch(`${Domain}/meal`);
  //     let mealplan_data = await res.json();
  //     console.log(mealplan_data);

  //   };
  //   fetchMealData();
  // }, []);

  useEffect(() => {
    const fetchWorkoutData = async () => {
      console.log("123");
      let res = await fetch(`${Domain}/workout`);
      let workout_data = await res.json();
      console.log(workout_data);

      setPlans(() => {
        return workout_data;
      });
    };
    fetchWorkoutData();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>Please choose your workout plan or diet plan!</Text>
            {/* <PlanSelect /> */}
            {plans.map((plan) => (
              <PlanItem
                type={""}
                image={plan.cover_image}
                title={plan.title}
                id={plan.id}
                key={plan.id}
              />
            ))}

            <Box alignItems="center">
              <Button onPress={() => console.log("hello world")}>
                Click Me
              </Button>
            </Box>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
//Create Stack
const Stack = createStackNavigator();

export const PlansScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PlanHome"
        component={PlansHomeScreen}
        options={{
          headerShown: true,
          title: "Plans",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#38668E" },
          headerTintColor: "#a5f3fc",
        }}
      />
      <Stack.Screen
        name="PlanDetail"
        component={PlanDetailScreen}
        options={{
          headerShown: true,
          title: "Plan Item Detail",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#38668E" },
          headerTintColor: "#a5f3fc",
        }}
      />
    </Stack.Navigator>
  );
};
