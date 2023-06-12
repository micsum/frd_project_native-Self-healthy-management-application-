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
import { fakeFoodNutritionData } from "../components/mealPageComponents/fakeFoodNutritionData";
import { FullItemInfo } from "../utils/type";
import { NativeBaseProvider } from "native-base";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { createStackNavigator } from "@react-navigation/stack";

const MealPage: React.FC = () => {
  const [date, updateSelectedDate] = useState<Date>(new Date());
  const [dateMealData, updateDateMealData] = useState<FullItemInfo[]>([]);

  const getDateMealData = async (date: Date) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return fakeFoodNutritionData;
  };

  const updateMealData = async () => {
    let newData = await getDateMealData(date);
    updateDateMealData(newData);
  };

  useMemo(() => {
    updateMealData();
  }, [date]);

  const selectNewDate = (date: Date) => {
    console.log(date);
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
              <DateSelectionPanel date={date} selectNewDate={selectNewDate} />
              <MealTypeSelection
                date={date}
                foodItemFullInfo={dateMealData}
              ></MealTypeSelection>
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
