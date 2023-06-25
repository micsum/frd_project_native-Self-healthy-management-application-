import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
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
  Input,
} from "native-base";
import WeightChart from "./weightChart";
import { FontAwesome5 } from "@expo/vector-icons";
import { WeightInfo } from "../../utils/type";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Dialog,
} from "react-native-alert-notification";
import DatePicker from "react-native-date-picker";
import { Domain } from "@env";
import axios from "axios";

const WeightDialog = (props: {
  isOpen: boolean;
  onClose: () => void;
  addNewWeight: (newWeight: WeightInfo) => void;
}) => {
  const { isOpen, onClose, addNewWeight } = props;
  const cancelRef = useRef(null);
  const [updateDate, setUpdateDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const handleUpdateDate = (updateDate: Date) => {
    setOpen(false);
    setUpdateDate(updateDate);
    setWeightHist((current) => {
      return { ...current, date: updateDate };
    });
  };

  const [kgInput, setKgInput] = useState<string>("");
  const handleChange = (input: string) => {
    setWeightHist((current) => {
      return { ...current, weight: input };
    });
  };
  const [weightHist, setWeightHist] = useState<WeightInfo>({
    weight: "0",
    date: new Date(),
  });

  const handleSetWeight = async () => {
    let weightData = weightHist;
    const { weight, date } = weightHist;

    if (+weightData.weight < 0) {
      return Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: `Wrong Weight Input`,
        textBody: "please check your input",
        button: "close",
        autoClose: 5000,
      });
    }
    await axios.post(`${Domain}/user/weightInfo`, weightHist).then(
      (response) => {
        if (response.data.error) {
          return Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: `Error`,
            textBody: `${response.data.error}`,
            button: "close",
            autoClose: 5000,
          });
        } else if (response.data) {
          console.log("weightHist", response.data);

          addNewWeight({
            weight,
            date,
          });
          return Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: `Weight Updated`,
            textBody: "",
            button: "close",
            autoClose: 5000,
          });
        }
      },
      (error: any) => {
        console.log("error", error.response.data.message);
        return Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: `Error`,
          textBody: `${error.response.data.message}`,
          button: "close",
          autoClose: 5000,
        });
      }
    );
    onClose();
    //setKgInput("");
    //setUpdateDate(new Date());
  };
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
            <AlertDialog.Header
              borderBottomWidth={0}
              className="flex-row items-center"
            >
              Update Weight
              <View className="mx-2">
                <FontAwesome5 name="weight" size={24} color="black" />
              </View>
            </AlertDialog.Header>
            <AlertDialog.Body className="mb-3">
              <Input
                variant="rounded"
                size="xl"
                placeholder="New Weight"
                className="items-center justify-center text-center"
                //value={kgInput}
                onChangeText={handleChange}
              />
              <View className="flex-col items-center justify-center">
                <View className="flex-row mt-3 mb-3 items-center">
                  <Text className="text-lg">Measure Date: </Text>
                  <TouchableOpacity onPress={() => setOpen(true)}>
                    <Text className="text-blue-400 text-2xl">{`${updateDate.toLocaleDateString()}`}</Text>
                  </TouchableOpacity>
                </View>
                <DatePicker
                  modal
                  mode="date"
                  open={open}
                  date={updateDate}
                  onConfirm={handleUpdateDate}
                  onCancel={() => {
                    setOpen(false);
                  }}
                  title={"Start Time"}
                />
              </View>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button onPress={handleSetWeight}>Update</Button>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </AlertNotificationRoot>
    </View>
  );
};

export const CardWeight = () => {
  const [isWeightDialog, setWeightDialog] = useState(false);
  const openWeightDialog = () => {
    setWeightDialog(true);
  };

  const closeWeightDialog = () => {
    setWeightDialog(false);
  };
  return (
    <View style={styles.card} className="mt-2 m-3 p-3">
      <View className="flex-row justify-around">
        <Box>
          <Center
            bg="cyan.500"
            _dark={{
              bg: "cyan.400",
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
            Weight
          </Center>
          <AspectRatio w="100%" ratio={16 / 9}>
            <View className="mt-12">
              <WeightChart />
            </View>
          </AspectRatio>
        </Box>
        <View className="mx-2">
          <FontAwesome5
            name="plus"
            size={20}
            color="black"
            onPress={() => {
              openWeightDialog();
            }}
          />
        </View>
      </View>
      <WeightDialog
        isOpen={isWeightDialog}
        onClose={closeWeightDialog}
        addNewWeight={() => {}}
      />
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
  },
});
