import React from "react";
import { Text, View } from "react-native";
import { Button, Center, NativeBaseProvider } from "native-base";

export const PlanDetailScreen = ({ route }: any) => {
  const { id } = route.params;
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
      <NativeBaseProvider>
        <Center flex={1} px="3"></Center>
      </NativeBaseProvider>
      <Text>djfhsjdfhsjdfhsdjh{id}</Text>
    </View>
  );
};
