import { Domain } from "@env";

export async function get(url: string) {
  console.log("GET", Domain + url);
  let res = await fetch(Domain + url);
  let json = await res.json();
  //   console.log("GOT", json);
  return json;
}
