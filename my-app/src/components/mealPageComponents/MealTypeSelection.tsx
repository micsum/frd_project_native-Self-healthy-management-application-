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
import { useDispatch } from "react-redux";
import { store, updateRootState, RootState, AppDispatch } from "../../store";
import FoodItemDisplay from "./FoodItemDisplay";
import FoodItemEntryPanel from "./FoodItemEntryPanel";
import NutritionDetailPanel from "./NutritionDetailDisplay";
import { foodItemDisplayHeight, mps } from "./mealPageComponentStyleSheet";
import { AntDesign } from "@expo/vector-icons";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import { Domain } from "@env";
import { handleToken } from "../../hooks/use-token";

function MealTypeSelection(props: {
  date: Date;
  foodItemFullInfo: FullItemInfo[];
}) {
  const { date, foodItemFullInfo } = props;

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
    updateStoreInfo(storeInfo);
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

  const applyChanges = useCallback(
    (originalData: FullItemInfo[]) => {
      for (let change of changes) {
        const { info, method } = change;
        const { id, meal_id, meal_time } = info;
        switch (method) {
          case "add":
            {
              //@ts-ignore
              originalData = [...originalData, change.info];
            }
            break;
          case "update":
            const originalDataID = originalData.map((foodItem) => {
              return foodItem.id;
            });
            const itemIndex = originalDataID.indexOf(id);

            //@ts-ignore
            originalData = [
              ...originalData.slice(0, itemIndex),
              change.info,
              ...originalData.slice(itemIndex + 1),
            ];
            break;
          case "delete": {
            originalData = originalData.filter((foodItem) => {
              return (
                foodItem.id !== id ||
                foodItem.meal_id !== meal_id ||
                foodItem.meal_time !== meal_time
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
    [changes]
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
          console.log(foodItem);
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

          const sizeUnit = value("saved_size_unit").toString();
          const sizeInG = parseFloat(value("serving_size_g").toString());

          basicInfoDummy["foodName"] = value("name");
          basicInfoDummy["sizeUnit"] = sizeUnit;

          basicInfoDummy["servingSize"] = parseFloat(
            (sizeUnit === "g"
              ? sizeInG
              : sizeUnit === "kg"
              ? sizeInG / 1000
              : sizeInG / 453.592
            ).toFixed(2)
          );

          console.log(basicInfoDummy);

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

    for (let mealTypeItemArray of newVariables) {
      let currentMealType =
        mealTypeList[newVariables.indexOf(mealTypeItemArray)];
      if (mealTypeItemArray.length === 0) {
        mealID.current = { ...mealID.current, [currentMealType]: -1 };
        continue;
      }
      let currentMealID = mealTypeItemArray[0].basicInfo.meal_id;
      if (currentMealID !== -1) {
        mealID.current = {
          ...mealID.current,
          [currentMealType]: currentMealID,
        };
      }
    }

    [breakfast, lunch, dinner, snack] = newVariables;
    return { breakfast, lunch, dinner, snack };
  }, []);

  const dateMealFullData = useMemo(() => {
    const appliedChanges = applyChanges(foodItemFullInfo);
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
    updateNutritionDetail(
      retrieveFoodNutritionInformation(dateMealFullData)[
        mealType as keyof DateMealFullData
      ]
    );
  }, [dateMealFullData, mealType]);

  const mealDisplay = dateMealFullData[mealType as keyof DateMealFullData];

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

  const updateCurrentFoodItem: (
    currenFoodItem: FoodItemBasicInfo
  ) => FullItemInfo = (currentFoodItem) => {
    const { id, meal_id, meal_time, foodName, servingSize, sizeUnit } =
      currentFoodItem;

    let itemInConsideration;
    let newItem: any = {};
    for (let existingItem of mealDisplay) {
      if (existingItem.basicInfo.id === id) {
        itemInConsideration = existingItem;
        break;
      }
    }

    if (itemInConsideration === undefined) {
      return;
    }

    const [
      originalItemServingSize,
      originalItemSizeUnit,
      newItemServingSize,
      newItemSizeUnit,
    ] = [
      itemInConsideration.basicInfo.servingSize,
      itemInConsideration.basicInfo.sizeUnit,
      servingSize,
      sizeUnit,
    ];

    const multiplyFactor = unitConversion(
      originalItemServingSize,
      originalItemSizeUnit,
      newItemServingSize,
      newItemSizeUnit
    );

    for (let key of nutritionContentKey) {
      let newValue =
        parseFloat(
          itemInConsideration.nutritionInfo[
            key as keyof FoodItemNutritionInfo
          ].toString()
        ) * multiplyFactor;
      newItem[key] = parseFloat(newValue.toFixed(4));
    }

    newItem.id = id;
    newItem.meal_id = meal_id;
    newItem.meal_time = meal_time;
    newItem.name = foodName;
    newItem.serving_size_g =
      sizeUnit === "g"
        ? servingSize
        : sizeUnit === "kg"
        ? servingSize * 1000
        : servingSize * 453.592;
    newItem.saved_size_unit = sizeUnit;

    return newItem;
  };

  const { token } = handleToken();
  const updateItemBasicInfo = async (updatedItem: FoodItemBasicInfo) => {
    if (updatedItem.id !== -1 && updatedItem.meal_id !== -1) {
      const newUpdatedItem = updateCurrentFoodItem(updatedItem);
      const res = await fetch(`${Domain}/mealItem`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUpdatedItem),
      });
      const result = await res.json();
      if (result.message) {
        const errorMessage = Array.isArray(result.message)
          ? result.message[0]
          : result.message;
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: errorMessage,
          autoClose: 1500,
        });
        return;
      }
      if (result.error) {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: result.error,
          autoClose: 1500,
        });
        return;
      }
      updateChanges((changes) => {
        return [...changes, { info: newUpdatedItem, method: "update" }];
      });
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: `Successfully Updated ${updatedItem.foodName}`,
        button: "OK",
      });
    } else {
      const existingFoodItems = mealDisplay.map((food) => {
        return food.basicInfo.foodName.toLowerCase();
      });

      if (
        existingFoodItems.indexOf(updatedItem.foodName.toLowerCase()) !== -1
      ) {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: `${updatedItem.foodName} is already present in ${updatedItem.meal_time}`,
          autoClose: 1500,
        });
        return;
      }
      if (typeof token !== "string") {
        return;
      }
      const dateString = date.toISOString().split("T")[0];
      const res = await fetch(`${Domain}/mealItem/${dateString}`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      });
      const result = await res.json();

      if (result.message) {
        const errorMessage = Array.isArray(result.message)
          ? result.message[0]
          : result.message;
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: errorMessage,
          autoClose: 1500,
        });
        return;
      }
      if (result.error) {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: result.error,
          autoClose: 1500,
        });
        return;
      }

      const itemInfo: FullItemInfo = result.itemInfo;

      if (updatedItem.meal_id === -1) {
        mealID.current = {
          ...mealID.current,
          [updatedItem.meal_time]: itemInfo.meal_id,
        };
      }

      updateChanges((changes) => {
        return [...changes, { info: itemInfo, method: "add" }];
      });
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: `Successfully Added ${updatedItem.foodName}`,
        autoClose: 1500,
      });
    }
    dispatch(updateRootState("foodInputPanelOpen", false));
    dispatch(updateRootState("foodItemInConsideration", undefined));
    return;
  };

  const removeMealItem = async (removedItem: FoodItemBasicInfo) => {
    const res = await fetch(`${Domain}/mealItem`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(removedItem),
    });
    const result = await res.json();

    if (result.message) {
      const errorMessage = Array.isArray(result.message)
        ? result.message[0]
        : result.message;
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: errorMessage,
        autoClose: 1500,
      });
      return;
    }
    if (result.error) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: result.error,
        autoClose: 1500,
      });
      return;
    }

    updateChanges((changes) => {
      return [...changes, { info: removedItem, method: "delete" }];
    });
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: `Successfully Removed ${removedItem.foodName}`,
      button: "OK",
    });
    return;
  };

  const updateNutritionDisplayDetail = (
    foodItemNutritionInfo: FoodItemNutritionInfo[]
  ) => {
    updateNutritionDetail(() => {
      return foodItemNutritionInfo;
    });
  };

  const openEditPanel = () => {
    dispatch(updateRootState("foodInputPanelOpen", true));
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
      <View style={[mps.mealTypeSelection, { height: "10%" }]}>
        <Text style={[mps.mealDisplayText, mps.defaultFontSize]}>
          Meal In Display :{" "}
        </Text>
        <View style={mps.mealTypeToggle}>
          <MealChangeButton indexChange={-1} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "60%",
            }}
          >
            <Text
              style={[
                mps.defaultFontSize,
                {
                  fontWeight: "bold",
                },
              ]}
            >
              {mealTypeDisplayList[mealTypeList.indexOf(mealType)]}
            </Text>
          </View>
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
              : mealTypeDisplayList[mealTypeList.indexOf(mealType)]
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
