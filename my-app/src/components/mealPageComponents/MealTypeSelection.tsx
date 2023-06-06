// Buffer Line
import {
  Fragment,
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import {
  DateMealFullData,
  FoodItemBasicInfo,
  FoodItemNutritionInfo,
  FormattedFoodItemInfo,
  FullItemInfo,
  ItemChange,
  mealIDObject,
} from "../../utils/type";
import { useDispatch } from "react-redux";
import { store, action, RootState, AppDispatch } from "../../store";
import FoodItemDisplay from "./FoodItemDisplay";
import FoodItemEntryPanel from "./FoodItemEntryPanel";
import NutritionDetailPanel from "./NutritionDetailDisplay";
import { createFakeFoodObject } from "./fakeFoodNutritionData";

function MealTypeSelection(props: { foodItemFullInfo: FullItemInfo[] }) {
  const { foodItemFullInfo } = props;

  const [mealType, updateMealType] = useState<string>("breakfast");
  const [storeInfo, updateStoreInfo] = useState<RootState>(store.getState());
  const [changes, updateChanges] = useState<ItemChange[]>([]);
  const [nutritionDetail, updateNutritionDetail] = useState<
    FoodItemNutritionInfo[]
  >([]);

  const mealID = useRef<mealIDObject>({
    breakfast: -1,
    lunch: -1,
    dinner: -1,
    snack: -1,
  });

  const {
    foodInputPanelOpen,
    foodItemInConsideration,
    itemNutritionPanelOpen,
  } = storeInfo;
  const [foodInputVisible, itemNutritionPanelVisible, foodItemInEdit] = [
    foodInputPanelOpen,
    itemNutritionPanelOpen,
    foodItemInConsideration,
  ];

  const dispatch = useDispatch<AppDispatch>();
  store.subscribe(() => {
    const storeInfo = store.getState();
    updateStoreInfo(() => {
      return storeInfo;
    });
  });

  const mealTypeDisplayList: string[] = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snack",
  ];
  const mealTypeList = ["breakfast", "lunch", "dinner", "snack"];

  const nutritionContentKey: string[] = [
    "calories",
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

  const unitConversion = (expectedUnit: string, servingSizeG: number) => {
    switch (expectedUnit) {
      case "g":
        return servingSizeG;
      case "kg":
        return servingSizeG / 1000;
      case "lb":
        return servingSizeG * 0.0022;
      default:
        return servingSizeG;
    }
  };

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

  const applyChanges = useCallback(
    (originalData: FullItemInfo[], changes: ItemChange[]) => {
      for (let change of changes) {
        const { info, method } = change;
        const { id, meal_id, meal_time, foodName, servingSize, sizeUnit } =
          info;
        switch (method) {
          case "add":
            {
              let existingFoods = originalData.map((foodItem) => {
                return foodItem.meal_time === info.meal_time
                  ? foodItem.name
                  : "";
              });
              if (
                existingFoods.length === 0 ||
                existingFoods.indexOf(info.foodName) === -1
              ) {
                originalData.push(createFakeFoodObject(info));
              }
            }
            break;
          case "update":
            let itemIndex = -1;
            let itemInConsideration;
            let newItem: any = {};
            for (let existingItem of originalData) {
              if (
                existingItem.id === info.id &&
                existingItem.meal_id === info.meal_id &&
                existingItem.meal_time === info.meal_time &&
                existingItem.name === info.foodName
              ) {
                itemIndex = originalData.indexOf(existingItem);
                itemInConsideration = existingItem;
                break;
              }
            }

            if (itemInConsideration === undefined) {
              break;
            }

            let [originalItemServingSize, itemSizeUnit, newItemServingSize] = [
              itemInConsideration.serving_size_g,
              info.sizeUnit,
              info.servingSize,
            ];
            let newServingSize = unitConversion(
              itemSizeUnit,
              newItemServingSize
            );
            let multiplyFactor = newServingSize / originalItemServingSize;

            for (let key of nutritionContentKey) {
              let newValue =
                parseFloat(
                  itemInConsideration[key as keyof FullItemInfo].toString()
                ) * multiplyFactor;
              newItem[key] = newValue;
            }

            newItem.id = id;
            newItem.meal_id = meal_id;
            newItem.meal_time = meal_time;
            newItem.name = foodName;
            newItem.serving_size_g = servingSize;
            newItem.saved_sizeUnit = sizeUnit;

            originalData = [
              ...originalData.slice(0, itemIndex),
              newItem,
              ...originalData.slice(itemIndex + 1),
            ];
            break;
          case "delete": {
            originalData = originalData.filter((foodItem) => {
              return (
                foodItem.id !== info.id ||
                foodItem.meal_id !== info.meal_id ||
                foodItem.meal_time !== info.meal_time
              );
            });
            break;
          }
          default:
            break;
        }
      }
      return originalData;
    },
    []
  );

  const reformatMealData = useCallback((data: FullItemInfo[]) => {
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
  }, []);

  const dateMealFullData = useMemo(() => {
    const appliedChanges = applyChanges(foodItemFullInfo, changes);
    return reformatMealData(appliedChanges);
  }, [foodItemFullInfo, changes]);

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

  useEffect(() => {
    updateNutritionDetail(() => {
      return retrieveFoodNutritionInformation(dateMealFullData)[
        mealType as keyof DateMealFullData
      ];
    });
  }, [dateMealFullData]);

  const mealDisplay = dateMealFullData[mealType as keyof DateMealFullData];

  const updateItemBasicInfo = async (updatedItem: FoodItemBasicInfo) => {
    if (updatedItem.id !== -1 && updatedItem.meal_id !== -1) {
      // update Existing Item
      updateChanges(() => {
        return [...changes, { info: updatedItem, method: "update" }];
      });
    } else if (updatedItem.id === -1 && updatedItem.meal_id !== -1) {
      // add Item to Existing Meal OR update new Item added in this session
      let itemIndex = -1;

      for (let change of changes) {
        const { info, method } = change;
        if (
          info.foodName === updatedItem.foodName &&
          info.meal_time === updatedItem.meal_time &&
          method === "add"
        ) {
          itemIndex = changes.indexOf(change);
          break;
        }
      }

      if (itemIndex === -1) {
        updateChanges(() => {
          return [...changes, { info: updatedItem, method: "add" }];
        });
      } else {
        updateChanges(() => {
          return [
            ...changes.slice(0, itemIndex),
            { info: updatedItem, method: "add" },
            ...changes.slice(itemIndex),
          ];
        });
      }
    } else {
      const mealType = updatedItem.meal_time;
      const existingItems =
        dateMealFullData[mealType as keyof DateMealFullData];
      const existingItemName = existingItems.map((foodItem) => {
        return foodItem.basicInfo.foodName;
      });
      if (existingItemName.indexOf(updatedItem.foodName) !== -1) {
        console.log(`duplicated Items`);
        return;
      }
      updateChanges(() => {
        return [...changes, { info: updatedItem, method: "add" }];
      });
    }

    dispatch(action("foodPanelVisibility", { visible: false }));
    dispatch(action("foodItemInfo", {}));
  };

  const removeMealItem = (removedItem: FoodItemBasicInfo) => {
    updateChanges(() => {
      return [...changes, { info: removedItem, method: "delete" }];
    });
  };

  const updateNutritionDisplayDetail = (
    foodItemNutritionInfo: FoodItemNutritionInfo
  ) => {
    updateNutritionDetail(() => {
      return [foodItemNutritionInfo];
    });
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
              showNutritionDetail={updateNutritionDisplayDetail}
            />
          );
        })
      )}
      {foodInputVisible && !itemNutritionPanelOpen ? (
        <FoodItemEntryPanel
          foodItem={foodItemInEdit}
          mealType={mealType}
          mealID={mealID.current}
          updateMealData={updateItemBasicInfo}
        />
      ) : (
        <NutritionDetailPanel
          panelTitle={`Nutrition Content of ${
            itemNutritionPanelOpen
              ? nutritionDetail[0].name
              : mealTypeDisplayList[mealType.indexOf(mealType)]
          }`}
          nutritionData={nutritionDetail}
        />
      )}
    </Fragment>
  );
}

export default MealTypeSelection;
