// Buffer Line
import { Fragment, useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { action, AppDispatch } from "../../store";
import { FoodItem } from "../../utils/type";

function FoodItemEntryPanel(props: { foodItem?: FoodItem }) {
  const { foodItem } = props;
  const [selectedIndex, updateSelectedIndex] = useState<number>(0);
  const [foodItemCopy, updateFoodItemCopy] = useState<FoodItem>(
    foodItem || { foodName: "", servingSize: 0, sizeUnit: "" }
  );

  const itemNameInput = useRef<HTMLInputElement>(null);
  const servingSizeInput = useRef<HTMLInputElement>(null);
  const sizeUnitSelect = useRef<HTMLSelectElement>(null);

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
    dispatch(
      action("foodItemInfo", {
        foodItem: undefined,
      })
    );
  };

  const confirmItemUpdate = () => {
    if (itemNameInput.current === null || servingSizeInput.current === null) {
      return;
    } else if (itemNameInput.current.value === "") {
      console.log("missing item name");
      return;
    } else if (parseFloat(servingSizeInput.current.value) <= 0) {
      console.log("Inappropriate Quantity Submitted");
      return;
    }
    const foodItemInfo: FoodItem = {
      foodName: itemNameInput.current.value,
      servingSize: parseFloat(servingSizeInput.current.value),
      sizeUnit:
        sizeUnitSelect.current === null ? "" : sizeUnitSelect.current.value,
    };
    console.log(foodItemInfo);
  };

  return (
    <Fragment>
      <div>
        <div>{"Food Item Name : "}</div>
        <input
          type="text"
          ref={itemNameInput}
          placeholder="Enter Food Item Name Here"
          defaultValue={foodName}
        />
      </div>
      <div>
        <div>
          <div>{"Serving Size : "}</div>
          <input
            type="number"
            ref={servingSizeInput}
            placeholder="Enter Food Item Quantity / Weight Here"
            defaultValue={servingSize}
          />
        </div>
        <select
          defaultValue={sizeUnit}
          ref={sizeUnitSelect}
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
      <button onClick={cancelItemUpdate}>Cancel</button>
      <button onClick={confirmItemUpdate}>Confirm</button>
    </Fragment>
  );
}

export default FoodItemEntryPanel;
