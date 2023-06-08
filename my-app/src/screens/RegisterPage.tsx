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
import { LoginData, SignUpData } from "../utils/type";
import axios from "axios";

export const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      weight: "",
      height: "",
      target: "",
    },
  });
  const onSubmit = async (SignUpdata: SignUpData) => {
    try {
      await axios
        .post(`${process.env.Domain}/signup`, { SignUpdata })
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
        <Text className="text-5xl font-bold mb-6 text-white">Sign Up</Text>
        <Controller
          control={control}
          rules={{ required: true }}
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
              className="w-full bg-white rounded-md h-12 px-4 mb-4"
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

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="w-full bg-white rounded-md h-12 px-4 mb-4"
              placeholderTextColor="#000"
              placeholder="Confirm password"
              secureTextEntry={true}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="confirmPassword"
        />

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="w-full bg-white rounded-md h-12 px-4 mb-4"
              placeholderTextColor="#000"
              placeholder="Your weight"
              secureTextEntry={true}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="weight"
        />

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="w-full bg-white rounded-md h-12 px-4 mb-4"
              placeholderTextColor="#000"
              placeholder="Your height"
              secureTextEntry={true}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="height"
        />

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="w-full bg-white rounded-md h-12 px-4"
              placeholderTextColor="#000"
              placeholder="Your target"
              secureTextEntry={true}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="target"
        />

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="my-8 h-12 border-2 border-white  rounded-md flex flex-row justify-center items-center px-6"
        >
          <View className="flex-1 flex items-center">
            <Text className="text-white text-base font-medium">Sign Up</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
