// Buffer Line
import { Fragment, useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { action, AppDispatch } from "../../store";
import { FoodItem } from "../../utils/type";

function FoodItemEntryPanel(props: {
  foodItem?: FoodItem;
  updateMealData: (updatedItem: FoodItem) => void;
}) {
  const { foodItem, updateMealData } = props;
  const [selectedIndex, updateSelectedIndex] = useState<number>(0);
  const [foodItemCopy, updateFoodItemCopy] = useState<FoodItem>(
    foodItem || { foodName: "", servingSize: 0, sizeUnit: "" }
  );

  const foodItemInfo = useRef<FoodItem>(foodItemCopy);

  const dispatch = useDispatch<AppDispatch>();
  const weightUnitList = ["", "g", "kg", "lb"];
  let { foodName, servingSize, sizeUnit } = foodItemCopy;

  useEffect(() => {
    sizeUnit = weightUnitList[selectedIndex];
    updateFoodItemCopy(() => {
      return { foodName, servingSize, sizeUnit };
    });
  }, [selectedIndex]);

  const cancelItemUpdate = () => {
    dispatch(
      action("foodPanelVisibility", {
        visible: false,
      })
    );
    dispatch(action("foodItemInfo", {}));
  };

  const confirmItemUpdate = (formItemInfo: FoodItem) => {
    if (formItemInfo.foodName === "") {
      console.log("missing item name");
      return;
    } else if (formItemInfo.servingSize <= 0) {
      console.log("Inappropriate Quantity Submitted");
      return;
    }
    updateMealData(formItemInfo);
  };

  return (
    <Fragment>
      <div>
        <div>{"Food Item Name : "}</div>
        <input
          type="text"
          placeholder="Enter Food Item Name Here"
          defaultValue={foodName}
          onChange={(event: any) => {
            foodItemInfo.current = {
              ...foodItemInfo.current,
              foodName: event.target.value,
            };
          }}
        />
      </div>
      <div>
        <div>
          <div>{"Serving Size : "}</div>
          <input
            type="number"
            placeholder="Enter Food Item Quantity / Weight Here"
            defaultValue={servingSize}
            onChange={(event: any) => {
              foodItemInfo.current = {
                ...foodItemInfo.current,
                servingSize: parseFloat(event.target.value),
              };
            }}
          />
        </div>
        <select
          defaultValue={sizeUnit}
          onChange={(event) => {
            updateSelectedIndex(() => {
              return event.target.selectedIndex;
            });
            foodItemInfo.current = {
              ...foodItemInfo.current,
              sizeUnit: event.target.value,
            };
          }}
        >
          <option value="">{""}</option>
          <option value="g">{"g"}</option>
          <option value="kg">{"kg"}</option>
          <option value="lb">{"lb"}</option>
        </select>
      </div>
      <button onClick={cancelItemUpdate}>Cancel</button>
      <button onClick={() => confirmItemUpdate(foodItemInfo.current)}>
        Confirm
      </button>
    </Fragment>
  );
}

export default FoodItemEntryPanel;
