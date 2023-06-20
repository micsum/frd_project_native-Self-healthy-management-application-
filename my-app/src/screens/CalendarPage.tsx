import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, Platform } from "react-native";
import { Calendar } from "react-native-calendars";
import * as CalendarAPI from "expo-calendar";
import { Event } from "../utils/type";

export function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [markedDates, setMarkedDates] = useState({});
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    (async () => {
      const { status } = await CalendarAPI.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const calendars = await CalendarAPI.getCalendarsAsync(
          CalendarAPI.EntityTypes.EVENT
        );
        console.log("Here are all your calendars:");
        console.log({ calendars });

        const events = await CalendarAPI.getEventsAsync(
          [calendars[0].id], // Replace with the ID of the calendar you want to get events from
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
        );
        console.log("Here are the events for the next 2 weeks:");
        console.log({ events });
        const parsedEvents = events.map((event) => ({
          id: event.id,
          title: event.title,
          startDate: new Date(event.startDate),
          endDate: new Date(event.endDate),
          eventType: "",
          information: "",
          alert: false,
        }));
        setEvents(parsedEvents);

        const markedDates = {};
        parsedEvents.forEach((event) => {
          const date = event.startDate;
          const dateString = date.toISOString().split("T")[0];
          markedDates[dateString] = { marked: true };
        });
        setMarkedDates(markedDates);
      }
    })();
  }, []);

  const createCalendar = async () => {
    const defaultCalendarSource =
      Platform.OS === "ios"
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: "Expo Calendar" };
    const newCalendarID = await CalendarAPI.createCalendarAsync({
      title: "Expo Calendar",
      color: "blue",
      entityType: CalendarAPI.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: "internalCalendarName",
      ownerAccount: "personal",
      accessLevel: CalendarAPI.CalendarAccessLevel.OWNER,
    });
    console.log(`Your new calendar ID is: ${newCalendarID}`);
  };

  const addEvent = async () => {
    const defaultCalendarID = (await getDefaultCalendar()).id; // Get the default calendar
    const event = await CalendarAPI.createEventAsync(defaultCalendarID, {
      title: "Test Event",
      startDate: selectedDate,
      endDate: new Date(selectedDate.getTime() + 60 * 60 * 1000), // 1 hour
    });
    console.log(`Your new event ID is: ${event.id}`);
    const parsedEvent = {
      id: event.id,
      title: event.title,
      startDate: new Date(event.startDate),
      endDate: new Date(event.endDate),
      eventType: "",
      information: "",
      alert: false,
    };
    setEvents([...events, parsedEvent]);

    const dateString = selectedDate.toISOString().split("T")[0];
    setMarkedDates((prev) => ({
      ...prev,
      [dateString]: { marked: true },
    }));
  };

  const deleteEvent = async (eventId: string) => {
    const deletedEventId = await CalendarAPI.deleteEventAsync(eventId);
    console.log(`Deleted event with ID: ${deletedEventId}`);
    setEvents(events.filter((event) => event.id !== eventId));

    const deletedEvent = events.find((event) => event.id === eventId);
    if (deletedEvent) {
      const dateString = deletedEvent.startDate.toISOString().split("T")[0];
      setMarkedDates((prev) => ({
        ...prev,
        [dateString]: { marked: false },
      }));
    }
  };

  const onDayPress = (day: { timestamp: string | number | Date }) => {
    setSelectedDate(new Date(day.timestamp));
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        markedDates={markedDates}
        theme={{
          selectedDayBackgroundColor: "#0898A0",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#0898A0",
        }}
      />
      <View style={styles.eventContainer}>
        <Text>Selected date: {selectedDate.toDateString()}</Text>
        <Button title="Create a new calendar" onPress={createCalendar} />
        <Button title="Add Test Event" onPress={addEvent} />
        {events
          .filter(
            (event) =>
              event.startDate.toDateString() === selectedDate.toDateString()
          )
          .map((event) => (
            <View style={styles.event} key={event.id}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventTime}>
                {event.startDate.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                -{" "}
                {event.endDate.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
              <Button
                title="Delete"
                onPress={() => deleteEvent(event.id)}
                color="red"
              />
            </View>
          ))}
      </View>
    </View>
  );
}

async function getDefaultCalendar() {
  const calendars = await CalendarAPI.getCalendarsAsync(
    CalendarAPI.EntityTypes.EVENT
  );
  return calendars.find((calendar) => calendar.allowsModifications);
}

async function getDefaultCalendarSource() {
  const defaultCalendar = await CalendarAPI.getDefaultCalendarAsync();
  return defaultCalendar.source;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  eventContainer: {
    padding: 10,
  },
  event: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  eventTitle: {
    fontWeight: "bold",
  },
  eventTime: {
    color: "#666",
  },
});
