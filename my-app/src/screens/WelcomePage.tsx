import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Dimensions,
  StatusBar,
  SafeAreaView,
  ScrollView,
  PixelRatio,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Button, NativeBaseProvider } from "native-base";
import { Register } from "./RegisterPage";
import { Login } from "./LoginPage";
import { SwiperFlatList } from "react-native-swiper-flatlist";

export const WelcomeScreenNoStack = () => {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  return (
    <NativeBaseProvider>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }} className="bg-[#38668E]">
        <SwiperFlatList
          autoplay
          autoplayDelay={5}
          autoplayLoop
          index={4}
          showPagination
          paginationActiveColor="#0898A0"
          paginationStyleItem={styles.paginationDots}
        >
          <View style={{ width, height }}>
            <ImageBackground
              style={styles.imageStyle}
              resizeMode="cover"
              source={require("../assets/images/3864158.jpg")}
            ></ImageBackground>
            <View style={styles.wrapper}>
              <Text style={styles.header}>beHealthy</Text>
            </View>
          </View>
          <View style={{ width, height }}>
            <ImageBackground
              style={styles.imageStyle}
              resizeMode="cover"
              source={require("../assets/images/Chatbot-pana.png")}
            ></ImageBackground>
            <View style={styles.wrapper}>
              <Text style={styles.header}>Live Chat</Text>
              <Text style={styles.paragraph}>Ask the advice from AI</Text>
            </View>
          </View>
          <View style={{ width, height }}>
            <ImageBackground
              style={styles.imageStyle}
              resizeMode="cover"
              source={require("../assets/images/Diet-amico.png")}
            ></ImageBackground>
            <View style={styles.wrapper}>
              <Text style={styles.header}>Meal Track</Text>
              <Text style={styles.paragraph}>
                Check your meal nutrients and have a well plan
              </Text>
            </View>
          </View>
          <View style={{ width, height }}>
            <ImageBackground
              style={styles.imageStyle}
              resizeMode="cover"
              source={require("../assets/images/Onlinecalendar-cuate.png")}
            ></ImageBackground>
            <View style={styles.wrapper}>
              <Text style={styles.header}>Calender</Text>
              <Text style={styles.paragraph}>Record your scheme</Text>
            </View>
          </View>
          <View style={{ width, height }}>
            <ImageBackground
              style={styles.imageStyle}
              resizeMode="cover"
              source={require("../assets/images/Personalizedworkouts-amico.png")}
            ></ImageBackground>
            <View style={styles.wrapper}>
              <Text style={styles.header}>Plans</Text>
              <Text style={styles.paragraph}>
                Full of nutrients and workout plans for you
              </Text>
            </View>
          </View>
        </SwiperFlatList>

        <View className="mb-20">
          <Button
            onPress={() => {
              //@ts-ignore
              navigation.navigate("SignUpPage");
            }}
            size="md"
            style={{ width: 150, alignSelf: "center", borderRadius: 20 }}
          >
            <Text style={{ fontSize: 16 }}>Sign Up</Text>
          </Button>
          <TouchableOpacity
            onPress={() => {
              //@ts-ignore
              navigation.navigate("LogInPage");
            }}
            className="flex-row justify-center items-center px-6"
          >
            <View className="flex-1 flex items-center mt-3">
              <Text className="text-white text-base font-medium">Log In</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};
const Stack = createStackNavigator();

export const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WelcomePage"
        component={WelcomeScreenNoStack}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="SignUpPage"
        component={Register}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LogInPage"
        component={Login}
        options={{
          title: "",
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#38668E",
            borderBottomWidth: 0,
            shadowOpacity: 0,
          },
          headerTintColor: "#a5f3fc",
          headerBackTitle: " ",
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(120),
    width: "100%",
    alignSelf: "center",
  },
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 70,
  },
  header: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  paragraph: {
    color: "#fff",
    fontSize: 17,
  },

  paginationDots: {
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
    backgroundColor: "#0898A0",
    marginLeft: 10,
    marginBottom: 45,
    bottom: 200,
    left: 0,
    right: 0,
  },
});
