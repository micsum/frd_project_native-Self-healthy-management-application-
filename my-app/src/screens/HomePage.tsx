import React, { useState } from "react";
import { Text, View, Button } from "react-native";
import {
  AvatarPic,
  NbCardMid,
  Notification,
} from "../components/otherComponents";
import { ScrollView } from "native-base";

export function HomeScreen({}) {
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 15,
          marginTop: 60,
        }}
      >
        <AvatarPic />
        <Text> beHealthy </Text>
        <Notification />
      </View>
      <NbCardMid />
    </ScrollView>
  );
}
