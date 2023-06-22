// Buffer Line
import { Fragment, useState, useEffect, useRef } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { Dialog, ALERT_TYPE } from "react-native-alert-notification";
import { handleToken } from "../../hooks/use-token";
import { BarChartData, WeightInfoData } from "../../utils/type";
import { Domain } from "@env";

export default function WeightChart() {
  const [weightInfo, updateWeightInfo] = useState<WeightInfoData[]>([]);
  const barChartData = useRef<BarChartData[]>([]);
  const { token } = handleToken();

  const getWeightInfo = async () => {
    const currentDay = new Date();
    const res = await fetch(`${Domain}/user/weightInfo/${currentDay}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    const result = await res.json();
    if (result.error) {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: "An Error Occurred",
        textBody: result.error,
      });
      return;
    }
    console.log(result);
    updateWeightInfo([]);
  };

  const generateBarChartData = (weightInfoData: WeightInfoData[]) => {
    return weightInfoData.map((weightInfo) => {
      const { weight, date } = weightInfo;
      const value = weight;
      const dataPointText = weight.toString();
      const label = `${date.getDate()}/${date.getMonth()}`;
      const labelComponent = () => {};
      return { value, dataPointText, label, labelComponent };
    });
  };

  useEffect(() => {
    getWeightInfo();
  }, []);

  useEffect(() => {
    barChartData.current = generateBarChartData(weightInfo);
  }, [weightInfo]);

  return (
    <Fragment>
      <View>
        <LineChart
          data={barChartData.current}
          thickness={5}
          isAnimated={true}
        />
      </View>
    </Fragment>
  );
}
