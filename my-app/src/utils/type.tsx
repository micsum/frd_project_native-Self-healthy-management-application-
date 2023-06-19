// Buffer Line
export type ObjectAny = {
  [key: string]: any;
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

export type FoodItemBasicInfo = {
  id: number;
  meal_id: number;
  meal_time: string;
  foodName: string;
  servingSize: number;
  sizeUnit: string;
};

export type FoodItemNutritionInfo = {
  id: number;
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

export type FormattedFoodItemInfo = {
  basicInfo: FoodItemBasicInfo;
  nutritionInfo: FoodItemNutritionInfo;
};

export type DateMealBasicData = {
  breakfast: FoodItemBasicInfo[];
  lunch: FoodItemBasicInfo[];
  dinner: FoodItemBasicInfo[];
  snack: FoodItemBasicInfo[];
};

export type DateMealFullData = {
  breakfast: FormattedFoodItemInfo[];
  lunch: FormattedFoodItemInfo[];
  dinner: FormattedFoodItemInfo[];
  snack: FormattedFoodItemInfo[];
};

export type NutritionContentDisplay = {
  title: string;
  amount: number;
  unit: string;
};

export type ItemChange = {
  info: FoodItemBasicInfo | FullItemInfo;
  method: string;
};

export type mealIDObject = {
  breakfast: number;
  lunch: number;
  dinner: number;
  snack: number;
};

export interface LoginData {
  email: String;
  password: String;
}

export type SignUpData = {
  username: string;
  email: String;
  password: String;
  confirmPassword: string;
  weight: string;
  height: string;
  target: string;
};

export type ForgotPwEmail = {
  email: string;
};

export type GoalInputData = {
  targetType: string;
  weightTarget: number;
  startDate: Date;
  expectedDate: Date;
};

export type BodyParams = {
  height: number;
  weight: number;
};

export type Messages = {
  _id: string;
  createdAt: Date;
  text: string;
  user: { _id: number };
};
