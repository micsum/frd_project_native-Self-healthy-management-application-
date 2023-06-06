// Buffer Line
import { Fragment, useState, useEffect } from "react";
import { FoodItemBasicInfo, FoodItemNutritionInfo } from "../../utils/type";
import { useDispatch } from "react-redux";
import { action, AppDispatch, store } from "../../store";

function FoodItemDisplay(props: {
  itemIndex: number;
  foodItemBasicInfo: FoodItemBasicInfo;
  foodItemNutritionInfo: FoodItemNutritionInfo;
  removeMealItem: (foodItem: FoodItemBasicInfo) => void;
  showNutritionDetail: (foodItemNutritionInfo: FoodItemNutritionInfo) => void;
}) {
  const {
    itemIndex,
    foodItemBasicInfo,
    foodItemNutritionInfo,
    showNutritionDetail,
    removeMealItem,
  } = props;
  const { foodName, servingSize, sizeUnit } = foodItemBasicInfo;

  const [foodInputVisible, updateFoodInputVisibility] = useState<boolean>(
    store.getState().foodInputPanelOpen
  );
  const [itemNutritionPanelVisible, updateItemNutritionPanelVisibility] =
    useState<boolean>(store.getState().itemNutritionPanelOpen);

  const dispatch = useDispatch<AppDispatch>();

  store.subscribe(() => {
    const storeInfo = store.getState();
    updateFoodInputVisibility(() => {
      return storeInfo.foodInputPanelOpen;
    });
    updateItemNutritionPanelVisibility(() => {
      return storeInfo.itemNutritionPanelOpen;
    });
  });

  const displayItemDetails = () => {
    showNutritionDetail(foodItemNutritionInfo);
    dispatch(action("itemNutritionPanelVisibility", { visible: true }));
  };

  const editFoodItem = () => {
    dispatch(action("foodPanelVisibility", { visible: true }));
    dispatch(action("foodItemInfo", { foodItem: foodItemBasicInfo }));
  };

  const deleteFoodItem = () => {
    removeMealItem(foodItemBasicInfo);
  };

  return (
    <Fragment>
      <div>
        {foodInputVisible || itemNutritionPanelVisible ? null : (
          <button onClick={displayItemDetails}>Details</button>
        )}
        <div>
          <div>{`${itemIndex}. ${foodName}`}</div>
          <div>{`Serving Size : ${servingSize} ${sizeUnit}`}</div>
        </div>
        {foodInputVisible || itemNutritionPanelVisible ? null : (
          <Fragment>
            <button onClick={editFoodItem}> Edit </button>
            <button onClick={deleteFoodItem}> Delete </button>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}

export default FoodItemDisplay;
