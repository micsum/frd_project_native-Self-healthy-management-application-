// Buffer Line
import { useState, useRef, useEffect } from "react";
import { View, Text, Button, TextInput, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { action, AppDispatch } from "../../store";
import { FoodItemBasicInfo, mealIDObject } from "../../utils/type";
import { mps } from "./mealPageComponentStyleSheet";
import { FontAwesome } from "@expo/vector-icons";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";

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
  let { foodName, servingSize, sizeUnit } = foodItemCopy;

  useEffect(() => {
    updateSelectedUnit(sizeUnit);
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
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "No Changes Detected",
        textBody: 'Press "Cancel" to cancel the edit',
        autoClose: 1500,
      });
      return;
    }

    if (formItemInfo.foodName === "") {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Missing Item Name",
        textBody: "Please Input a Name for the Item",
        autoClose: 1800,
      });
      return;
    } else if (formItemInfo.servingSize <= 0) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: "Inappropriate Quantity Submitted",
        textBody: "Please Input an appropriate quantity for the Item",
        autoClose: 1800,
      });
      return;
    }
    updateMealData(formItemInfo);
  };

  const enterItemName = (text: string) => {
    foodItemInfo.current = {
      ...foodItemInfo.current,
      foodName: text,
    };
  };

  const enterItemServingSize = (text: string) => {
    foodItemInfo.current = {
      ...foodItemInfo.current,
      servingSize: parseFloat(text),
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
    <ScrollView style={[{ minHeight: 250 }, mps.detailPanel]}>
      <View style={mps.foodItemInputDiv}>
        <Text style={mps.foodItemInputTitle}>{`Food Item Name : ${
          foodItem ? foodName : ""
        }`}</Text>
        {foodItem ? null : (
          <TextInput
            placeholder="Enter Food Item Name Here"
            defaultValue={foodName}
            onChangeText={enterItemName}
            style={mps.foodItemInput}
          />
        )}
      </View>
      <View style={[mps.foodItemInputDiv, mps.servingSizeDiv]}>
        <View style={mps.servingSizeInput}>
          <Text style={mps.foodItemInputTitle}>{"Serving Size : "}</Text>
          <TextInput
            placeholder="Enter Food Item Quantity / Weight Here"
            keyboardType="numeric"
            defaultValue={servingSize.toString()}
            onChangeText={enterItemServingSize}
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
    </ScrollView>
  );
}

export default FoodItemEntryPanel;
