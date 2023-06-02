import { Text, View } from "react-native";
import React from "react";
import { Button, Box, Center, NativeBaseProvider } from "native-base";

const Example = () => {
  return (
    <Box alignItems="center">
      <Button onPress={() => console.log("hello world")}>Click Me</Button>
    </Box>
  );
};

export function PlansPage() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Plan!</Text>
      <NativeBaseProvider>
        <Center flex={1} px="3">
          <Example />
        </Center>
      </NativeBaseProvider>
    </View>
  );
}
