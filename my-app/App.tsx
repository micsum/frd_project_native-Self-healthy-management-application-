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
import { Provider, useDispatch, useSelector } from "react-redux";
import { RootState, store, updateRootState } from "./src/store";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { secureStore } from "./src/storage/secureStore";
import axios from "axios";

export default function RootApp() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <App />
      </SafeAreaProvider>
    </Provider>
  );
}

const Stack = createStackNavigator();

function App() {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    secureStore.getToken().then((token) => {
      if (token) {
        dispatch(updateRootState("auth", { token }));
      } else {
        dispatch(updateRootState("auth", null));
      }
    });
  }, []);

  useEffect(() => {
    if (auth !== "loading" && auth?.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [auth]);

  if (auth === "loading") {
    return (
      <View>
        <Text>Loading ...</Text>
      </View>
    );
  }

  const isLogin = !!auth?.token;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLogin ? (
          <Stack.Screen
            name="Main"
            component={Main}
            options={{
              headerShown: false,
            }}
          ></Stack.Screen>
        ) : (
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{
              headerShown: false,
            }}
          ></Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
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
