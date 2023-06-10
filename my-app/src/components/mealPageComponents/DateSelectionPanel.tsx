// Buffer Line
import { Fragment, useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
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
    if (foodInputVisible || itemNutritionPanelVisible) {
      setOpen(() => {
        return false;
      });
    }
  }, [foodInputVisible, itemNutritionPanelVisible]);

  return (
    <View style={{ height: 120, padding: 5, paddingBottom: 0 }}>
      <View style={mps.calendarDisplayDiv}>
        <View
          style={
            open
              ? // mps.calendarDivOpen
                {
                  width: "75%",
                  flexDirection: "row",
                  justifyContent: "center",
                }
              : mps.calendarDiv
          }
        >
          {open ? (
            <Fragment>
              <View style={{ width: "80%" }}>
                <DateTimePicker
                  mode="date"
                  initialValue={date}
                  onChange={(date: Date) => selectNewDate(date)}
                  setError={(err: string) => console.log(err)}
                />
              </View>
            </Fragment>
          ) : (
            <Text style={mps.calendarText}>
              <Text>Selected Date : {"\n"}</Text>
              <Text>
                {date.getFullYear()} / {date.getMonth() + 1} / {date.getDate()}
              </Text>
            </Text>
          )}
        </View>
        <View
          style={{
            width: "25%",
            paddingRight: open ? 3 : 10,
          }}
        >
          <Button
            title={open ? "Close" : "Change"}
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
