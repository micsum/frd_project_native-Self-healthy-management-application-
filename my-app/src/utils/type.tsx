export type FoodItem = {
  foodName: string;
  servingSize: number;
  sizeUnit: string;
};

export type DateMealData = {
  breakfast: FoodItem[];
  lunch: FoodItem[];
  dinner: FoodItem[];
  snack: FoodItem[];
};
