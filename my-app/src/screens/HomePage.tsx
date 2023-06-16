import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  PanResponder,
  Animated,
  SafeAreaViewComponent,
} from "react-native";
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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChatRoomScreen } from "./ChatroomPage";
import { SpeedDial } from "@rneui/themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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

const HomeNoStackWithChat = () => {
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();

  const RobotIcon = () => {
    return (
      <MaterialCommunityIcons name="robot-confused" size={24} color="#fff" />
    );
  };
  return (
    <View style={{ position: "relative", height: "100%" }}>
      <HomeScreenNoStack></HomeScreenNoStack>
      <SpeedDial
        isOpen={open}
        icon={{ name: "chat", color: "#fff" }}
        openIcon={{ name: "close", color: "#fff" }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
        buttonStyle={{ backgroundColor: "#649c98" }}
      >
        <SpeedDial.Action
          icon={{ name: "people", color: "#fff" }}
          title="Chat with experts"
          titleStyle={{
            backgroundColor: "#649c98",
            color: "#fff",
          }}
          onPress={() => console.log("chat with experts")}
          buttonStyle={{ backgroundColor: "#649c98" }}
        />
        <SpeedDial.Action
          key="custom"
          icon={<RobotIcon />}
          title="ChatGPT"
          titleStyle={{ backgroundColor: "#649c98", color: "#fff" }}
          onPress={() => {
            //@ts-ignore
            navigation.navigate("ChatRoom");
          }}
          buttonStyle={{ backgroundColor: "#649c98" }}
        />
      </SpeedDial>
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
        component={HomeNoStackWithChat}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={{
          title: "Chat with ChatGPT",
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#38668E" },
          headerTintColor: "#a5f3fc",
          headerBackTitle: " ",
        }}
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
          headerBackTitle: " ",
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
          headerBackTitle: " ",
        }}
      />
    </Stack.Navigator>
  );
};
