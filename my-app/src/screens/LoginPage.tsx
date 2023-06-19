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
import { getFromSecureStore, saveInSecureStore } from "../storage/secureStore";
import { action, AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { Domain } from "@env";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ForgotPwForm } from "./ForgotPwPage";

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

  const dispatch = useDispatch<AppDispatch>();

  const getToken = async () => {
    const token = await getFromSecureStore("token");
    if (token) {
      dispatch(action("isLogin", { login: true }));
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  const onSubmit = async (data: LoginData) => {
    await axios.post(`${Domain}/user/login`, data).then(
      (response) => {
        if (response.data.token) {
          let token = response.data.token;
          saveInSecureStore("token", token);
          dispatch(action("storeToken", { token }));
          dispatch(action("isLogin", { login: true }));
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          //console.log("response", token);
        }
        // test response.data thought axios
        else if (response.data.error) {
          console.log("error", response.data.error);
          return Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: `${response.data.error}`,
            textBody: "Please try again",
            button: "close",
            autoClose: 5000,
          });
        }
        return;
      },
      (error) => {
        console.log("ran");
        console.log(error.response.data.message);
        return Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: "Error",
          textBody: `${error.response.data.message}`,
          button: "close",
          autoClose: 5000,
        });
      }
    );
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
