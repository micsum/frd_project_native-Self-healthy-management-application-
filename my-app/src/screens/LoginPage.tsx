import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { LoginData } from "../utils/type";
import axios from "axios";

export const Login = () => {
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
  const onSubmit = async (data: LoginData) => {
    try {
      await axios
        .post(`${process.env.Domain}/user/login`, { data })
        .then((response) => {
          console.log("res", response.data); // test response.data thought axios
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-[#38668E]">
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
        <Controller
          control={control}
          rules={{ required: true }}
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

        <View className="flex-row justify-end my-8">
          <TouchableOpacity onPress={() => {}}>
            <Text className="text-white font-bold">Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="h-12 border-2 border-white  rounded-md flex flex-row justify-center items-center px-6"
        >
          <View className="flex-1 flex items-center">
            <Text className="text-white text-base font-medium">Login</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
