import * as React from "react";
import * as SecureStore from "expo-secure-store";

export async function saveInSecureStore(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getFromSecureStore(key: string) {
  if (key) {
    return await SecureStore.getItemAsync(key);
  }
  console.error("error, no this key");
}

export async function deleteInSecureStore(key:string){
  await SecureStore.deleteItemAsync(key);
}