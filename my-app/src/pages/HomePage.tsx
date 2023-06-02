import React, { useState } from "react";
import { Text, View, Button } from "react-native";

const PlansPage: React.FC = () => {
  const [selectedPlanTypeId, setSelectedPlanTypeId] = useState(0);

  const planItems = allPlanItems.filter(
    (plan) => plan.typeId === selectedPlanTypeId
  );

  return <View><Button title="Work-out" onPress={()=>}/></View>;
};
