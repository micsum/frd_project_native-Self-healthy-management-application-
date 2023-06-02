import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { HomeScreen } from "../screens/HomePage";
import { NavigationContainer } from "@react-navigation/native";
import { MealScreen } from "../screens/MealPage";
import { CalenderScreen } from "../screens/CalendarPage";
import { PlansPage } from "../screens/PlansPage";
import { MoreScreen } from "../screens/MorePage";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";

import React from "react";
const Tab = createMaterialBottomTabNavigator();

export function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#eb86a8"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: "#694fad" }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: () => (
            <FontAwesome5 name="home" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Meal"
        component={MealScreen}
        options={{
          tabBarLabel: "Meal",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="silverware-fork-knife"
              size={24}
              color="black"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalenderScreen}
        options={{
          tabBarLabel: "Calendar",
          tabBarIcon: () => (
            <FontAwesome5 name="calendar-alt" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Plans"
        component={PlansPage}
        options={{
          tabBarLabel: "Plans",
          tabBarIcon: () => (
            <FontAwesome5 name="clipboard-list" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
          tabBarLabel: "More",
          tabBarIcon: () => (
            <Feather name="more-horizontal" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
