// Buffer Line
import { Fragment, useState } from "react";
import { DateMealData } from "../../utils/type";
import MealTypeDisplay from "./MealTypeDisplay";

const fakeFoodData: DateMealData = {
  breakfast: [
    { foodName: "bread", servingSize: 100, sizeUnit: "g" },
    { foodName: "milk", servingSize: 250, sizeUnit: "mL" },
    { foodName: "egg", servingSize: 2, sizeUnit: "" },
  ],
  lunch: [
    { foodName: "pasta", servingSize: 300, sizeUnit: "g" },
    { foodName: "pork", servingSize: 200, sizeUnit: "g" },
    { foodName: "brocoli", servingSize: 200, sizeUnit: "g" },
  ],
  dinner: [
    { foodName: "rice", servingSize: 300, sizeUnit: "g" },
    { foodName: "beef", servingSize: 200, sizeUnit: "g" },
    { foodName: "carrot", servingSize: 150, sizeUnit: "g" },
  ],
  snack: [],
};

function MealTypeSelection(props: { selectedDate: Date }) {
  const { selectedDate } = props;
  const [dateMealData, updateDateMealData] =
    useState<DateMealData>(fakeFoodData);
  const [mealType, updateMealType] = useState<string>("Breakfast");
  const [foodInputHidden, updateFoodInputVisibility] = useState<boolean>(true);

  const mealTypeList: string[] = ["Breakfast", "Lunch", "Dinner", "Snack"];
  const toggleMealSelection = (indexChange: number) => {
    updateMealType((currentMealType) => {
      let currentIndex = mealTypeList.indexOf(currentMealType);
      let newIndex = (currentIndex + indexChange + 4) % 4;
      return mealTypeList[newIndex];
    });
  };

  return (
    <Fragment>
      <div>
        <span> Meal in Display : </span>
        <span>
          <button onClick={() => toggleMealSelection(-1)}>{"<"}</button>
          <span>{mealType}</span>
          <button onClick={() => toggleMealSelection(1)}>{">"}</button>
        </span>
        <button
          onClick={() => {
            updateFoodInputVisibility(() => {
              return !foodInputHidden;
            });
          }}
        >
          {foodInputHidden ? (
            <span>
              <span>+</span> Add item
            </span>
          ) : (
            <span>
              Close <span>X</span>
            </span>
          )}
        </button>
      </div>
      {foodInputHidden ? null : <input />}
      <MealTypeDisplay
        mealType={mealTypeList.indexOf(mealType)}
        mealData={dateMealData}
      />
    </Fragment>
  );
}

export default MealTypeSelection;
