import { Domain } from "@env";
import { useEffect } from "react";

export function PlanDetailItem() {
  useEffect(() => {
    const fetchWorkoutData = async () => {
      console.log("123");
      let res = await fetch(`${Domain}/workout/detail`);
      let workout_data = await res.json();
      console.log(workout_data);
    };
    fetchWorkoutData();
  }, []);

  return <></>;
}
