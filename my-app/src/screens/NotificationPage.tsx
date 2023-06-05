import React, { useState } from "react";
import { Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const NotifyScreen = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
        marginTop: 50,
      }}
    ></View>
  );
};
