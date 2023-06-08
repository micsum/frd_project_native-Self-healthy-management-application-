import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { MyTabs } from "./src/containers/bottomBar";
import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Login } from "./src/screens/LoginPage";
import { WelcomeScreen } from "./src/screens/WelcomePage";
import { MealScreen } from "./src/screens/MealPage";
import { Register } from "./src/screens/RegisterPage";

export default function App() {
  return (
    <SafeAreaProvider>
      {/* <WelcomeScreen></WelcomeScreen> */}
      {/* <MealScreen /> */}
      {/* <WelcomeScreen /> */}
    </SafeAreaProvider>
  );
}

export const Main = () => {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <MyTabs />
        </NavigationContainer>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
};
