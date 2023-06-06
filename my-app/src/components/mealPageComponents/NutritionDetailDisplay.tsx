// Buffer Line
import { Fragment } from "react";
import {
  FoodItemNutritionInfo,
  NutritionContentDisplay,
} from "../../utils/type";

function NutritionDetailPanel(props: {
  panelTitle: string;
  editable: boolean;
  foodData: FoodItemNutritionInfo[];
}) {
  const { panelTitle, editable, foodData } = props;
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

  foodData.map((foodItem) => {
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

  return (
    <Fragment>
      <div>
        <span>{panelTitle}</span>
      </div>
      <div>
        {nutritionContentArray.map((nutritionContentRow) => {
          return (
            <div key={nutritionContentRow.title}>
              <span>
                {nutritionContentRow.title} : {nutritionContentRow.amount}{" "}
                {nutritionContentRow.unit}
              </span>
            </div>
          );
        })}
      </div>
      {editable ? (
        <button>
          <span>Edit</span>
        </button>
      ) : null}
    </Fragment>
  );
}

export default NutritionDetailPanel;
