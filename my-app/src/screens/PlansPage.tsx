import {
  View,
  ScrollView,
  FlatList,
  StyleSheet,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Text } from "native-base";
import { PlanItem } from "../components/plansPageComponents/planItem";
import { createStackNavigator } from "@react-navigation/stack";
import { PlanDetailScreen } from "./PlansDetailPage";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { get } from "../utils/api";
import { useGetList } from "../hooks/use-get-list";

type Plan = {
  id: number;
  title: string;
  cover_image: string;
};

export function PlansHomeScreen() {
  const [data, setData] = useState<{
    workoutPlans: Plan[];
    mealPlans: Plan[];
  }>({
    workoutPlans: [],
    mealPlans: [],
  });
  const styles = StyleSheet.create({
    flatList: {
      height: 580,
    },
  });

  const [currentPlanIndex, setCurrentPlanIndex] = useState<number>(0);

  useEffect(() => {
    get("/plan/overview-list").then(setData);
  }, []);

  const workoutList = useGetList<Plan>("/workout/list");
  const mealPlanList = useGetList<Plan>("/meal/list");
  const plans = currentPlanIndex == 0 ? workoutList : mealPlanList;

  let vdom = (
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

          <View>
            <Text>{plans.error}</Text>
          </View>
        </View>
      </ScrollView>
      {plans.list.length === 0 ? (
        <Text>Loading plans...</Text>
      ) : (
        <FlatList
          style={styles.flatList}
          data={plans.list}
          onEndReached={plans.fetchMore}
          keyExtractor={(plan) => plan.id.toString()}
          renderItem={({ item: plan }) => (
            <PlanItem
              image={plan.cover_image}
              title={plan.title}
              id={plan.id}
            />
          )}
        />
      )}
    </SafeAreaView>
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
