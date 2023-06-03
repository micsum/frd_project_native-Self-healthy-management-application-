// Buffer Line
import { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, action } from "../../store";
import { FoodItem } from "../../utils/type";

function FoodItemEntryPanel(props: { foodItem?: FoodItem }) {
  const { foodItem } = props;
  const [selectedIndex, updateSelectedIndex] = useState<number>(0);
  const [foodItemCopy, updateFoodItemCopy] = useState<FoodItem>(
    foodItem || { foodName: "", servingSize: 0, sizeUnit: "" }
  );

  const dispatch = useDispatch<AppDispatch>();
  const weightUnitList = ["", "g", "kg", "lb"];
  let { foodName, servingSize, sizeUnit } = foodItemCopy;

  useEffect(() => {
    sizeUnit = weightUnitList[selectedIndex];
    updateFoodItemCopy(() => {
      return { foodName, servingSize, sizeUnit };
    });
  }, [selectedIndex]);

  return (
    <Fragment>
      <div>
        <div>{"Food Item Name : "}</div>
        <input
          type="text"
          placeholder="Enter Food Item Name Here"
          defaultValue={foodName}
        />
      </div>
      <div>
        <div>
          <div>{"Serving Size : "}</div>
          <input
            type="number"
            placeholder="Enter Food Item Quantity / Weight Here"
            defaultValue={servingSize}
          />
        </div>
        <select
          defaultValue={sizeUnit}
          onChange={(event) => {
            updateSelectedIndex(() => {
              return event.target.selectedIndex;
            });
          }}
        >
          <option value="">{""}</option>
          <option value="g">{"g"}</option>
          <option value="kg">{"kg"}</option>
          <option value="lb">{"lb"}</option>
        </select>
      </div>
      <button
        onClick={() => {
          dispatch(
            action("foodPanelVisibility", {
              visible: false,
            })
          );
          dispatch(
            action("foodItemInfo", {
              foodItem: undefined,
            })
          );
        }}
      >
        Cancel
      </button>
      <button
        onClick={() => {
          console.log(`confirm food item info input`);
        }}
      >
        Confirm
      </button>
    </Fragment>
  );
}

export default FoodItemEntryPanel;
