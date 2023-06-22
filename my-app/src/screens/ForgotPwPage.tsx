import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  PixelRatio,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { ForgotPwEmail } from "../utils/type";
import axios from "axios";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Dialog,
} from "react-native-alert-notification";
import { Domain } from "@env";

export const ForgotPwForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (forgotPwEmail: ForgotPwEmail) => {
    await axios.post(`${Domain}/user/forgotPw`, forgotPwEmail).then(
      (response) => {
        if (response.data) {
          // not yet finished in reset pw
          console.log("response", response.data);
          return Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: `${response.data}`,
            textBody: `Reset password link sent to ${forgotPwEmail}`,
            button: "OK",
            autoClose: 5000,
          });
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
      },
      (error) => {
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
        <View className="p-8 w-full max-w-sm mb-36">
          <ImageBackground
            style={styles.imageStyle}
            resizeMode="cover"
            source={require("../assets/images/Forgotpassword-amico.png")}
          ></ImageBackground>
          <Text className="text-5xl font-bold mb-6 text-white">
            Reset password?
          </Text>
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

          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            className="h-12 border-2 border-white  rounded-md flex flex-row justify-center items-center px-6"
          >
            <View className="flex-1 flex items-center">
              <Text className="text-white text-base font-medium">Submit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(120),
    width: "100%",
    alignSelf: "center",
  },
});
