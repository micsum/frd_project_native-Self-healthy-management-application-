// Buffer Line
import { configureStore } from "@reduxjs/toolkit";
import { produce } from "immer";
import { FoodItemBasicInfo, ObjectAny } from "./utils/type";

export interface RootState {
  foodInputPanelOpen: boolean;
  itemNutritionPanelOpen: boolean;
  foodItemInConsideration: FoodItemBasicInfo | undefined;
}

export function action(actionType: string, properties: ObjectAny) {
  const setFoodInputPanelVisibility = (visible: boolean) => {
    return {
      type: "updateFoodInputPanelVisibility" as const,
      payload: {
        visible,
      },
    };
  };

  const setNutritionDetailPanelVisibility = (visible: boolean) => {
    return {
      type: "updateNutritionPanelVisibility" as const,
      payload: {
        visible,
      },
    };
  };

  const updateFoodItemInConsideration = (
    foodItem: FoodItemBasicInfo | undefined
  ) => {
    return {
      type: "updateFoodItemInConsideration" as const,
      payload: {
        foodItem,
      },
    };
  };

  switch (actionType) {
    case "foodPanelVisibility":
      return setFoodInputPanelVisibility(properties.visible);
    case "itemNutritionPanelVisibility":
      return setNutritionDetailPanelVisibility(properties.visible);
    case "foodItemInfo":
      return updateFoodItemInConsideration(properties.foodItem);

    default:
      return { type: null, payload: null };
  }
}

type IRootAction = ReturnType<typeof action>;

const initState: RootState = {
  foodInputPanelOpen: false,
  itemNutritionPanelOpen: false,
  foodItemInConsideration: undefined,
};

const rootReducer = produce((draft = initState, action: IRootAction) => {
  switch (action.type) {
    case "updateFoodInputPanelVisibility": {
      const { visible } = action.payload;
      draft.foodInputPanelOpen = visible;
      return draft;
    }
    case "updateNutritionPanelVisibility": {
      const { visible } = action.payload;
      draft.itemNutritionPanelOpen = visible;
      return draft;
    }
    case "updateFoodItemInConsideration": {
      const { foodItem } = action.payload || undefined;
      draft.foodItemInConsideration = foodItem;
      return draft;
    }
    default:
      return draft;
  }
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
