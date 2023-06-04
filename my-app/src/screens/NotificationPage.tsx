import React, { useState } from "react";
import { Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const NotifyScreen = () => {
  const navigation = useNavigation()
  return (
    <View>
      <Button title="" onPress={() => navigation.goBack()}></Button>;
    </View>
  );
};
