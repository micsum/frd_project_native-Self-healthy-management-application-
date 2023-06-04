import React, { useState } from "react";
import { Text, View, Button } from "react-native";

export function MealScreen({}) {
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Meal!</Text>
      <View>
        <Text className="text-red-200">2</Text>
      </View>
    </View>
  );
}
