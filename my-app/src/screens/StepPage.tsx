import { View, StyleSheet, Text, ViewComponent } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Card } from "@rneui/themed";
import {
  AuthorizationPermissions,
  FitnessDataType,
  FitnessTracker,
  GoogleFitDataType,
  HealthKitDataType,
} from "@kilohealth/rn-fitness-tracker";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import { BarChart } from "react-native-gifted-charts";
import { MaterialIcons } from "@expo/vector-icons";
import { Button, Actionsheet, useDisclose } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";

export const SelectDateRange = () => {
  const { isOpen, onOpen, onClose } = useDisclose();
  return (
    <TouchableOpacity onPress={onOpen} className="items-center justify-center">
      <Card.Title>
        <MaterialIcons name="date-range" size={36} color="black" />
        <Text>1 week</Text>

        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Text className="text-lg">Select a Date Range</Text>
            <Actionsheet.Item>1 Week</Actionsheet.Item>
            <Actionsheet.Item>1 Month</Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </Card.Title>
    </TouchableOpacity>
  );
};

const permissions: AuthorizationPermissions = {
  healthReadPermissions: [HealthKitDataType.StepCount],
  googleFitReadPermissions: [GoogleFitDataType.Steps],
};

export const GetStepsWeekly = () => {
  const [steps, setSteps] = useState<{ label: string; value: number }[]>([]);

  useEffect(() => {
    const getStepsWeekly = async () => {
      try {
        const authorized = await FitnessTracker.authorize(permissions);

        if (!authorized) return;

        const stepsWeeklyDaily = await FitnessTracker.getStatisticWeekDaily(
          FitnessDataType.Steps
        );

        const reformatDateString = (dateString: string) => {
          let newDateString = dateString.slice(5).split("-");
          return `${newDateString[1]}/${newDateString[0]}`;
        };

        // returns the number of steps walked today, e.g. 320
        //console.log(stepsWeeklyDaily);
        const stepsWeeklyArray = Object.entries(stepsWeeklyDaily)
          .sort()
          .map(([date, value]) => ({
            label: reformatDateString(date),
            value: value,
            spacing: 15,
            barWidth: 25,
          }));
        setSteps(() => {
          return stepsWeeklyArray;
        });
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

    getStepsWeekly();
  }, []);

  const [width, setWidth] = useState<number>(0);

  return (
    <View
      className="mt-2"
      onLayout={(event: any) => {
        setWidth(event.nativeEvent.layout.width * 0.85);
      }}
      style={{ width: "100%" }}
    >
      <Card>
        <SelectDateRange />
        <Card.Divider></Card.Divider>
        <BarChart
          initialSpacing={2}
          isThreeD
          isAnimated
          sideWidth={0}
          width={width || 0}
          barWidth={22}
          noOfSections={5}
          maxValue={
            Math.ceil(
              steps.reduce((acc, current) => {
                return acc > current.value ? acc : current.value;
              }, 0) / 500
            ) * 500
          }
          barBorderRadius={4}
          frontColor="pink"
          data={steps}
          yAxisThickness={0}
          xAxisThickness={0}
          xAxisLabelTextStyle={{
            textAlign: "center",
            width: 38,
          }}
          renderTooltip={(item: any, index: any) => {
            return (
              <View
                style={{
                  marginBottom: 5,
                  marginLeft: -6,
                  backgroundColor: "#ffcefe",
                  paddingHorizontal: 6,
                  paddingVertical: 4,
                  borderRadius: 4,
                }}
              >
                <Text>{item.value}</Text>
              </View>
            );
          }}
        />
      </Card>
    </View>
  );
};
