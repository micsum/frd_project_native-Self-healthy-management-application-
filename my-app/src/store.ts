// Buffer Line
import { configureStore } from "@reduxjs/toolkit";
import { FoodItem, ObjectAny } from "./utils/type";

export interface RootState {
  foodInputPanelOpen: boolean;
  foodItemInConsideration: FoodItem | undefined;
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

  const updateFoodItemInConsideration = (foodItem: FoodItem | undefined) => {
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
    case "foodItemInfo":
      return updateFoodItemInConsideration(properties.foodItem);

    default:
      return { type: null, payload: null };
  }
}

type IRootAction = ReturnType<typeof action>;

const initState: RootState = {
  foodInputPanelOpen: false,
  foodItemInConsideration: undefined,
};

const rootReducer = (
  state: RootState = initState,
  action: IRootAction
): RootState => {
  let updated: RootState = { ...state };
  switch (action.type) {
    case "updateFoodInputPanelVisibility":
      const { visible } = action.payload;
      updated.foodInputPanelOpen = visible;
      return updated;
    case "updateFoodItemInConsideration":
      const { foodItem } = action.payload || undefined;
      updated.foodItemInConsideration = foodItem;
      return updated;
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
