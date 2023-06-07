// Buffer Line
import { Fragment, useState, useRef, useEffect } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { action, AppDispatch } from "../../store";
import { FoodItemBasicInfo, mealIDObject } from "../../utils/type";

function FoodItemEntryPanel(props: {
  foodItem?: FoodItemBasicInfo;
  mealID: mealIDObject;
  mealType: string;
  updateMealData: (updatedItem: FoodItemBasicInfo) => void;
}) {
  const { foodItem, mealType, mealID, updateMealData } = props;
  const [selectedUnit, updateSelectedUnit] = useState<string>("g");
  const [foodItemCopy, updateFoodItemCopy] = useState<FoodItemBasicInfo>(
    foodItem || {
      id: -1,
      meal_id: mealID[mealType as keyof mealIDObject],
      meal_time: mealType,
      foodName: "",
      servingSize: 0,
      sizeUnit: "g",
    }
  );

  const foodItemInfo = useRef<FoodItemBasicInfo>(foodItemCopy);

  const dispatch = useDispatch<AppDispatch>();
  const weightUnitList = ["g", "kg", "lb"];
  let { id, meal_id, meal_time, foodName, servingSize, sizeUnit } =
    foodItemCopy;

  useEffect(() => {
    updateSelectedUnit(() => {
      return sizeUnit;
    });
  }, []);

  const cancelItemUpdate = () => {
    dispatch(
      action("foodPanelVisibility", {
        visible: false,
      })
    );
    dispatch(action("foodItemInfo", {}));
  };

  const confirmItemUpdate = (formItemInfo: FoodItemBasicInfo) => {
    if (formItemInfo.foodName === "") {
      console.log("missing item name");
      return;
    } else if (formItemInfo.servingSize <= 0) {
      console.log("Inappropriate Quantity Submitted");
      return;
    }
    updateMealData(formItemInfo);
  };

  const enterItemName = (event: any) => {
    foodItemInfo.current = {
      ...foodItemInfo.current,
      foodName: event.target.value,
    };
  };

  const enterItemServingSize = (event: any) => {
    foodItemInfo.current = {
      ...foodItemInfo.current,
      servingSize: parseFloat(event.target.value),
    };
  };

  const changeSelectedUnit = () => {
    let newUnit =
      weightUnitList[(weightUnitList.indexOf(selectedUnit) + 1) % 3];
    updateSelectedUnit(() => {
      return newUnit;
    });
    foodItemInfo.current = {
      ...foodItemInfo.current,
      sizeUnit: newUnit,
    };
  };

  return (
    <Fragment>
      <View>
        <Text>{"Food Item Name : "}</Text>
        <TextInput
          value="text"
          placeholder="Enter Food Item Name Here"
          defaultValue={foodName}
          onChange={enterItemName}
        />
      </View>
      <View>
        <View>
          <Text>{"Serving Size : "}</Text>
          <TextInput
            value="number"
            placeholder="Enter Food Item Quantity / Weight Here"
            defaultValue={servingSize.toString()}
            onChange={enterItemServingSize}
          />
        </View>
        <View>
          <Text>{selectedUnit}</Text>
          <Button title="Change Unit" onPress={changeSelectedUnit} />
        </View>
      </View>
      <Button title="Cancel" onPress={cancelItemUpdate} />
      <Button
        title="Confirm"
        onPress={() => confirmItemUpdate(foodItemInfo.current)}
      />
    </Fragment>
  );
}

export default FoodItemEntryPanel;
