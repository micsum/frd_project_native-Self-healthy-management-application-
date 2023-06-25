// Buffer Line
import { StyleSheet, ViewStyle, TextStyle } from "react-native";

const fullWidthDisplayElement: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  padding: 3.5,
};

const defaultFontSize = 20;
export const foodItemDisplayHeight = {
  maxHeight: "100%",
};

export const mps = StyleSheet.create({
  defaultFontSize: {
    fontSize: defaultFontSize,
  },
  calendarDisplayDiv: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
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
    fontSize: defaultFontSize * 1.1,
    fontWeight: "bold",
    color: "#15998E",
  },
  mealTypeSelection: fullWidthDisplayElement,
  mealDisplayText: {
    width: "30%",
    fontWeight: "bold",
  },
  mealTypeToggle: {
    flexDirection: "row",
    alignItems: "center",
    width: "40%",
  },
  addItemButton: {
    fontSize: "xs",
    width: "25%",
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
    height: "35%",
    width: "94%",
    backgroundColor: "white",
    margin: 12,
    borderRadius: 15,
    elevation: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
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
