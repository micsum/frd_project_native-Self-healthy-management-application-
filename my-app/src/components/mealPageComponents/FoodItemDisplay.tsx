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
    updateFoodInputVisibility(() => {
      return store.getState().foodInputPanelOpen;
    });
  });

  const editFoodItem = () => {
    dispatch(
      action("updateFoodInputPanelVisibility", {
        visible: true,
        foodItem: foodItem,
      })
    );
  };

  return (
    <Fragment>
      <div>
        <button
          onClick={() =>
            console.log(`Display nutritional details of ${foodName}`)
          }
        >
          Details
        </button>
        <div>
          <div>{`${itemIndex}. ${foodName}`}</div>
          <div>{`Serving Size : ${servingSize} ${sizeUnit}`}</div>
        </div>
        {foodInputVisible ? null : (
          <Fragment>
            <button onClick={editFoodItem}> Edit </button>
            <button
              onClick={() => console.log(`attempt to delete ${foodName}`)}
            >
              {" "}
              Delete{" "}
            </button>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}

export default FoodItemsDisplay;
