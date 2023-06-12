import React, { useState } from "react";
import { Text, View, Button } from "react-native";
import { deleteInSecureStore } from "../storage/secureStore";
import { store, action, AppDispatch } from "../store";
import { useDispatch } from "react-redux";

export function MoreScreen({}) {
  const dispatch = useDispatch<AppDispatch>();
  const logout = async () => {
    console.log("pressed");
    dispatch(action("storeToken", { token: null }));
    dispatch(action("isLogin", { login: false }));
    await deleteInSecureStore("token");
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title={"Logout"} onPress={() => logout()} />
    </View>
  );
}
