import { Domain } from "@env";
import { useEffect, useState } from "react";
import { Table, Row, Rows } from "react-native-table-component";
import { getFromSecureStore } from "../../storage/secureStore";

export async function WorkoutDetailItem() {
  const token = await getFromSecureStore("token");
  useEffect(() => {
    const fetchWorkoutData = async () => {
      console.log("123");
      let res = await fetch(`${Domain}/workout/detail`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      let workout_data = await res.json();
      console.log(workout_data);
    };
    fetchWorkoutData();
  }, []);
  const [tableHead, setTableHead] = useState<string[]>([
    "Exercise",
    "Sets",
    "Reps",
  ]);

  const [tableData, setTableData] = useState<any>([
    ["Bench Press - Power", "2-4", "3 to 5"],
    ["Incline Bench Press  - Muscle", "2-3", "6 to 12"],
    ["Dumbbell Bench Press - Muscle", "2-3", "6 to 12"],
    ["Dumbbell Flys - Burn", "1", "40"],
    ["Closegrip Bench Press - Power", "2", "3 to 5"],
    ["Seated French Press  - Muscle", "2", "6 to 12"],
    ["Cable Tricep Extension - Burn", "1", "40"],
  ]);
  return (
    <>
      <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
        <Row
          data={tableHead}
          // style={styles.head}
          // textStyle={styles.text}
        />
        <Rows data={tableData} />
      </Table>
    </>
  );
}
