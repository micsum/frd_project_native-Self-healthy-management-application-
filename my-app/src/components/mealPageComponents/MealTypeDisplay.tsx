// Buffer Line
import { Fragment, useEffect, useState } from "react";
import { DateMealData, FoodItem } from "../../utils/type";
import FoodItemsDisplay from "./FoodItemDisplay";

function MealTypeDisplay(props: { mealType: string; mealData: DateMealData }) {
  const { mealType, mealData } = props;
  const [mealDisplay, updateMealDisplay] = useState<FoodItem[]>(
    mealData[mealType as keyof DateMealData]
  );

  useEffect(() => {
    const mealDisplayData = mealData[mealType as keyof DateMealData];
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
