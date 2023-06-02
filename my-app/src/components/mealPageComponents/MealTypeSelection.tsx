// Buffer Line
import { Fragment, useState } from "react";
import { DateMealData, FoodItem } from "../../utils/type";
import { useDispatch } from "react-redux";
import { action, AppDispatch, store } from "../../store";
import MealTypeDisplay from "./MealTypeDisplay";
import FoodItemEntryPanel from "./FoodItemEntryPanel";

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
  const [foodInputVisible, updateFoodInputVisibility] = useState<boolean>(
    store.getState().foodInputPanelOpen
  );
  const [FoodItemInEdit, updateFoodItemInEdit] = useState<FoodItem | undefined>(
    store.getState().foodItemInConsideration
  );

  const dispatch = useDispatch<AppDispatch>();
  const mealTypeList: string[] = ["Breakfast", "Lunch", "Dinner", "Snack"];

  const toggleMealSelection = (indexChange: number) => {
    updateMealType((currentMealType) => {
      let currentIndex = mealTypeList.indexOf(currentMealType);
      let newIndex = (currentIndex + indexChange + 4) % 4;
      return mealTypeList[newIndex];
    });
  };

  store.subscribe(() => {
    const storeInfo = store.getState();
    updateFoodInputVisibility(() => {
      return storeInfo.foodInputPanelOpen;
    });
    updateFoodItemInEdit(() => {
      return storeInfo.foodItemInConsideration;
    });
  });

  return (
    <Fragment>
      <div>
        <span> Meal in Display : </span>
        <span>
          <button onClick={() => toggleMealSelection(-1)}>{"<"}</button>
          <span>{mealType}</span>
          <button onClick={() => toggleMealSelection(1)}>{">"}</button>
        </span>
        {foodInputVisible ? null : (
          <button
            onClick={() => {
              dispatch(
                action("updateFoodInputPanelVisibility", { visible: true })
              );
            }}
          >
            <span>
              <span>+</span> Add item
            </span>
          </button>
        )}
      </div>
      <MealTypeDisplay
        mealType={mealTypeList.indexOf(mealType)}
        mealData={dateMealData}
      />
      {foodInputVisible ? <FoodItemEntryPanel /> : null}
    </Fragment>
  );
}

export default MealTypeSelection;
