// Buffer Line
import { Fragment, useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { FoodItemBasicInfo, FoodItemNutritionInfo } from "../../utils/type";
import { useDispatch } from "react-redux";
import { action, AppDispatch, store } from "../../store";
import { mps } from "./mealPageComponentStyleSheet";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";

function FoodItemDisplay(props: {
  itemIndex: number;
  foodItemBasicInfo: FoodItemBasicInfo;
  foodItemNutritionInfo: FoodItemNutritionInfo;
  removeMealItem: (foodItem: FoodItemBasicInfo) => void;
  showNutritionDetail: (foodItemNutritionInfo: FoodItemNutritionInfo[]) => void;
}) {
  const {
    itemIndex,
    foodItemBasicInfo,
    foodItemNutritionInfo,
    showNutritionDetail,
    removeMealItem,
  } = props;
  const { foodName, servingSize, sizeUnit } = foodItemBasicInfo;

  const [foodInputVisible, updateFoodInputVisibility] = useState<boolean>(
    store.getState().foodInputPanelOpen
  );
  const [itemNutritionPanelVisible, updateItemNutritionPanelVisibility] =
    useState<boolean>(store.getState().itemNutritionPanelOpen);

  const dispatch = useDispatch<AppDispatch>();

  store.subscribe(() => {
    const storeInfo = store.getState();
    updateFoodInputVisibility(() => {
      return storeInfo.foodInputPanelOpen;
    });
    updateItemNutritionPanelVisibility(() => {
      return storeInfo.itemNutritionPanelOpen;
    });
  });

  const displayItemDetails = () => {
    showNutritionDetail([foodItemNutritionInfo]);
    dispatch(action("itemNutritionPanelVisibility", { visible: true }));
  };

  const editFoodItem = () => {
    dispatch(action("foodPanelVisibility", { visible: true }));
    dispatch(action("foodItemInfo", { foodItem: foodItemBasicInfo }));
  };

  const deleteFoodItem = () => {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: `Delete ${foodName} ?`,
      textBody: `(Click Outside the Warning to CANCEL)`,
      button: "Confirm",
      onPressButton: () => {
        removeMealItem(foodItemBasicInfo);
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: `Successfully Removed ${foodName}`,
          button: "OK",
        });
      },
    });
  };

  return (
    <View style={mps.foodItemDisplayDiv}>
      <View style={mps.foodItemDisplay}>
        {foodInputVisible || itemNutritionPanelVisible ? null : (
          <View style={mps.foodItemDisplayButton}>
            <Entypo
              name="info-with-circle"
              size={mps.foodItemDisplayButton.fontSize}
              color="orange"
              onPress={displayItemDetails}
            />
          </View>
        )}
        <View
          style={[
            {
              width:
                foodInputVisible || itemNutritionPanelVisible ? "100%" : "60%",
            },
            mps.foodItemDisplayContent,
          ]}
        >
          <Text style={mps.defaultFontSize}>{`${itemIndex}. ${foodName}`}</Text>
          <Text
            style={mps.defaultFontSize}
          >{`Serving Size : ${servingSize} ${sizeUnit}`}</Text>
        </View>
        {foodInputVisible || itemNutritionPanelVisible ? null : (
          <Fragment>
            <View style={mps.foodItemDisplayButton}>
              <AntDesign
                name="edit"
                size={mps.foodItemDisplayButton.fontSize}
                color="black"
                onPress={editFoodItem}
              />
            </View>
            <View style={mps.foodItemDisplayButton}>
              <AntDesign
                name="delete"
                size={mps.foodItemDisplayButton.fontSize}
                color={`#b22222`}
                onPress={deleteFoodItem}
              />
            </View>
          </Fragment>
        )}
      </View>
    </View>
  );
}

export default FoodItemDisplay;
