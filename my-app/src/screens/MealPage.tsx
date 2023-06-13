// Buffer Line
import { Fragment, useState, useMemo, useEffect } from "react";
import { Provider } from "react-redux";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { store } from "../store";
import DateSelectionPanel from "../components/mealPageComponents/DateSelectionPanel";
import MealTypeSelection from "../components/mealPageComponents/MealTypeSelection";
import { fakeFoodNutritionData } from "../utils/fakeFoodNutritionData";
import { FullItemInfo } from "../utils/type";
import { NativeBaseProvider } from "native-base";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Dialog,
} from "react-native-alert-notification";
import { createStackNavigator } from "@react-navigation/stack";
import { getFromSecureStore } from "../storage/secureStore";
import { Domain } from "@env";

const MealPage: React.FC = () => {
  const [date, updateSelectedDate] = useState<Date>(
    new Date(new Date().getTime() + 8 * 3600000)
  );
  const [dateMealData, updateDateMealData] = useState<FullItemInfo[]>([]);
  const [dateChanging, toggleDateChanging] = useState<boolean>(false);

  const updateMealData = async () => {
    //let newData = await getDateMealData(date);
    const token = await getFromSecureStore("token");
    if (typeof token !== "string") {
      return;
    }
    const dateString = date?.toISOString().split("T")[0];
    const res = await fetch(`${Domain}/mealItem/${token}/${dateString}`);
    const result = await res.json();
    if (result.error) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: result.error,
        autoClose: 1500,
      });
      return;
    }
    updateDateMealData(() => {
      return result.mealData;
    });
  };

  useMemo(() => {
    updateMealData();
  }, [date]);

  const selectNewDate = (date: Date) => {
    updateSelectedDate(() => {
      return date;
    });
  };

  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <Provider store={store}>
          <AlertNotificationRoot>
            <SafeAreaView
              style={{
                marginTop: 10,
                paddingBottom: useSafeAreaInsets().bottom,
              }}
            >
              <DateSelectionPanel updateSelectedDate={selectNewDate} />
              {!dateChanging ? (
                <MealTypeSelection
                  date={date}
                  foodItemFullInfo={dateMealData}
                />
              ) : null}
            </SafeAreaView>
          </AlertNotificationRoot>
        </Provider>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
};

export function MealScreen({}) {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeNoStack"
        component={MealPage}
        options={{
          headerShown: true,
          title: "Meal History",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#38668E" },
          headerTintColor: "#a5f3fc",
          headerBackTitle: " ",
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
