import React, { useEffect, useRef, useState } from "react";
import { Text, View, Animated } from "react-native";
import { CardGoal } from "../components/homeCardGoal";
import { ScrollView, HStack, Avatar as NativeAvatar } from "native-base";
import { createStackNavigator } from "@react-navigation/stack";
import { NotifyScreen } from "./NotificationPage";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { CardExercise, CardFitnessData } from "../components/homeCardExercise";
import { CardWeight } from "../components/homeCardWeight";
import { ProfileScreen } from "./ProfilePage";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export const AvatarPic = () => {
  const navigation = useNavigation();

  const isPressed = () => {
    //@ts-ignore
    navigation.navigate("Profile");
  };
  return (
    <HStack justifyContent="space-between">
      <NativeAvatar bg="blue.300">
        <FontAwesome
          name="user-circle-o"
          size={48}
          color="black"
          onPress={isPressed}
        />
      </NativeAvatar>
    </HStack>
  );
};

export const Notification = () => {
  const navigation = useNavigation();

  const isPressed = () => {
    //@ts-ignore
    navigation.navigate("Notify");
  };
  return (
    <View>
      <MaterialIcons
        name="notifications"
        size={36}
        color="black"
        onPress={isPressed}
      />
    </View>
  );
};

const AnimatedText = () => {
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.spring(bounceAnim, {
          toValue: 1,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.spring(bounceAnim, {
          toValue: 0,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bounceAnim]);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Animated.Text
        style={{
          transform: [
            {
              translateY: bounceAnim.interpolate({
                inputRange: [0, 3],
                outputRange: [0, -20],
              }),
            },
          ],
          fontSize: 24,
          fontWeight: "bold",
          color: "#fff",
          marginRight: 5,
        }}
      >
        beHealthy
      </Animated.Text>
      <FontAwesome5 name="heartbeat" size={32} color="black" />
    </View>
  );
};

export function HomeScreenNoStack() {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: insets.top,
          padding: 10,
          marginBottom: 15,
          backgroundColor: "#38668E",
        }}
      >
        <AvatarPic />
        <AnimatedText />
        <Notification />
      </View>
      <CardGoal />
      <CardFitnessData />
      <CardExercise />
      <CardWeight />
    </ScrollView>
  );
}

const Stack = createStackNavigator();

export const HomeScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeNoStack"
        component={HomeScreenNoStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notify"
        component={NotifyScreen}
        options={{
          headerShown: true,
          title: "Notification",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#38668E" },
          headerTintColor: "#a5f3fc",
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
          title: "Profile",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#38668E" },
          headerTintColor: "#a5f3fc",
        }}
      />
    </Stack.Navigator>
  );
};
