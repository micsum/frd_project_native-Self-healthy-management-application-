// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";
// import React from "react";
// import { NativeBaseProvider, Box } from "native-base";

// export default function App() {
//   return (
//     <NativeBaseProvider>
//       <View style={styles.container}>
//         <StatusBar style="auto" />
//         <Box>Hello world</Box>
//       </View>
//     </NativeBaseProvider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "./src/pages/Demo";
import { PlansPage } from "./src/pages/PlansPage";

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Meal" component={SettingsScreen} />
      <Tab.Screen name="Calendar" component={SettingsScreen} />
      <Tab.Screen name="Plan" component={PlansPage} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
