import { Domain } from "@env";
import axios from "axios";

export async function get(url: string) {
  try {
    console.log("GET", Domain + url);
    let res = await fetch(Domain + url);
    let json = await res.json();
    //   console.log("GOT", json);
    return json;
  } catch (error) {
    return { error: String(error) };
  }
}

export async function post(url: string, body: object) {
  try {
    console.log("POST", Domain + url);
    let response = await axios.post(Domain + url, body);
    return response.data;
  } catch (error: any) {
    if (error?.response?.data?.message) {
      return { error: error.response.data.message };
    }
    return { error: String(error) };
  }
}
