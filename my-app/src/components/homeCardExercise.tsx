import { View, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import {
  HStack,
  VStack,
  Box,
  Divider,
  AspectRatio,
  Center,
  Heading,
  Stack,
  Button,
} from "native-base";
import { CardProps } from "../utils/type";
import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from "react-native-health";

const permissions = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.HeartRate],
    write: [AppleHealthKit.Constants.Permissions.Steps],
  },
} as HealthKitPermissions;

AppleHealthKit.initHealthKit(permissions, (error: string) => {
  if (error) {
    console.log("cannot grant permissions!");
  }

  const options = {
    startDate: new Date().toISOString(),
  };

  AppleHealthKit.getWorkoutRouteSamples();
});

export const fitnessData = [{ title: "card1", description: "hihi" }];
export const exerciseData = [{ title: "card2", description: "test" }];

export const CardFitnessData = () => {
  return (
    <Box alignItems="center">
      <Box
        maxWidth={"80"}
        mx="2"
        mt="5"
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
          <AspectRatio w="100%"></AspectRatio>
          <Center
            bg="violet.500"
            _dark={{
              bg: "violet.400",
            }}
            _text={{
              color: "warmGray.50",
              fontWeight: "400",
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
            hihi
          </Center>
        </Box>

        <Stack space={2}>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text>text</Text>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </Box>
  );
};

export const CardExercise = () => {
  const {} = useState();

  return (
    <Box alignItems="center">
      <Box
        maxWidth={"80"}
        mx="2"
        mt="5"
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
          <AspectRatio w="100%"></AspectRatio>
          <Center
            bg="violet.500"
            _dark={{
              bg: "violet.400",
            }}
            _text={{
              color: "warmGray.50",
              fontWeight: "400",
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
            hihi
          </Center>
        </Box>

        <Stack space={2}>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text>test</Text>
            </HStack>
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
