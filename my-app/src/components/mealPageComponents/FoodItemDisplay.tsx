// Buffer Line
import { Fragment, useState } from "react";
import { FoodItem } from "../../utils/type";
import { useDispatch } from "react-redux";
import { action, AppDispatch, store } from "../../store";

function FoodItemsDisplay(props: { itemIndex: number; foodItem: FoodItem }) {
  const { itemIndex, foodItem } = props;
  const { foodName, servingSize, sizeUnit } = foodItem;

  const [foodInputVisible, updateFoodInputVisibility] = useState<boolean>(
    store.getState().foodInputPanelOpen
  );

  const dispatch = useDispatch<AppDispatch>();

  store.subscribe(() => {
    let storeInfo = store.getState();
    updateFoodInputVisibility(() => {
      return storeInfo.foodInputPanelOpen;
    });
  });

  const displayItemDetails = () => {
    console.log(`Display nutritional details of ${foodName}`);
  };

  const editFoodItem = () => {
    dispatch(
      action("foodPanelVisibility", {
        visible: true,
      })
    );
    dispatch(
      action("foodItemInfo", {
        foodItem,
      })
    );
  };

  const deleteFoodItem = () => {
    console.log(`attempt to delete ${foodName}`);
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

export default FoodItemsDisplay;
