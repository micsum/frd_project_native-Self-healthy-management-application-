import { View, StyleSheet } from "react-native";
import React from "react";
import {
  Avatar as NativeAvatar,
  HStack,
  VStack,
  Box,
  Divider,
  AspectRatio,
  Center,
  Heading,
  Stack,
} from "native-base";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

export const AvatarPic = () => {
  return (
    <HStack justifyContent="space-between">
      <NativeAvatar bg="blue.300">
        <FontAwesome name="user-circle-o" size={48} color="black" />
      </NativeAvatar>
    </HStack>
  );
};

export const Notification = () => {
  return <MaterialIcons name="notifications" size={36} color="black" />;
};

export const NbCardMid = () => {
  return (
    <Box alignItems="center">
      <Box
        maxWidth={"auto"}
        mx="2"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: "coolGray.700",
          backgroundColor: "gray.800",
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: "gray.50",
        }}
      >
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}></AspectRatio>
          <Center
            bg="violet.500"
            _dark={{
              bg: "violet.400",
            }}
            _text={{
              color: "warmGray.50",
              fontWeight: "700",
              fontSize: "md",
            }}
            position="absolute"
            top="0"
            mx="3"
            mt="3"
            px="3"
            py="1.5"
            borderRadius={"sm"}
          >
            Goal
          </Center>
        </Box>

        <Stack space={2}>
          <Heading size="md" mx="3">
            The Garden City
          </Heading>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center"></HStack>
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
};

const createCss = (margin: number) => {
  return {
    margin: margin,
    color: "blue",
  };
};
