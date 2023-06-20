// Buffer Line
import { StyleSheet, ViewStyle } from "react-native";

const fullWidthDisplayElement: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  width: "100%",
  padding: 5,
};

export const gps = StyleSheet.create({
  goalDisplayDiv: fullWidthDisplayElement,
  goalDisplayTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
