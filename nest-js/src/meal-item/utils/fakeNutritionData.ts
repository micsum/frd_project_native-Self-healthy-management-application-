// Buffer Line
import { FoodItemBasicInfo, FullItemInfo } from './type';

const nutritionContentKey: string[] = [
  'calories',
  'fat_total_g',
  'fat_saturated_g',
  'protein_g',
  'sodium_mg',
  'potassium_mg',
  'cholesterol_mg',
  'carbohydrates_total_g',
  'fiber_g',
  'sugar_g',
];

export const createFakeFoodObject: (
  foodItem: FoodItemBasicInfo,
) => FullItemInfo = (foodItem) => {
  const { meal_id, sizeUnit } = foodItem;
  let newFoodItem: any = {};
  newFoodItem.meal_id = meal_id;
  newFoodItem.saved_size_unit = sizeUnit;

  for (let key of nutritionContentKey) {
    newFoodItem[key] = 0;
  }

  return newFoodItem;
};
