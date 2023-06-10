// Buffer Line
import { Fragment, useEffect, useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import DateTimePicker from "@mohalla-tech/react-native-date-time-picker";
import { store } from "../../store";
import { mps } from "./mealPageComponentStyleSheet";

export default function DateSelectionPanel(props: {
  date: Date;
  selectNewDate: (date: Date) => void;
}) {
  const { date, selectNewDate } = props;

  const [open, setOpen] = useState<boolean>(false);
  const [foodInputVisible, updateFoodInputVisibility] = useState<boolean>(
    store.getState().foodInputPanelOpen
  );
  const [itemNutritionPanelVisible, updateItemNutritionPanelVisibility] =
    useState<boolean>(store.getState().itemNutritionPanelOpen);

  store.subscribe(() => {
    const storeInfo = store.getState();
    updateFoodInputVisibility(() => {
      return storeInfo.foodInputPanelOpen;
    });
    updateItemNutritionPanelVisibility(() => {
      return storeInfo.itemNutritionPanelOpen;
    });
  });

  useEffect(() => {
    console.log(date);
  }, [date]);

  return (
    <View style={{ height: 120 }}>
      <View style={mps.calendarDiv}>
        <View style={{ width: "60%" }}>
          {open ? (
            <Fragment>
              <View>
                <DateTimePicker
                  mode="date"
                  initialValue={date}
                  onChange={(date: Date) => selectNewDate(date)}
                  setError={(err: string) => console.log(err)}
                />
              </View>
            </Fragment>
          ) : (
            <Text>
              Selected Date :{" "}
              <Text>
                {date.getFullYear()} / {date.getMonth() + 1} / {date.getDate()}
              </Text>
            </Text>
          )}
        </View>
        <View style={{ width: "20%" }}>
          <Button
            title={open ? "Close" : "Open"}
            onPress={
              foodInputVisible || itemNutritionPanelVisible
                ? () => {}
                : () => {
                    setOpen(() => {
                      return !open;
                    });
                  }
            }
          />
        </View>
      </View>
    </View>
  );
}
