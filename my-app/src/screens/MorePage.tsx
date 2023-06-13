import React, { useState } from "react";
import { Text, View } from "react-native";
import { deleteInSecureStore } from "../storage/secureStore";
import { store, action, AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { Button } from "native-base";

export function MoreScreen({}) {
  const dispatch = useDispatch<AppDispatch>();
  const logout = async () => {
    dispatch(action("storeToken", { token: null }));
    dispatch(action("isLogin", { login: false }));
    await deleteInSecureStore("token");
  };
  return (
    <View className="flex-1 justify-center items-center">
      <Button className="btn btn-blue" onPress={() => logout()}>
        <Text>Logout</Text>
      </Button>
    </View>
  );
}
