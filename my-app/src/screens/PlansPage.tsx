import { View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Text, Button, Box, NativeBaseProvider, ScrollView } from "native-base";
import { PlanItem } from "../components/plansPageComponents/planItem";
import { PlanSelect } from "../components/plansPageComponents/planSelect";
import { createStackNavigator } from "@react-navigation/stack";
import { PlanDetailScreen } from "./PlansDetailPage";
import { Domain } from "@env";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { get } from "../utils/api";

type Plan = {
  id: number;
  title: string;
  cover_image: string;
};

export function PlansHomeScreen() {
  // console.log("render PlansHomeScreen", new Date());
  const [data, setData] = useState<{
    workoutPlans: Plan[];
    mealPlans: Plan[];
  }>();
  const [currentPlanIndex, setCurrentPlanIndex] = useState<number>(0);

  useEffect(() => {
    get("/plan/overview-list").then(setData);
  }, []);

  // useLayoutEffect(() => {
  //   console.log("did render", new Date());
  // });

  const plans = currentPlanIndex == 0 ? data?.workoutPlans : data?.mealPlans;

  let vdom = (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>Please choose your workout plan or diet plan!</Text>

            {/* <Button onPress={() => setCurrentPlanIndex(0)}>Workout plan</Button>

            <Button onPress={() => setCurrentPlanIndex(1)}>Meal plan</Button> */}

            <SegmentedControlTab
              values={["Workout plan", "Meal Plan"]}
              selectedIndex={currentPlanIndex}
              onTabPress={setCurrentPlanIndex}
            />

            {!plans ? (
              <Text>Loading plans...</Text>
            ) : (
              plans.map((plan) => (
                <PlanItem
                  type={""}
                  image={plan.cover_image}
                  title={plan.title}
                  id={plan.id}
                  key={plan.id}
                />
              ))
            )}

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

  // console.log("will render", new Date());

  return vdom;
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
