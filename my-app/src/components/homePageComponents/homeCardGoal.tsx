import React, { useRef, useState } from "react";
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
  AlertDialog,
} from "native-base";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { AlertNotificationRoot } from "react-native-alert-notification";
import GoalInputDisplayPanel from "../goalPageComponents/weightCalorieGoal";

const GoalDialog = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const cancelRef = useRef(null);

  return (
    <View>
      <AlertNotificationRoot>
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}
          size="xl"
        >
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header borderBottomWidth={0}>
              Calories Goal
            </AlertDialog.Header>
            <AlertDialog.Body>
              <GoalInputDisplayPanel />
            </AlertDialog.Body>
            {/*<AlertDialog.Footer borderTopWidth={0}>
              {/*<Button.Group space={2}>
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  onPress={onClose}
                  ref={cancelRef}
                >
                  Cancel
                </Button>
                <Button colorScheme="cyan" onPress={() => {}}>
                  Set Goal
                </Button>
  </Button.Group>
            </AlertDialog.Footer>*/}
          </AlertDialog.Content>
        </AlertDialog>
      </AlertNotificationRoot>
    </View>
  );
};

export const CardGoal = () => {
  const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false);

  const handleOpenGoalDialog = () => {
    setIsGoalDialogOpen(true);
  };

  const handleCloseGoalDialog = () => {
    setIsGoalDialogOpen(false);
  };

  return (
    <View style={styles.card} className="mt-2 m-3 p-3">
      <Box className="flex-row justify-around">
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
          mx="1"
          mt="0"
          px="3"
          py="1.5"
          borderRadius={"sm"}
        >
          Goal
        </Center>
        <AspectRatio w="100%" ratio={16 / 9}>
          <View className="flex-col items-center ml-3">
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Calories</Text>
            <Text className="text-slate-500 ml-5">
              Remaining = Goal + Food - Exercise
            </Text>
          </View>
        </AspectRatio>
        <View className="mr-3 mt-1">
          <FontAwesome5
            name="plus"
            size={20}
            color="black"
            onPress={() => {
              handleOpenGoalDialog();
            }}
          />
        </View>
      </Box>
      <GoalDialog
        isOpen={isGoalDialogOpen}
        onClose={handleCloseGoalDialog}
      ></GoalDialog>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 300,
    width: "95%",
    backgroundColor: "white",
    borderRadius: 15,
    elevation: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});
