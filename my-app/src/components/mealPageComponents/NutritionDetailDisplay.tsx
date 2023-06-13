// Buffer Line
import { useState } from "react";
import { View, Text, Button } from "react-native";
import { useDispatch } from "react-redux";
import { store, action, AppDispatch } from "../../store";
import {
  FoodItemNutritionInfo,
  NutritionContentDisplay,
} from "../../utils/type";
import { mps } from "./mealPageComponentStyleSheet";
import { ScrollView } from "native-base";

function NutritionDetailPanel(props: {
  panelTitle: string;
  nutritionData: FoodItemNutritionInfo[];
  showNutritionDetail: (foodItemNutritionInfo: FoodItemNutritionInfo[]) => void;
}) {
  const { panelTitle, nutritionData, showNutritionDetail } = props;

  const [itemNutritionPanelVisible, updateItemNutritionPanelVisibility] =
    useState<boolean>(store.getState().itemNutritionPanelOpen);

  const dispatch = useDispatch<AppDispatch>();

  store.subscribe(() => {
    const storeInfo = store.getState();
    updateItemNutritionPanelVisibility(storeInfo.itemNutritionPanelOpen);
  });

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
  const nutritionContentDisplayKey: string[] = [
    "Calories",
    "Total Fat ",
    "Saturated Fat",
    "Protein",
    "Sodium",
    "Potassium",
    "Cholesterol",
    "Total Carbohydrates",
    "Fiber",
    "Sugar",
  ];
  const nutritionContentUnitList: string[] = [
    "kcal",
    "g",
    "g",
    "g",
    "mg",
    "mg",
    "mg",
    "g",
    "g",
    "g",
  ];
  let nutritionContentArray: NutritionContentDisplay[] = [];

  for (let key of nutritionContentKey) {
    let unit = nutritionContentUnitList[nutritionContentKey.indexOf(key)];
    nutritionContentArray.push({
      title: key,
      amount: 0,
      unit,
    });
  }

  nutritionData.map((foodItem) => {
    for (let nutritionType of nutritionContentArray) {
      nutritionType.amount += parseFloat(
        foodItem[nutritionType.title as keyof FoodItemNutritionInfo].toString()
      );
    }
  });

  nutritionContentArray = nutritionContentArray.map((nutritionContent) => {
    let title =
      nutritionContentDisplayKey[
        nutritionContentArray.indexOf(nutritionContent)
      ];
    let newAmount = nutritionContent.amount.toFixed(2);
    return {
      title,
      amount: parseFloat(newAmount),
      unit: nutritionContent.unit,
    };
  });

  const closeItemNutritionPanel = () => {
    dispatch(action("itemNutritionPanelVisibility", { visible: false }));
    showNutritionDetail([]);
  };

  return (
    <View style={mps.detailPanel}>
      <ScrollView
        showsVerticalScrollIndicator={true}
        persistentScrollbar={true}
        endFillColor={"purple"}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={mps.panelTitle}>{panelTitle}</Text>
          {itemNutritionPanelVisible ? (
            <Button title="Close" onPress={closeItemNutritionPanel} />
          ) : null}
        </View>
        <View>
          {nutritionContentArray.map((nutritionContentRow) => {
            return (
              <View
                key={nutritionContentRow.title}
                style={mps.nutritionContentDisplay}
              >
                <Text style={mps.nutritionContentText}>
                  {nutritionContentRow.title} : {nutritionContentRow.amount}{" "}
                  {nutritionContentRow.unit}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

export default NutritionDetailPanel;
