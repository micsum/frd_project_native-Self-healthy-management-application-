// Buffer Line
export type FoodItemBasicInfo = {
  id: number;
  meal_id: number;
  meal_time: string;
  foodName: string;
  servingSize: number;
  sizeUnit: string;
};

export type APIFoodItemNutritionInfo = {
  name: string;
  calories: number;
  serving_size_g: number;
  fat_total_g: number;
  fat_saturated_g: number;
  protein_g: number;
  sodium_mg: number;
  potassium_mg: number;
  cholesterol_mg: number;
  carbohydrates_total_g: number;
  fiber_g: number;
  sugar_g: number;
};

export type FullItemInfo = {
  id: number;
  meal_id: number;
  meal_time: string;
  name: string;
  calories: number;
  serving_size_g: number;
  saved_size_unit: string;
  fat_total_g: number;
  fat_saturated_g: number;
  protein_g: number;
  sodium_mg: number;
  potassium_mg: number;
  cholesterol_mg: number;
  carbohydrates_total_g: number;
  fiber_g: number;
  sugar_g: number;
};
