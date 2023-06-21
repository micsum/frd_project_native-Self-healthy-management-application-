import React from "react";
import { Text, View } from "react-native";
import { Button } from "native-base";
import { handleToken } from "../hooks/use-token";

export function MoreScreen({}) {
  const { clearToken } = handleToken();

  const logout = () => {
    clearToken();
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Button className="btn btn-blue" onPress={() => logout()}>
        <Text>Logout</Text>
      </Button>
    </View>
  );
}
