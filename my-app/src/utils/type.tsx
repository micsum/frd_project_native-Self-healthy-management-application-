export type ObjectAny = {
  [key: string]: any;
};

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

export interface CardProps {
  title: string;
  description: string;
}

export interface LoginData {
  email: String;
  password: String;
}
