import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, updateRootState } from "../store";
import { secureStore } from "../storage/secureStore";

export function handleToken() {
  const dispatch = useDispatch<AppDispatch>();

  const token = useSelector((state: RootState) =>
    state.auth === "loading" ? null : state.auth?.token
  );
  //console.log(token);

  function setToken(token: string) {
    secureStore.setToken(token);
    dispatch(updateRootState("auth", { token }));
  }

  function clearToken() {
    secureStore.clearToken();
    dispatch(updateRootState("auth", null));
  }

  return { token, setToken, clearToken };
}
