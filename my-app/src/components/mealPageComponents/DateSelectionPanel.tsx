// Buffer Line
import Calendar from "react-calendar";
import { Fragment, useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import { store } from "../../store";

export default function DateSelectionPanel(props: {
  date: Date;
  selectNewDate: (event: any) => void;
}) {
  const { date, selectNewDate } = props;
  const [foodInputVisible, updateFoodInputVisibility] = useState<boolean>(
    store.getState().foodInputPanelOpen
  );

  const formatDateString = (date: Date) => {
    let dateString = date.toDateString();
    let [weekday, month, day, year] = dateString.split(" ");
    return `${day} ${month} ${year} (${weekday})`;
  };

  store.subscribe(() => {
    const storeInfo = store.getState();
    updateFoodInputVisibility(() => {
      return storeInfo.foodInputPanelOpen;
    });
  });

  return (
    <Fragment>
      <Calendar
        value={date}
        onChange={foodInputVisible ? () => {} : selectNewDate}
      />
      <div>
        {" "}
        Selected Date : <span>{formatDateString(date)}</span>
      </div>
    </Fragment>
  );
}
