import { View, StyleSheet, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
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

import {
  AuthorizationPermissions,
  FitnessDataType,
  FitnessTracker,
  GoogleFitDataType,
  HealthKitDataType,
} from "@kilohealth/rn-fitness-tracker";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";

export const fitnessData = [{ title: "card1", description: "hihi" }];
export const exerciseData = [{ title: "card2", description: "test" }];

const permissions: AuthorizationPermissions = {
  healthReadPermissions: [HealthKitDataType.StepCount],
  googleFitReadPermissions: [GoogleFitDataType.Steps],
};

export const GetStepsToday = () => {
  const [steps, setSteps] = useState<number | undefined>();

  useEffect(() => {
    const getStepsToday = async () => {
      try {
        const authorized = await FitnessTracker.authorize(permissions);

        if (!authorized) return;

        const stepsToday = await FitnessTracker.getStatisticTodayTotal(
          FitnessDataType.Steps
        );

        // returns the number of steps walked today, e.g. 320
        console.log(stepsToday);
        setSteps(stepsToday);
      } catch (error) {
        // Handle error here
        console.log("error", error);

        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: `${error}`,
          textBody: "Please try again",
          button: "close",
          autoClose: 5000,
        });
      }
    };

    getStepsToday();
  }, []);

  return steps ? <Text>{steps}</Text> : null;
};
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
            Steps Today
          </Center>
        </Box>

        <Stack space={2}>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <FontAwesome5 name="shoe-prints" size={42} color="green" />
              <GetStepsToday />
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
