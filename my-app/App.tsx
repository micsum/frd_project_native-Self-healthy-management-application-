import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { MyTabs } from "./src/containers/bottomBar";
import { NativeBaseProvider } from "native-base";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Login } from "./src/screens/LoginPage";
import { WelcomeScreen } from "./src/screens/WelcomePage";
import { Register } from "./src/screens/RegisterPage";
import { MealScreen } from "./src/screens/MealPage";
import { PlansScreen } from "./src/screens/PlansPage";

export default function App() {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          {/* <WelcomeScreen></WelcomeScreen> */}
          <PlansScreen />
        </NavigationContainer>
      </NativeBaseProvider>
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
