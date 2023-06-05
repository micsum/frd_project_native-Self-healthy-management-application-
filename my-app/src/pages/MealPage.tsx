// Buffer Line
import { Fragment, useState } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import DateSelectionPanel from "../components/mealPageComponents/DateSelectionPanel";
import MealTypeSelection from "../components/mealPageComponents/MealTypeSelection";

const MealPage: React.FC = () => {
  const [date, updateSelectedDate] = useState<Date>(new Date());

  return (
    <Provider store={store}>
      <Fragment>
        <DateSelectionPanel date={date} selectNewDate={updateSelectedDate} />
        <MealTypeSelection selectedDate={date}></MealTypeSelection>
      </Fragment>
    </Provider>
  );
};

export default MealPage;
