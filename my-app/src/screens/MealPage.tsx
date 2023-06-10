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
          <SafeAreaView
            style={{
              paddingTop: useSafeAreaInsets().top,
              paddingBottom: useSafeAreaInsets().bottom,
            }}
          >
            <DateSelectionPanel date={date} selectNewDate={selectNewDate} />
            <MealTypeSelection
              foodItemFullInfo={dateMealData}
            ></MealTypeSelection>
          </SafeAreaView>
        </Provider>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
};

export function MealScreen({}) {
  return <MealPage />;
}
