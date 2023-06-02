// Buffer Line
import { Fragment, useEffect, useState } from "react";
import { DateMealData, FoodItem } from "../../utils/type";
import FoodItemsDisplay from "./FoodItemDisplay";

function MealTypeDisplay(props: { mealType: number; mealData: DateMealData }) {
  const { mealType, mealData } = props;
  const mealTypeList = ["breakfast", "lunch", "dinner", "snack"];
  const [mealDisplay, updateMealDisplay] = useState<FoodItem[]>(
    mealData[mealTypeList[mealType] as keyof DateMealData]
  );

  useEffect(() => {
    const mealDisplayData =
      mealData[mealTypeList[mealType] as keyof DateMealData];
    updateMealDisplay(() => {
      return mealDisplayData;
    });
  }, [mealType, mealData]);

  return (
    <Fragment>
      {mealDisplay.length === 0 ? (
        <div>{"** No Items Consumed **"}</div>
      ) : (
        mealDisplay.map((foodItem) => {
          let itemIndex = mealDisplay.indexOf(foodItem);
          return (
            <FoodItemsDisplay
              key={itemIndex}
              itemIndex={itemIndex + 1}
              foodItem={foodItem}
            />
          );
        })
      )}
    </Fragment>
  );
}

export default MealTypeDisplay;
