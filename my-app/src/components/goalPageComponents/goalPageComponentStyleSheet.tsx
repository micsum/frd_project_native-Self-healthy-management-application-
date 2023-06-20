// Buffer Line
import { StyleSheet, ViewStyle } from "react-native";

const fullWidthDisplayElement: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
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
  goalDisplayText: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
