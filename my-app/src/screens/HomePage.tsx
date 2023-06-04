import React, { useState } from "react";
import { Text, View, Button, StyleSheet, SafeAreaView } from "react-native";
import { CardGoal } from "../components/homeCardGoal";
import { ScrollView, HStack, Avatar as NativeAvatar } from "native-base";
import { createStackNavigator } from "@react-navigation/stack";
import { NotifyScreen } from "./NotificationPage";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { CardExercise, CardFitnessData } from "../components/homeCardExercise";
import { CardWeight } from "../components/homeCardWeight";
import PagerView from "react-native-pager-view";

export const AvatarPic = () => {
  return (
    <HStack justifyContent="space-between">
      <NativeAvatar bg="blue.300">
        <FontAwesome name="user-circle-o" size={48} color="black" />
      </NativeAvatar>
    </HStack>
  );
};

export const Notification = () => {
  const navigation = useNavigation();

  return (
    <MaterialIcons
      name="notifications"
      size={36}
      color="black"
      onPress={() => navigation.navigate()}
    />
  );
};

export function HomeScreen() {
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 15,
          marginTop: 60,
        }}
      >
        <AvatarPic />
        <Text> beHealthy </Text>
        <Notification />
      </View>
      <CardGoal />
      <CardFitnessData />
      <CardExercise />
      <CardWeight />
    </ScrollView>
  );
}
