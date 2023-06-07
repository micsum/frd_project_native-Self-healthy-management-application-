// Buffer Line
import { Fragment, useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { FoodItemBasicInfo, FoodItemNutritionInfo } from "../../utils/type";
import { useDispatch } from "react-redux";
import { action, AppDispatch, store } from "../../store";

function FoodItemDisplay(props: {
  itemIndex: number;
  foodItemBasicInfo: FoodItemBasicInfo;
  foodItemNutritionInfo: FoodItemNutritionInfo;
  removeMealItem: (foodItem: FoodItemBasicInfo) => void;
  showNutritionDetail: (foodItemNutritionInfo: FoodItemNutritionInfo) => void;
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
    showNutritionDetail(foodItemNutritionInfo);
    dispatch(action("itemNutritionPanelVisibility", { visible: true }));
  };

  const editFoodItem = () => {
    dispatch(action("foodPanelVisibility", { visible: true }));
    dispatch(action("foodItemInfo", { foodItem: foodItemBasicInfo }));
  };

  const deleteFoodItem = () => {
    removeMealItem(foodItemBasicInfo);
  };

  return (
    <Fragment>
      <View>
        {foodInputVisible || itemNutritionPanelVisible ? null : (
          <Button onPress={displayItemDetails} title="Details" />
        )}
        <View>
          <Text>{`${itemIndex}. ${foodName}`}</Text>
          <Text>{`Serving Size : ${servingSize} ${sizeUnit}`}</Text>
        </View>
        {foodInputVisible || itemNutritionPanelVisible ? null : (
          <Fragment>
            <Button title="Edit" onPress={editFoodItem} />
            <Button title="Delete" onPress={deleteFoodItem} />
          </Fragment>
        )}
      </View>
    </Fragment>
  );
}

export default FoodItemDisplay;
