// Buffer Line
import { Fragment, useState, useRef, useEffect } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { action, AppDispatch } from "../../store";
import { FoodItemBasicInfo, mealIDObject } from "../../utils/type";
import { mps } from "./mealPageComponentStyleSheet";
import { FontAwesome } from "@expo/vector-icons";

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
    if (
      formItemInfo.foodName === foodItem?.foodName &&
      formItemInfo.servingSize === foodItem?.servingSize &&
      formItemInfo.sizeUnit === foodItem?.sizeUnit
    ) {
      console.log("No Changes Detected");
      return;
    }

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
    <View style={mps.detailPanel}>
      <View style={mps.foodItemInputDiv}>
        <Text style={mps.foodItemInputTitle}>{"Food Item Name : "}</Text>
        <TextInput
          value={foodName}
          placeholder="Enter Food Item Name Here"
          defaultValue={foodName}
          onChange={enterItemName}
          style={mps.foodItemInput}
        />
      </View>
      <View style={[mps.foodItemInputDiv, mps.servingSizeDiv]}>
        <View style={mps.servingSizeInput}>
          <Text style={mps.foodItemInputTitle}>{"Serving Size : "}</Text>
          <TextInput
            value={servingSize.toString()}
            placeholder="Enter Food Item Quantity / Weight Here"
            defaultValue={servingSize.toString()}
            onChange={enterItemServingSize}
            style={mps.foodItemInput}
          />
        </View>
        <View style={mps.servingSizeDiv}>
          <Text
            style={[
              mps.sizeUnitText,
              { paddingStart: 10, paddingEnd: 10, width: "50%" },
            ]}
          >
            {selectedUnit}
          </Text>
          <View style={mps.sizeUnitText}>
            <FontAwesome
              name="exchange"
              size={mps.defaultFontSize.fontSize * 1.5}
              color="orange"
              onPress={changeSelectedUnit}
            />
          </View>
        </View>
      </View>
      <View style={mps.controlDiv}>
        <View style={mps.formButtonDiv}>
          <View style={mps.formButton}>
            <Button
              title="Confirm"
              onPress={() => confirmItemUpdate(foodItemInfo.current)}
              color={`#7cfc00`}
            />
          </View>
        </View>
        <View style={mps.formButtonDiv}>
          <View style={mps.formButton}>
            <Button
              title="Cancel"
              onPress={cancelItemUpdate}
              color={`#b22222`}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

export default FoodItemEntryPanel;
