// Buffer Line
import { Fragment, useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import DatePicker from "react-native-date-picker";
import { store } from "../../store";
import { mps } from "./mealPageComponentStyleSheet";

export default function DateSelectionPanel(props: {
  updateSelectedDate: (date: Date) => void;
}) {
  const { updateSelectedDate } = props;

  const timeZoneDelta = (displayDate: Date, hours: number) => {
    return new Date(displayDate.getTime() + hours * 3600000);
  };

  const [selectedDate, selectNewDate] = useState<Date>(new Date());
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
      <View style={styles.card} className="mt-2 m-3 p-3">
        <View style={[mps.calendarDisplayDiv, { overflow: "hidden" }]}>
          <View
            style={
              open
                ? // mps.calendarDivOpen
                  {
                    width: "82%",
                    flexDirection: "row",
                    justifyContent: "center",
                  }
                : mps.calendarDiv
            }
          >
            {open ? (
              <Fragment>
                <View>
                  <DatePicker
                    textColor="#15998E"
                    className="ml-7"
                    mode="date"
                    date={selectedDate}
                    onDateChange={(date: Date) => selectNewDate(() => date)}
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
              width: "30%",
              paddingRight: open ? 2 : 14,
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
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 100,
    width: "auto",
    backgroundColor: "white",
    borderRadius: 15,
    elevation: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});
