// Buffer Line
import { Fragment, useState, useMemo, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import DateSelectionPanel from "../components/mealPageComponents/DateSelectionPanel";
import MealTypeSelection from "../components/mealPageComponents/MealTypeSelection";
import { FullItemInfo } from "../utils/type";
import { fakeFoodNutritionData } from "../components/mealPageComponents/fakeFoodNutritionData";

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

  return (
    <Fragment>
      <Provider store={store}>
        {/* <DateSelectionPanel date={date} selectNewDate={updateSelectedDate} /> */}
        <MealTypeSelection foodItemFullInfo={dateMealData}></MealTypeSelection>
      </Provider>
    </Fragment>
  );
};

export function MealScreen({}) {
  return <MealPage />;
}
