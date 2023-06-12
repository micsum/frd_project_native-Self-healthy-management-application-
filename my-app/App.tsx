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
import { Provider } from "react-redux";
import { store } from "./src/store";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { getFromSecureStore } from "./src/storage/secureStore";

export default function App() {
  const Stack = createStackNavigator();
  const [authState, setAuthState] = useState<boolean>(false);

  store.subscribe(() => {
    const storeInfo = store.getState();
    setAuthState(() => {
      return storeInfo.isLogin;
    });
  });

  const getToken = async () => {
    const token = await getFromSecureStore("token");
    if (token) {
      setAuthState(true);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {/* <WelcomeScreen></WelcomeScreen> */}
            {authState ? (
              <Stack.Screen
                name="Main"
                component={Main}
                options={{
                  headerShown: false,
                }}
              ></Stack.Screen>
            ) : (
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  headerShown: false,
                }}
              ></Stack.Screen>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export const Main = () => {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <MyTabs />
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
};
