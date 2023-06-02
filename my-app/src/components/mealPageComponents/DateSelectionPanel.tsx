// Buffer Line
import Calendar from "react-calendar";
import { Fragment, useEffect, useState } from "react";
// import { View, span } from "react-native";
import "react-calendar/dist/Calendar.css";

export default function DateSelectionPanel(props: {
  date: Date;
  selectNewDate: (event: any) => void;
}) {
  const { date, selectNewDate } = props;

  const formatDateString = (date: Date) => {
    let dateString = date.toDateString();
    let [weekday, month, day, year] = dateString.split(" ");
    return `${day} ${month} ${year} (${weekday})`;
  };

  return (
    <Fragment>
      <Calendar value={date} onChange={selectNewDate} />
      <div>
        {" "}
        Selected Date : <span>{formatDateString(date)}</span>
      </div>
    </Fragment>
  );
}
