// Buffer Line
import { Fragment, useState } from "react";
import { DateMealData } from "../../utils/type";
import { useDispatch } from "react-redux";
import { action, AppDispatch, store, RootState } from "../../store";
import MealTypeDisplay from "./MealTypeDisplay";
import FoodItemEntryPanel from "./FoodItemEntryPanel";

const fakeFoodData: DateMealData = {
  breakfast: [
    { foodName: "bread", servingSize: 100, sizeUnit: "g" },
    { foodName: "milk", servingSize: 250, sizeUnit: "g" },
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
  const [storeInfo, updateStoreInfo] = useState<RootState>(store.getState());

  const { foodInputPanelOpen, foodItemInConsideration } = storeInfo;
  const [foodInputVisible, foodItemInEdit] = [
    foodInputPanelOpen,
    foodItemInConsideration,
  ];

  const dispatch = useDispatch<AppDispatch>();
  const mealTypeList: string[] = ["Breakfast", "Lunch", "Dinner", "Snack"];

  store.subscribe(() => {
    const newStoreInfo = store.getState();
    updateStoreInfo(() => {
      return newStoreInfo;
    });
  });

  const MealChangeButton = (props: { indexChange: number }) => {
    const { indexChange } = props;
    const icon = indexChange === 1 ? ">" : "<";

    const toggleMealSelection = (indexChange: number) => {
      updateMealType((currentMealType) => {
        let currentIndex = mealTypeList.indexOf(currentMealType);
        let newIndex = (currentIndex + indexChange + 4) % 4;
        return mealTypeList[newIndex];
      });
    };

    return (
      <Fragment>
        {!foodInputVisible ? (
          <button onClick={() => toggleMealSelection(indexChange)}>
            {icon}
          </button>
        ) : null}
      </Fragment>
    );
  };

  return (
    <Fragment>
      <div>
        <span> Meal in Display : </span>
        <span>
          <MealChangeButton indexChange={-1} />
          <span>{mealType}</span>
          <MealChangeButton indexChange={1} />
        </span>
        {foodInputVisible ? null : (
          <button
            onClick={() => {
              dispatch(action("foodPanelVisibility", { visible: true }));
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
      {foodInputVisible ? (
        <FoodItemEntryPanel foodItem={foodItemInEdit} />
      ) : null}
    </Fragment>
  );
}

export default MealTypeSelection;
