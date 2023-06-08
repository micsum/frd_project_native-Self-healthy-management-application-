import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { SignUpData } from "../utils/type";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";
import { NativeBaseProvider, ScrollView } from "native-base";
import { Domain } from "@env";

export const Register = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpData>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      weight: "",
      height: "",
      target: "",
    },
  });

  const onSubmit = async (signUpData: SignUpData) => {
    try {
      //await axios
      //  .post(`${Domain}/user/signUp`, { signUpData })
      //  .then((response) => {
      //    console.log("res", response.data); // test response.data thought axios
      //  });

      let res = await fetch(`${Domain}/user/signUp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ signUpData }),
      });
      let response = await res.json();
      if (response.error) {
        console.log(response.message);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [targetOpen, setTargetOpen] = useState(false);
  const [targetValue, setTargetValue] = useState(null);
  const [target, setTarget] = useState([
    { label: "Lose Weight", value: "lose_weight" },
    { label: "Gain Muscle", value: "gain_muscle" },
    { label: "Maintain Weight", value: "maintain_weight" },
  ]);
  const [loading, setLoading] = useState(false);
  const onTargetOpen = useCallback(() => {
    setTargetOpen(() => {
      return true;
    });
  }, []);

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-[#38668E]">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <NativeBaseProvider>
          <Text className="text-5xl font-bold mt-16 mx-5 text-white">
            Sign Up
          </Text>
          <View className="p-8 w-full max-w-sm mt-2">
            <View>
              {errors.email && (
                <Text className="text-red-400">{errors.email.message}</Text>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <Text className="text-red-400">Please input valid email</Text>
              )}
              <Controller
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    keyboardType="email-address"
                    className="w-full bg-white rounded-md h-12 px-4 mb-4"
                    autoCapitalize="none"
                    placeholderTextColor="#000"
                    placeholder="Enter email address"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value.toString()}
                  />
                )}
                name="email"
              />
            </View>
            <View>
              {errors.password && (
                <Text className="text-red-400">{errors.password.message}</Text>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <Text className="text-red-400">
                  Password must be at least 8 characters
                </Text>
              )}
              {errors.password && errors.password.type === "validate" && (
                <Text className="text-red-400">Passwords do not match</Text>
              )}
              <Controller
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: 8,
                  validate: (value) => value === confirmPassword,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className="w-full bg-white rounded-md h-12 px-4 mb-4"
                    placeholderTextColor="#000"
                    placeholder="Enter password"
                    secureTextEntry={true}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value.toString()}
                  />
                )}
                name="password"
              />
            </View>
            <View>
              {errors.confirmPassword && (
                <Text className="text-red-400">
                  {errors.confirmPassword.message}
                </Text>
              )}
              {errors.confirmPassword &&
                errors.confirmPassword.type === "validate" && (
                  <Text className="text-red-400">Passwords do not match</Text>
                )}
              <Controller
                control={control}
                rules={{
                  required: "Confirm Password is required",
                  validate: (value) => value === password,
                }}
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
            </View>
            <View>
              {errors.weight && (
                <Text className="text-red-400">{errors.weight.message}</Text>
              )}
              <Controller
                control={control}
                rules={{ required: "Please input your weight" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className="w-full bg-white rounded-md h-12 px-4 mb-4"
                    placeholderTextColor="#000"
                    placeholder="Your weight"
                    onBlur={onBlur}
                    keyboardType="numeric"
                    onChangeText={onChange}
                    value={value.toString()}
                  />
                )}
                name="weight"
              />
            </View>
            <View>
              {errors.height && (
                <Text className="text-red-400">{errors.height.message}</Text>
              )}
              <Controller
                control={control}
                rules={{ required: "Please input your height" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className="w-full bg-white rounded-md h-12 px-4 mb-4"
                    placeholderTextColor="#000"
                    placeholder="Your height"
                    onBlur={onBlur}
                    keyboardType="numeric"
                    onChangeText={onChange}
                    value={value.toString()}
                  />
                )}
                name="height"
              />
            </View>
            <View>
              {errors.target && (
                <Text className="text-red-400">{errors.target.message}</Text>
              )}
              <Controller
                control={control}
                defaultValue=""
                rules={{ required: "Please select your target" }}
                render={({ field: { onChange, value } }) => (
                  <DropDownPicker
                    open={targetOpen}
                    value={targetValue}
                    items={target}
                    activityIndicatorColor="#5188E3"
                    setOpen={setTargetOpen}
                    setValue={setTargetValue}
                    setItems={setTarget}
                    placeholder="Select Target"
                    onOpen={onTargetOpen}
                    loading={loading}
                    onChangeValue={onChange}
                  />
                )}
                name="target"
              />
            </View>

            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              className="my-8 h-12 border-2 border-white  rounded-md flex flex-row justify-center items-center px-6"
            >
              <View className="flex-1 flex items-center">
                <Text className="text-white text-base font-medium">
                  Sign Up
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </NativeBaseProvider>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
