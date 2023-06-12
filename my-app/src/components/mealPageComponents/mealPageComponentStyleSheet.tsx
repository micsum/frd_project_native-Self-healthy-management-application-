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
  minHeight: "20%",
};

export const mps = StyleSheet.create({
  defaultFontSize: {
    fontSize: defaultFontSize,
  },
  calendarDisplayDiv: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    height: "100%",
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 10,
  },
  calendarDiv: {
    flexDirection: "row",
    justifyContent: "center",
    width: "80%",
  },
  calendarDivOpen: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "center",
  },
  calendarText: {
    fontSize: defaultFontSize * 1.5,
    fontWeight: "bold",
  },
  mealTypeSelection: fullWidthDisplayElement,
  mealDisplayText: {
    width: "40%",
    fontWeight: "bold",
  },
  mealTypeToggle: {
    flexDirection: "row",
    alignItems: "center",
    width: "40%",
  },
  addItemButton: {
    alignItems: "flex-end",
    width: "20%",
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
    padding: 6,
    paddingStart: 10,
  },
  panelTitle: {
    fontSize: defaultFontSize * 1.2,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  detailPanel: {
    height: "30%",
    padding: 10,
    margin: 5,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
    overflow: "hidden",
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
    height: "80%",
    width: "60%",
  },
});
