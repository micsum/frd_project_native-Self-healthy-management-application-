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
import { View, Text, Button, SafeAreaView } from "react-native";
import { ScrollView } from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { store, action, RootState, AppDispatch } from "../../store";
import FoodItemDisplay from "./FoodItemDisplay";
import FoodItemEntryPanel from "./FoodItemEntryPanel";
import NutritionDetailPanel from "./NutritionDetailDisplay";
import { foodItemDisplayHeight, mps } from "./mealPageComponentStyleSheet";
import { AntDesign } from "@expo/vector-icons";
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
    itemNutritionPanelOpen,
    foodItemInConsideration,
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

  const unitConversion: (
    oldSize: number,
    oldUnit: string,
    newSize: number,
    newUnit: string
  ) => number = (oldSize, oldUnit, newSize, newUnit) => {
    let unitConversion = 1;
    if (oldUnit !== newUnit) {
      const unitConversionList = [
        { from: "g", to: "kg", factor: 1000 },
        { from: "kg", to: "lb", factor: 1 / 2.2 },
        { from: "lb", to: "g", factor: 1 / 453.592 },
      ];

      for (let i = 0; i < 6; i++) {
        const { from, to, factor } = unitConversionList[i % 3];
        if (oldUnit === from) {
          unitConversion *= factor;
          oldUnit = to;
        }
        if (newUnit === oldUnit) {
          break;
        }
      }
    }
    return parseFloat(((newSize * unitConversion) / oldSize).toFixed(4));
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
                existingItem.id === id &&
                existingItem.meal_id === meal_id &&
                existingItem.meal_time === meal_time &&
                existingItem.name === foodName
              ) {
                itemIndex = originalData.indexOf(existingItem);
                itemInConsideration = existingItem;
                break;
              }
            }

            if (itemInConsideration === undefined) {
              break;
            }

            let [
              originalItemServingSize,
              originalItemSizeUnit,
              newItemServingSize,
              newItemSizeUnit,
            ] = [
              itemInConsideration.serving_size_g,
              itemInConsideration.saved_size_unit,
              info.servingSize,
              info.sizeUnit,
            ];
            let multiplyFactor = unitConversion(
              originalItemServingSize,
              originalItemSizeUnit,
              newItemServingSize,
              newItemSizeUnit
            );

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
            newItem.saved_size_unit = sizeUnit;

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
          basicInfoDummy["sizeUnit"] = value("saved_size_unit");

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
  }, [dateMealFullData, mealType]);

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
    foodItemNutritionInfo: FoodItemNutritionInfo[]
  ) => {
    updateNutritionDetail(() => {
      return foodItemNutritionInfo;
    });
  };

  const openEditPanel = () => {
    dispatch(action("foodPanelVisibility", { visible: true }));
  };

  const MealChangeButton = (props: { indexChange: number }) => {
    const { indexChange } = props;
    const icon = indexChange === 1 ? "caretright" : "caretleft";

    const toggleMealSelection = (indexChange: number) => {
      updateMealType((currentMealType) => {
        let currentIndex = mealTypeList.indexOf(currentMealType);
        let newIndex = (currentIndex + indexChange + 4) % 4;
        return mealTypeList[newIndex];
      });
    };

    return (
      <Fragment>
        {!foodInputVisible && !itemNutritionPanelVisible ? (
          <AntDesign
            name={`${icon}`}
            size={24}
            color="black"
            onPress={() => toggleMealSelection(indexChange)}
          />
        ) : null}
      </Fragment>
    );
  };

  return (
    <Fragment>
      <View style={[mps.mealTypeSelection, { height: "10%", marginBottom: 5 }]}>
        <Text style={[mps.mealDisplayText, mps.defaultFontSize]}>
          Meal In Display :{" "}
        </Text>
        <View style={mps.mealTypeToggle}>
          <MealChangeButton indexChange={-1} />
          <Text style={[mps.defaultFontSize, { fontWeight: "bold" }]}>
            {mealTypeDisplayList[mealTypeList.indexOf(mealType)]}
          </Text>
          <MealChangeButton indexChange={1} />
        </View>

        {foodInputVisible || itemNutritionPanelVisible ? null : (
          <View style={mps.addItemButton}>
            <Button title={"Add Item"} onPress={openEditPanel} />
          </View>
        )}
      </View>
      <ScrollView style={foodItemDisplayHeight}>
        <View
          style={{
            alignItems: "center",
          }}
        >
          {mealDisplay.length === 0 ? (
            <Text style={mps.foodItemInputTitle}>
              {"** No Items Consumed **"}
            </Text>
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
        </View>
      </ScrollView>

      {foodInputVisible && !itemNutritionPanelVisible ? (
        <FoodItemEntryPanel
          foodItem={foodItemInEdit}
          mealType={mealType}
          mealID={mealID.current}
          updateMealData={updateItemBasicInfo}
        />
      ) : (
        <NutritionDetailPanel
          panelTitle={`Nutrition Content of ${
            itemNutritionPanelVisible
              ? nutritionDetail[0].name
              : mealTypeDisplayList[mealType.indexOf(mealType)]
          }`}
          nutritionData={
            nutritionDetail.length === 0
              ? retrieveFoodNutritionInformation(dateMealFullData)[
                  mealType as keyof DateMealFullData
                ]
              : nutritionDetail
          }
          showNutritionDetail={updateNutritionDisplayDetail}
        />
      )}
    </Fragment>
  );
}

export default MealTypeSelection;
