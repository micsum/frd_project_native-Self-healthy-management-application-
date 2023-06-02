import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { HomeScreen } from "../screens/HomePage";
import { NavigationContainer } from "@react-navigation/native";
import { MealScreen } from "../screens/MealPage";
import { CalenderScreen } from "../screens/CalendarPage";
import { PlansPage } from "../screens/PlansPage";
import { MoreScreen } from "../screens/MorePage";
import React from "react";
const Tab = createMaterialBottomTabNavigator();

export function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#e91e63"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: "#694fad" }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Meal" component={MealScreen} />
      <Tab.Screen name="Calendar" component={CalenderScreen} />
      <Tab.Screen name="Plans" component={PlansPage} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
}
