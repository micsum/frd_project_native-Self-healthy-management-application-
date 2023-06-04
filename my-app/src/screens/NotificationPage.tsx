import React, { useState } from "react";
import { Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
//import { AntDesign } from "@expo/vector-icons";

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
    >
      {/*<AntDesign
        name="back"
        size={24}
        color="black"
        onPress={() => navigation.goBack()}
    />*/}
    </View>
  );
};
