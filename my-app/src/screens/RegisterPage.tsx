import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { SignUpData } from "../utils/type";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "axios";

export const Register = () => {
  const {
    control,
    handleSubmit,
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

  const [targetOpen, setTargetOpen] = useState(false);
  const [targetValue, setTargetOpen] = useState(null);
  const [target, setTarget] = useState([
    { label: "Lose Weight", value: "lose_weight" },
  ]);
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-[#38668E]">
      <View className="p-8 w-full max-w-sm">
        <Text className="text-5xl font-bold mb-6 text-white">Sign Up</Text>
        <View>
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
                value={value.toString()}
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text className="text-red-400">{errors.email.message}</Text>
          )}
        </View>
        <View>
          <Controller
            control={control}
            rules={{ required: "Password is required", minLength: 8 }}
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
          {errors.password && (
            <Text className="text-red-400">{errors.password.message}</Text>
          )}
        </View>
        <View>
          <Controller
            control={control}
            rules={{ required: true, minLength: 8 }}
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
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="w-full bg-white rounded-md h-12 px-4 mb-4"
                placeholderTextColor="#000"
                placeholder="Your weight"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value.toString()}
              />
            )}
            name="weight"
          />
        </View>
        <View>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="w-full bg-white rounded-md h-12 px-4 mb-4"
                placeholderTextColor="#000"
                placeholder="Your height"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value.toString()}
              />
            )}
            name="height"
          />
        </View>
        <View>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <DropDownPicker
                  items={[
                    { label: "Item 1", value: "item1" },
                    { label: "Item 2", value: "item2" },
                  ]}
                  defaultValue={"item1"}
                  onChangeItem={(item) => console.log(item.value)}
                />
              </>
            )}
            name="target"
          />
        </View>
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
