import React from "react";
import { Text, View } from "react-native";
import { Button, Center, NativeBaseProvider } from "native-base";

const Example = () => {
  return (
    <Button.Group
      isAttached
      colorScheme="blue"
      mx={{
        base: "auto",
        md: 0,
      }}
      size="sm"
    >
      <Button>Edit</Button>
      <Button>Save</Button>
      <Button>Save</Button>
      <Button>Save</Button>
    </Button.Group>
  );
};

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
        <Center flex={1} px="3">
          <Example />
        </Center>
      </NativeBaseProvider>
      <Text>djfhsjdfhsjdfhsdjh{id}</Text>
    </View>
  );
};
