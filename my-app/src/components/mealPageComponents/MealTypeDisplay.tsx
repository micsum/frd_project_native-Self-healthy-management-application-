// Buffer Line
import { Fragment, useState, useMemo } from "react";
import {
  DateMealBasicData,
  DateMealFullData,
  FoodItemBasicInfo,
  FoodItemNutritionInfo,
  FormattedFoodItemInfo,
  FullItemInfo,
} from "../../utils/type";
import { useDispatch } from "react-redux";
import { store, action, RootState, AppDispatch } from "../../store";
import FoodItemDisplay from "./FoodItemDisplay";
import FoodItemEntryPanel from "./FoodItemEntryPanel";

function MealTypeSelection(props: { foodItemFullInfo: FullItemInfo[] }) {
  const { foodItemFullInfo } = props;

  const [dateMealBasicData, updateDateMealBasicData] =
    useState<DateMealBasicData>({
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: [],
    });
  const [mealType, updateMealType] = useState<string>("breakfast");
  const [storeInfo, updateStoreInfo] = useState<RootState>(store.getState());

  const { foodInputPanelOpen, foodItemInConsideration } = storeInfo;
  const [foodInputVisible, foodItemInEdit] = [
    foodInputPanelOpen,
    foodItemInConsideration,
  ];

  const dispatch = useDispatch<AppDispatch>();
  store.subscribe(() => {
    const newStoreInfo = store.getState();
    updateStoreInfo(() => {
      return newStoreInfo;
    });
  });

  const mealTypeDisplayList: string[] = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snack",
  ];
  const mealTypeList = ["breakfast", "lunch", "dinner", "snack"];

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

  const reformatMealData: (data: FullItemInfo[]) => DateMealFullData = (
    data
  ) => {
    let breakfastItems: FullItemInfo[] = [],
      lunchItems: FullItemInfo[] = [],
      dinnerItems: FullItemInfo[] = [],
      snackItems: FullItemInfo[] = [];
    for (let foodItem of data) {
      switch (foodItem.meal_time) {
        case "breakfast":
          breakfastItems.push(foodItem);
          break;
        case "lunch":
          lunchItems.push(foodItem);
          break;
        case "dinner":
          dinnerItems.push(foodItem);
          break;
        case "snack":
          snackItems.push(foodItem);
          break;
        default:
          break;
      }
    }

    let breakfast: FormattedFoodItemInfo[] = [],
      lunch: FormattedFoodItemInfo[] = [],
      dinner: FormattedFoodItemInfo[] = [],
      snack: FormattedFoodItemInfo[] = [];
    let newVariables: FormattedFoodItemInfo[][] = [[], [], [], []];
    let mealArrays = [breakfastItems, lunchItems, dinnerItems, snackItems];

    for (let mealArray of mealArrays) {
      newVariables[mealArrays.indexOf(mealArray)] = mealArray.map(
        (foodItem) => {
          const value = (param: string): number | string => {
            return foodItem[param as keyof FullItemInfo];
          };

          const basicInfoParams: string[] = [
            "id",
            "meal_id",
            "meal_time",
            //"foodName",
            //"servingSize",
            //"sizeUnit",
          ];
          const nutritionInfoParams: string[] = [
            "id",
            "name",
            "calories",
            "serving_size_g",
            "fat_total_g",
            "fat_saturated_g",
            "protein_g",
            "sodium_mg",
            "potassium_mg",
            "cholesterol_mg",
            "carbohydrates_total_g",
            "fiber_g",
            "sugar_g",
          ];

          let basicInfoDummy: any = {};
          let nutritionInfoDummy: any = {};

          basicInfoParams.map((param: string) => {
            basicInfoDummy[param as keyof FoodItemBasicInfo] = value(param);
          });
          basicInfoDummy["foodName"] = value("name");
          basicInfoDummy["servingSize"] = value("serving_size_g");
          basicInfoDummy["sizeUnit"] = value("saved_sizeUnit");

          nutritionInfoParams.map((param: string) => {
            nutritionInfoDummy[param as keyof FoodItemNutritionInfo] =
              value(param);
          });

          const basicInfo: FoodItemBasicInfo = basicInfoDummy;
          const nutritionInfo: FoodItemNutritionInfo = nutritionInfoDummy;

          return { basicInfo, nutritionInfo };
        }
      );
    }
    [breakfast, lunch, dinner, snack] = newVariables;
    return { breakfast, lunch, dinner, snack };
  };

  const retrieveFoodNutritionInformation = (data: DateMealFullData) => {
    let mealArrays = [data.breakfast, data.lunch, data.dinner, data.snack];
    let newVariables: FoodItemNutritionInfo[][] = [[], [], [], []];

    for (let mealArray of mealArrays) {
      newVariables[mealArrays.indexOf(mealArray)] = mealArray.map(
        (foodItemInfo) => {
          return foodItemInfo.nutritionInfo;
        }
      );
    }
    let [breakfast, lunch, dinner, snack] = newVariables;
    return { breakfast, lunch, dinner, snack };
  };

  const dateMealFullData = useMemo(() => {
    let formattedData = reformatMealData(foodItemFullInfo);

    let mealArrays = [
      formattedData.breakfast,
      formattedData.lunch,
      formattedData.dinner,
      formattedData.snack,
    ];
    let newVariables: FoodItemBasicInfo[][] = [[], [], [], []];

    for (let mealArray of mealArrays) {
      newVariables[mealArrays.indexOf(mealArray)] = mealArray.map(
        (foodItemInfo) => {
          return foodItemInfo.basicInfo;
        }
      );
    }
    let [breakfast, lunch, dinner, snack] = newVariables;
    updateDateMealBasicData(() => {
      return { breakfast, lunch, dinner, snack };
    });

    return formattedData;
  }, [foodItemFullInfo]);

  const mealDisplay = dateMealFullData[mealType as keyof DateMealFullData];

  const updateItemBasicInfo = (updatedItem: FoodItemBasicInfo) => {
    let mealItemList = dateMealBasicData[mealType as keyof DateMealBasicData];
    let itemUpdated = 0;
    if (updatedItem.id !== -1) {
      mealItemList = mealItemList.map((foodItem: FoodItemBasicInfo) => {
        if (foodItem.id === updatedItem.id) {
          itemUpdated++;
          return updatedItem;
        } else {
          return foodItem;
        }
      });
    }
    itemUpdated === 0 ? mealItemList.push(updatedItem) : null;

    updateDateMealBasicData(() => {
      return { ...dateMealBasicData, [mealType]: mealItemList };
    });

    dispatch(action("foodPanelVisibility", { visible: false }));
    dispatch(action("foodItemInfo", {}));
  };

  const removeMealItem = (removedItem: FoodItemBasicInfo) => {
    let mealItemList = dateMealBasicData[mealType as keyof DateMealBasicData];
    mealItemList = mealItemList.filter((foodItem: FoodItemBasicInfo) => {
      return foodItem.foodName !== removedItem.foodName;
    });
    console.log(mealItemList);
    updateDateMealBasicData(() => {
      return { ...dateMealBasicData, [mealType]: mealItemList };
    });
    console.log({ ...dateMealBasicData, [mealType]: mealItemList });
  };

  return (
    <Fragment>
      <div>
        <span>Meal In Display : </span>
        <span>
          <MealChangeButton indexChange={-1} />
          <span>{mealTypeDisplayList[mealTypeList.indexOf(mealType)]}</span>
          <MealChangeButton indexChange={1} />
        </span>
        {foodInputVisible ? null : (
          <button
            onClick={() => {
              dispatch(action("foodPanelVisibility", { visible: true }));
            }}
          >
            <span>
              <span>+</span>Add item
            </span>
          </button>
        )}
      </div>
      {mealDisplay.length === 0 ? (
        <div>{"** No Items Consumed **"}</div>
      ) : (
        mealDisplay.map((foodItem: FormattedFoodItemInfo) => {
          const itemIndex = mealDisplay.indexOf(foodItem) + 1;
          return (
            <FoodItemDisplay
              key={itemIndex}
              itemIndex={itemIndex}
              foodItemBasicInfo={foodItem.basicInfo}
              foodItemNutritionInfo={foodItem.nutritionInfo}
              removeMealItem={removeMealItem}
            />
          );
        })
      )}
      {foodInputVisible ? (
        <FoodItemEntryPanel
          foodItem={foodItemInEdit}
          mealType={mealType}
          updateMealData={updateItemBasicInfo}
        />
      ) : null}
    </Fragment>
  );
}

export default MealTypeSelection;
