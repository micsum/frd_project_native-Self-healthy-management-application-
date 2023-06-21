import {
  View,
  StyleSheet,
  Text,
  ViewComponent,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Card, Divider, Skeleton } from "@rneui/themed";
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

const dateRangeOptions = [
  { label: "1 Week", value: "1 Week" },
  { label: "1 Month", value: "1 Month" },
];

export const GetSteps = () => {
  const [steps, setSteps] = useState<{ label: string; value: number }[]>([]);
  const [selectedRange, setSelectedRange] = useState(dateRangeOptions[0].value);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const SelectDateRange = () => {
    const { isOpen, onOpen, onClose } = useDisclose();

    const handleSelectRange = (value: string) => {
      setSelectedRange(value);
      onClose();
    };

    return (
      <TouchableOpacity
        onPress={onOpen}
        className="items-center justify-center"
      >
        <Card.Title>
          <View className="flex-row items-center justify-center">
            <MaterialIcons name="date-range" size={36} color="black" />
            <Text className="text-lg mx-3">{selectedRange}</Text>
          </View>

          <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content>
              <Text className="text-lg">Select a Date Range</Text>
              {dateRangeOptions.map((option) => (
                <Actionsheet.Item
                  key={option.value}
                  onPress={() => handleSelectRange(option.value)}
                >
                  {option.label}
                </Actionsheet.Item>
              ))}
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

  useEffect(() => {
    if (selectedRange === "1 Week") {
      getStepsWeekly();
    }
    if (selectedRange === "1 Month") {
      getStepsMonthly();
    }

    //getStepsMonthly();
  }, [selectedRange]);

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
      // console.log(Object.entries(stepsWeeklyDaily));
      const stepsWeeklyArray = Object.entries(stepsWeeklyDaily)
        .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
        .map(([date, value]) => ({
          label: reformatDateString(date),
          value: value,
          spacing: 15,
          barWidth: 25,
        }));

      //console.log(stepsWeeklyArray);

      setSteps(stepsWeeklyArray);
      setIsLoading(false);
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

  const getStepsMonthly = async () => {
    let startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);

    let endDate = new Date();

    try {
      const authorized = await FitnessTracker.authorize(permissions);

      if (!authorized) return;

      const stepsMonthlyDaily = await FitnessTracker.queryDailyTotals(
        FitnessDataType.Steps,
        startDate,
        endDate
      );

      //console.log("monthly", stepsMonthlyDaily);
      const reformatDateString = (dateString: string) => {
        let newDateString = dateString.slice(5).split("-");
        return `${newDateString[1]}/${newDateString[0]}`;
      };

      // returns the number of steps walked today, e.g. 320
      const stepsMonthlyArray = Object.entries(stepsMonthlyDaily)
        .sort()
        .map(([date, value]) => ({
          label: reformatDateString(date),
          value: value,
          spacing: 15,
          barWidth: 25,
        }));
      //console.log("monthly", stepsMonthlyDaily);
      setSteps(stepsMonthlyArray);
      setIsLoading(false);
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

  const CardSkeleton = ({ title }: { title: string }) => {
    const numSkeletons = steps.length;
    const skeletons = Array.from({ length: numSkeletons }, (_, index) => (
      <View key={index} style={styles.field}>
        <View className="space-y-1.5">
          <Skeleton animation="wave" width={120} height={10} />
          <Skeleton animation="wave" width={60} height={5} />
          <Divider style={{ marginVertical: 10, width: "272%" }} />
        </View>
        <Skeleton animation="wave" width={60} height={10} />
      </View>
    ));

    return (
      <Card>
        <Card.Title>{title}</Card.Title>
        <Card.Divider />
        {skeletons}
      </Card>
    );
  };

  const CardData = ({ title }: { title: string }) => {
    const getWeekDay = (dateString: string) => {
      const dateParts = dateString.split("/");
      const day = parseInt(dateParts[0]);
      const month = parseInt(dateParts[1]) - 1;
      const date = new Date(2023, month, day);
      const weekdayFormat = { weekday: "long" };
      const locale = "en-UK";
      //@ts-ignore
      const weekdayName = new Intl.DateTimeFormat(locale, weekdayFormat).format(
        date
      );
      return weekdayName;
    };
    const numSkeletons = steps.length;
    const skeletons = Array.from({ length: numSkeletons }, (_, index) => (
      <View key={index} style={styles.field}>
        <View className="space-y-1.5">
          <Text></Text>
          <Text></Text>
          <Divider style={{ marginVertical: 10, width: "272%" }} />
        </View>
        <Text></Text>
      </View>
    ));

    const stepItems = [...steps].reverse().map((step, index) => (
      <View key={index} style={styles.field}>
        <View className="space-y-1.5">
          <Text>{step.label}</Text>
          <Text>{getWeekDay(step.label)}</Text>
          <Divider style={{ marginVertical: 10, width: "400%" }} />
        </View>
        <Text>{step.value}</Text>
      </View>
    ));

    return (
      <Card>
        <View className="flex-row justify-center items-center">
          <View className="mb-3">
            <MaterialIcons name="history" size={24} color="black" />
          </View>
          <Card.Title className="mx-2">{title}</Card.Title>
        </View>
        <Card.Divider />
        {numSkeletons > 0 ? stepItems : skeletons}
      </Card>
    );
  };
  const styles = StyleSheet.create({
    field: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 8,
    },
  });
  const [width, setWidth] = useState<number>(0);

  return (
    <ScrollView>
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
            width={width * 0.9 || 0}
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
        {isLoading ? (
          <CardSkeleton title="Loading" />
        ) : (
          <CardData title="History" />
        )}
      </View>
    </ScrollView>
  );
};
