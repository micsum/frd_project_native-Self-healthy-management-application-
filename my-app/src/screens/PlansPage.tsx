import { View } from "react-native";
import React, { useState } from "react";
import { Text, Button, Box, NativeBaseProvider, ScrollView } from "native-base";
import { PlanItem } from "../components/plansPageComponents/planItem";
import { PlanSelect } from "../components/plansPageComponents/planSelect";
import { createStackNavigator } from "@react-navigation/stack";
import { PlanDetailScreen } from "./PlansDetailPage";

export function PlansHomeScreen() {
  const [plans, setPlans] = useState<any[]>([
    {
      id: 1,
      image:
        "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
      title: "8 Week Mass Building Hypertrophy Workout",
      introduction:
        "This 4-day program will help intermediate and advanced trainees gain size and strength. Rest-pause set, drop sets, and negatives will kick your muscle gains into high gear!",
    },
    {
      id: 2,
      image:
        "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
      title: "8 Week Mass Building Hypertrophy Workout",
      introduction:
        "This 4-day program will help intermediate and advanced trainees gain size and strength. Rest-pause set, drop sets, and negatives will kick your muscle gains into high gear!",
    },
  ]);
  return (
    <ScrollView>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Please choose your workout plan or diet plan!</Text>
        <PlanSelect />
        {plans.map((plan) => (
          <PlanItem
            image={plan.image}
            title={plan.title}
            id={plan.id}
            introduction={plan.introduction}
          />
        ))}

        <Box alignItems="center">
          <Button onPress={() => console.log("hello world")}>Click Me</Button>
        </Box>
      </View>
    </ScrollView>
  );
}
const Stack = createStackNavigator();

export const PlansScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PlanHome"
        component={PlansHomeScreen}
        options={{
          headerShown: true,
          title: "Plan Item Detail",
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
