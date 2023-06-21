import { View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Text, Button, Box, NativeBaseProvider, ScrollView } from "native-base";
import { PlanItem } from "../components/plansPageComponents/planItem";
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
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#d7e0e8",
            }}
          >
            <SegmentedControlTab
              values={["Workout plan", "Meal Plan"]}
              selectedIndex={currentPlanIndex}
              onTabPress={setCurrentPlanIndex}
              tabTextStyle={{ fontWeight: "bold" }}
              tabsContainerStyle={{ margin: 10, marginTop: 10 }}
            />

            {!plans ? (
              <Text>Loading plans...</Text>
            ) : (
              plans.map((plan) => (
                <PlanItem
                  image={plan.cover_image}
                  title={plan.title}
                  id={plan.id}
                  key={plan.id}
                />
              ))
            )}

            <Box alignItems="center">
              <Button
                className="mt-3"
                onPress={() => console.log("hello world")}
              >
                More
              </Button>
            </Box>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );

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
