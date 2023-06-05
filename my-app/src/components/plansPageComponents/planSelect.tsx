import React from "react";
import {
  Select,
  Box,
  CheckIcon,
  Center,
  NativeBaseProvider,
} from "native-base";

export function PlanSelect() {
  const [currentValue, setValue] = React.useState("wp");
  return (
    <Center>
      <Box maxW="300">
        <Select
          selectedValue={currentValue}
          minWidth="200"
          accessibilityLabel="Choose Service"
          placeholder="Choose Service"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={(itemValue) => setValue(itemValue)}
        >
          <Select.Item label="Workout Plan" value="wp" />
          <Select.Item label="Meal Plan" value="mp" />
        </Select>
      </Box>
    </Center>
  );
}
