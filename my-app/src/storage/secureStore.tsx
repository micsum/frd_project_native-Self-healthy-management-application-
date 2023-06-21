import * as SecureStore from "expo-secure-store";

export const secureStore = {
  getToken() {
    return SecureStore.getItemAsync("token");
  },
  setToken(value: string) {
    return SecureStore.setItemAsync("token", value);
  },
  clearToken() {
    return SecureStore.deleteItemAsync("token");
  },
};
