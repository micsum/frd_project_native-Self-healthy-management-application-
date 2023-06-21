import { useEffect, useState } from "react";
import { handleToken } from "./use-token";
import { Domain } from "@env";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Dialog,
} from "react-native-alert-notification";

export function useGet<T>(url: string) {
  const { token } = handleToken();

  const [json, setJSON] = useState({ error: "loading" } as T & {
    error: string;
  });

  useEffect(() => {
    fetch(Domain + url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .catch((error) => ({ error: String(error) }))
      .then(setJSON);
  }, [url, token]);

  useEffect(() => {
    if (json.error && json.error !== "loading") {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: json.error,
        autoClose: 1500,
      });
    }
  }, [json]);

  return { json };
}
