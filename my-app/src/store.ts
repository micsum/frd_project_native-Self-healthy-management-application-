// Buffer Line
import { configureStore } from "@reduxjs/toolkit";
import { produce } from "immer";
import { FoodItemBasicInfo, ObjectAny } from "./utils/type";

export interface RootState {
  foodInputPanelOpen: boolean;
  itemNutritionPanelOpen: boolean;
  foodItemInConsideration: FoodItemBasicInfo | undefined;
  auth: "loading" | null | { token: string };
}

export type IRootAction<Key extends keyof RootState = keyof RootState> = {
  type: "updateRootState";
  key: Key;
  value: RootState[Key];
};

export function updateRootState<Key extends keyof RootState>(
  key: Key,
  value: RootState[Key]
) {
  return {
    type: "updateRootState" as const,
    key,
    value,
  };
}

const initState: RootState = {
  foodInputPanelOpen: false,
  itemNutritionPanelOpen: false,
  foodItemInConsideration: undefined,
  auth: "loading",
};

const rootReducer = produce((draft = initState, action: IRootAction) => {
  switch (action.type) {
    case "updateRootState": {
      draft[action.key] = action.value;
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
