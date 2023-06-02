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
import { MyTabs } from "./src/containers/bottomBar";
import { NativeBaseProvider } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
