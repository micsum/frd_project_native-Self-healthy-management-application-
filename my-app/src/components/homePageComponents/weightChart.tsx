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
  const [barChartData, setBarChartData] = useState<BarChartData[]>([]);
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

    updateWeightInfo(result);
  };

  const generateBarChartData = (weightInfoData: WeightInfoData[]) => {
    //console.log("weightInfoData", weightInfoData);

    return weightInfoData
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((weightInfo) => {
        console.log(weightInfo);

        const { weight, date } = weightInfo;
        const value = weight;
        const dataPointText = weight.toString();
        const label = `${new Date(date).getDate()}/${
          new Date(date).getMonth() + 1
        }`;
        //const labelComponent = () => {};
        return { value, dataPointText, label };
      });
  };

  useEffect(() => {
    getWeightInfo();
  }, []);

  useEffect(() => {
    if (weightInfo.length > 0) {
      setBarChartData(generateBarChartData(weightInfo));
    }
  }, [weightInfo]);

  return (
    <Fragment>
      <View>
        <LineChart
          //@ts-ignore
          data={barChartData}
          thickness={2}
          color="#48bcd1"
          isAnimated={true}
          dataPointsColor={"green"}
          width={300}
        />
      </View>
    </Fragment>
  );
}
