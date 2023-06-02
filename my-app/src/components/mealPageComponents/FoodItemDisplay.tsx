// Buffer Line
import { Fragment } from "react";
import { FoodItem } from "../../utils/type";

function FoodItemsDisplay(props: { itemIndex: number; foodItem: FoodItem }) {
  const { itemIndex, foodItem } = props;
  const { foodName, servingSize, sizeUnit } = foodItem;

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
        <button onClick={() => console.log(`attempt to edit ${foodItem}`)}>
          {" "}
          Edit{" "}
        </button>
        <button onClick={() => console.log(`attempt to delete ${foodItem}`)}>
          {" "}
          Delete{" "}
        </button>
      </div>
    </Fragment>
  );
}

export default FoodItemsDisplay;
