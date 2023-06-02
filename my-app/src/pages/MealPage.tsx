// Buffer Line
import { Fragment, useState } from "react";
import DateSelectionPanel from "../components/mealPageComponents/DateSelectionPanel";
import MealTypeSelection from "../components/mealPageComponents/MealTypeSelection";

const MealPage: React.FC = () => {
  const [date, updateSelectedDate] = useState<Date>(new Date());

  return (
    <Fragment>
      <DateSelectionPanel date={date} selectNewDate={updateSelectedDate} />
      <MealTypeSelection selectedDate={date}></MealTypeSelection>
    </Fragment>
  );
};

export default MealPage;
