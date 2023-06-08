// Buffer Line
import { StyleSheet, ViewStyle, TextStyle } from "react-native";

const fullWidthDisplayElement: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  padding: 5,
};

const defaultFontSize = 20;
export const foodItemDisplayHeight = {
  height: "30%",
};

export const mps = StyleSheet.create({
  defaultFontSize: {
    fontSize: defaultFontSize,
  },
  mealTypeSelection: fullWidthDisplayElement,
  mealDisplayText: {
    width: "40%",
    fontWeight: "bold",
  },
  mealTypeToggle: {
    flexDirection: "row",
    alignItems: "center",
    width: "30%",
  },
  addItemButton: {
    alignItems: "flex-end",
    width: "30%",
  },
  foodItemDisplayDiv: {
    margin: 6,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 30,
  },
  foodItemDisplay: fullWidthDisplayElement,
  foodItemDisplayButton: {
    fontSize: defaultFontSize * 1.5,
    padding: 10,
  },
  foodItemDisplayContent: {
    width: "60%",
    padding: 5,
    paddingStart: 10,
  },
  panelTitle: {
    fontSize: defaultFontSize * 1.2,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  detailPanel: {
    height: "40%",
    padding: 10,
    borderColor: "black",
    borderWidth: 2,
    overflow: "visible",
  },
  nutritionContentDisplay: fullWidthDisplayElement,
  nutritionContentText: {
    fontSize: defaultFontSize,
  },
  foodItemInputDiv: {
    marginBottom: 10,
  },
  foodItemInputTitle: {
    fontSize: defaultFontSize * 1.2,
    fontWeight: "bold",
    marginBottom: 5,
  },
  foodItemInput: {
    fontSize: defaultFontSize * 1.2,
    borderWidth: 2,
    borderRadius: 20,
    paddingStart: 10,
  },
  servingSizeDiv: { flexDirection: "row" },
  servingSizeInput: {
    width: "50%",
  },
  sizeUnitText: {
    fontSize: defaultFontSize * 1.5,
    fontWeight: "bold",
    alignSelf: "flex-end",
  },
  controlDiv: {
    flexDirection: "row",
    alignItems: "center",
    height: "40%",
  },
  formButtonDiv: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "center",
  },
  formButton: {
    height: "30%",
    width: "60%",
  },
});
