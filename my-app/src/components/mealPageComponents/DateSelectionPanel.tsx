// Buffer Line
import { Fragment, useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import DateTimePicker from "@mohalla-tech/react-native-date-time-picker";
import { store } from "../../store";
import { mps } from "./mealPageComponentStyleSheet";

export default function DateSelectionPanel(props: {
  updateSelectedDate: (date: Date) => void;
}) {
  const { updateSelectedDate } = props;

  const timeZoneDelta = (displayDate: Date, hours: number) => {
    return new Date(displayDate.getTime() + hours * 3600000);
  };

  const [selectedDate, selectNewDate] = useState<Date>(
    timeZoneDelta(new Date(), 8)
  );
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
                  initialValue={selectedDate}
                  onChange={(date: Date) => selectNewDate(() => date)}
                  setError={(err: string) => console.log(err)}
                />
              </View>
            </Fragment>
          ) : (
            <Text style={mps.calendarText}>
              <Text>Selected Date : {"\n"}</Text>
              <Text>
                {selectedDate.getFullYear()} / {selectedDate.getMonth() + 1} /{" "}
                {selectedDate.getDate()}
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
            title={open ? "Confirm" : "Change"}
            onPress={
              foodInputVisible || itemNutritionPanelVisible
                ? () => {}
                : () => {
                    open
                      ? updateSelectedDate(timeZoneDelta(selectedDate, 8))
                      : null;

                    setOpen((open) => !open);
                  }
            }
          />
        </View>
      </View>
    </View>
  );
}
