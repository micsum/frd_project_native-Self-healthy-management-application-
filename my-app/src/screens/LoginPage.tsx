import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  PixelRatio,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { LoginData } from "../utils/type";
import axios from "axios";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Dialog,
} from "react-native-alert-notification";
import { updateRootState, AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { Domain } from "@env";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ForgotPwForm } from "./ForgotPwPage";
import { post } from "../utils/api";
import { handleToken } from "../hooks/use-token";

export const LoginNoStack = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { setToken } = handleToken();

  const onSubmit = async (input: LoginData) => {
    let output = await post("/user/login", input);
    if (output.error) {
      console.log("error", output.error);
      return Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: `${output.error}`,
        textBody: "Please try again",
        button: "close",
        autoClose: 5000,
      });
    }
    if (output.token) {
      let token = output.token;
      console.log({ token });
      setToken(token);
    }
  };

  return (
    <AlertNotificationRoot>
      <SafeAreaView className="flex-1 items-center justify-center bg-[#38668E]">
        <ImageBackground
          style={styles.imageStyle}
          resizeMode="cover"
          source={require("../assets/images/login-cuate.png")}
        ></ImageBackground>
        <View className="p-8 w-full max-w-sm">
          <Text className="text-5xl font-bold mb-6 text-white">Login</Text>

          {errors.email && (
            <Text className="text-red-400">{errors.email.message}</Text>
          )}
          <Controller
            control={control}
            rules={{ required: "Email is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                keyboardType="email-address"
                className="w-full bg-white rounded-md h-12 px-4 mb-4"
                autoCapitalize="none"
                placeholderTextColor="#000"
                placeholder="Enter email address"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
          />
          {errors.password && (
            <Text className="text-red-400">{errors.password.message}</Text>
          )}
          <Controller
            control={control}
            rules={{ required: "Please enter password" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="w-full bg-white rounded-md h-12 px-4"
                placeholderTextColor="#000"
                placeholder="Enter password"
                secureTextEntry={true}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
          />
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            className="h-12 border-2 border-white mt-5 rounded-md flex flex-row justify-center items-center px-6"
          >
            <View className="flex-1 flex items-center">
              <Text className="text-white text-base font-medium">Login</Text>
            </View>
          </TouchableOpacity>
          <View className="flex-row justify-end my-8">
            <TouchableOpacity
              onPress={() => {
                //@ts-ignore
                navigation.navigate("ForgotPw");
              }}
            >
              <Text className="text-white font-bold">Forgot password?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </AlertNotificationRoot>
  );
};

const Stack = createStackNavigator();

export const Login = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        component={LoginNoStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgotPw"
        component={ForgotPwForm}
        options={{
          headerShown: false,
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
});
