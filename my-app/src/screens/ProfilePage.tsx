import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, Pressable, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { handleToken } from "../hooks/use-token";
import axios from "axios";
import { Domain } from "@env";
import { ProfileData } from "../utils/type";

export const ProfileScreen = () => {
  const { clearToken } = handleToken();
  const [profileInfo, setProfileInfo] = useState<ProfileData>();

  const logout = () => {
    clearToken();
  };

  const { token } = handleToken();

  const getInfo = async () => {
    let profileInfo = await axios.get(Domain + `/user/profileInfo`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProfileInfo(profileInfo.data.info[0]);
  };

  useEffect(() => {
    getInfo();
  }, []);

  useEffect(() => {
    console.log("profileInfo : ", profileInfo);
  }, [profileInfo]);

  return (
    <SafeAreaView className="flex-1 bg-slate-5">
      <View className="flex-1 items-center justify-center gap-8">
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLLUBkJgwdSnMEx7TGzJ5p_2kz8JxCGv1bW3EKuBCa2w&s",
          }}
          className="w-24 h-24 rounded-fll"
          resizeMode="cover"
        />
        <View className="gap-2 items-center">
          <Text className="text-slate-900 text3xl font-bold">
            Username : {profileInfo?.username}
          </Text>
          <Text className="text-slate-900 textlg">
            Email : {profileInfo?.email}
          </Text>
          <Text className="text-slate-900 textlg">
            Height : {profileInfo?.height} cm
          </Text>
          <Text className="text-slate-900 textlg">
            Weight : {profileInfo?.weight} kg
          </Text>
        </View>
      </View>
      <View className="flex-1 justify-centr gap-8">
        {/* <Pressable className="flex-row items-centr gap-2 px-8">
          <Ionicons
            name="settings-outline"
            size={24}
            className="text-slate-900"
          />
          <Text className="text-slate-900 textlg">Settings</Text>
        </Pressable> */}
        {/* <Pressable className="flex-row items-centr gap-2 px-8">
          <Ionicons
            name="help-buoy-outline"
            size={24}
            className="text-slate-900"
          />
          <Text className="text-slate-900 textlg">Help</Text>
        </Pressable> */}
        <Pressable className="flex-row items-centr gap-2 px-8">
          <MaterialIcons name="logout" size={24} className="text-slate-900" />
          <Text className="text-slate-900 textlg" onPress={() => logout()}>
            Logout
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
