// Buffer Line
import { configureStore } from "@reduxjs/toolkit";
import { FoodItem, ObjectAny } from "./utils/type";

export interface RootState {
  foodInputPanelOpen: boolean;
  foodItemInConsideration: FoodItem | undefined;
}

export function action(actionType: string, properties: ObjectAny) {
  const setFoodInputPanelVisibility = (
    visible: boolean,
    foodItem: FoodItem | undefined
  ) => {
    return {
      type: "updateFoodInputPanelVisibility" as const,
      payload: {
        visible,
        foodItem,
      },
    };
  };

  switch (actionType) {
    case "updateFoodInputPanelVisibility":
      return setFoodInputPanelVisibility(
        properties.visible,
        properties.foodItem
      );

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
  switch (action.type) {
    case "updateFoodInputPanelVisibility":
      const updated = { ...state };
      updated.foodInputPanelOpen = action.payload.visible;
      updated.foodItemInConsideration = action.payload.foodItem;
      state = updated;
      return state;
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
