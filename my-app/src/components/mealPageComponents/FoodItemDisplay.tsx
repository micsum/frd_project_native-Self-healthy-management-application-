// Buffer Line
import { Fragment, useState } from "react";
import { FoodItemBasicInfo, FoodItemNutritionInfo } from "../../utils/type";
import { useDispatch } from "react-redux";
import { action, AppDispatch, store } from "../../store";

function FoodItemDisplay(props: {
  itemIndex: number;
  foodItemBasicInfo: FoodItemBasicInfo;
  foodItemNutritionInfo: FoodItemNutritionInfo;
  removeMealItem: (foodItem: FoodItemBasicInfo) => void;
}) {
  const {
    itemIndex,
    foodItemBasicInfo,
    foodItemNutritionInfo,
    removeMealItem,
  } = props;
  const { foodName, servingSize, sizeUnit } = foodItemBasicInfo;

  const [foodInputVisible, updateFoodInputVisibility] = useState<boolean>(
    store.getState().foodInputPanelOpen
  );

  const dispatch = useDispatch<AppDispatch>();

  store.subscribe(() => {
    updateFoodInputVisibility(() => {
      return store.getState().footInputPanelOpen;
    });
  });

  const displayItemDetails = () => {
    console.log(`Display nutritional details of ${foodName}`);
  };

  const editFoodItem = () => {
    dispatch(action("foodPanelVisibility", { visible: true }));
    dispatch(action("foodItemInfo", foodItemBasicInfo));
  };

  const deleteFoodItem = () => {
    removeMealItem(foodItemBasicInfo);
  };

  return (
    <Fragment>
      <div>
        {foodInputVisible ? null : (
          <button onClick={displayItemDetails}>Details</button>
        )}
        <div>
          <div>{`${itemIndex}. ${foodName}`}</div>
          <div>{`Serving Size : ${servingSize} ${sizeUnit}`}</div>
        </div>
        {foodInputVisible ? null : (
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
