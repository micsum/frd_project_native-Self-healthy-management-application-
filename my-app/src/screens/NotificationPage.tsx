import React, { useState } from "react";
import { Text, View, Button } from "react-native";

export const NotifyScreen = ({ navigation }) => {
  return (
    <View>
      <Button title="" onPress={() => navigation.goBack()}></Button>;
    </View>
  );
};
