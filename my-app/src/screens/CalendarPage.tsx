import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Button, Platform } from "react-native";
import { Agenda, Calendar, DateData } from "react-native-calendars";
import * as CalendarAPI from "expo-calendar";
import { Event, EventDates, ObjectAny } from "../utils/type";
import { createStackNavigator } from "@react-navigation/stack";

export function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState("");
  const [dates, setDates] = useState({});
  const [events, setEvents] = useState<Event[]>([]);

  const eventDatesRef = useRef<EventDates>();

  useEffect(() => {
    (async () => {
      const { status } = await CalendarAPI.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const calendars = await CalendarAPI.getCalendarsAsync(
          CalendarAPI.EntityTypes.EVENT
        );
        // console.log("Here are all your calendars:");
        // console.log({ calendars });

        const events = await CalendarAPI.getEventsAsync(
          [calendars[0].id], // Replace with the ID of the calendar you want to get events from
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
        );
        console.log("Here are the events for the next 2 weeks:");
        const parsedEvents = events.map((event) => ({
          id: event.id,
          title: event.title,
          start_date: new Date(
            new Date(event.startDate).getTime() + 24 * 3600000
          ),
          end_date: new Date(event.endDate),
          event_type: "",
          information: "",
          alert: false,
        }));
        setEvents(parsedEvents);

        const markedDates: any = {};
        parsedEvents.forEach((event) => {
          console.log(event);
          const date = event.start_date;
          const dateString = date.toISOString().split("T")[0];
          markedDates[dateString] = { marked: true, dotColor: "red" };
        });

        eventDatesRef.current = markedDates;
        setDates(markedDates);
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
      //@ts-ignore
      sourceId: defaultCalendarSource.id,
      //@ts-ignore
      source: defaultCalendarSource,
      name: "internalCalendarName",
      ownerAccount: "personal",
      accessLevel: CalendarAPI.CalendarAccessLevel.OWNER,
    });
    console.log(`Your new calendar ID is: ${newCalendarID}`);
  };

  const addEvent = async () => {
    const calendar = await getDefaultCalendar();
    if (calendar === undefined) {
      return;
    }

    const defaultCalendarID = calendar.id;

    if (defaultCalendarID !== undefined && selectedDate !== "") {
      const event = await CalendarAPI.createEventAsync(defaultCalendarID, {
        id: Math.random().toString(),
        title: "Test Event",
        startDate: new Date(selectedDate),
        endDate: new Date(new Date(selectedDate).getTime() + 60 * 60 * 1000), // 1 hour
      });
      console.log(event);

      const newEvent = {
        id: Math.random().toString(),
        title: "This is an event",
        start_date: new Date(selectedDate),
        end_date: new Date(new Date(selectedDate).getTime() + 3600 * 1000 * 2),
        alert: false,
        event_type: "basketball",
        information: "play basketball with ball hub",
      };

      setDates((dateObject: ObjectAny) => {
        return {
          ...dateObject,
          [selectedDate.split("T")[0]]: {
            marked: true,
            dotColor: "red",
          },
        };
      });
      eventDatesRef.current = {
        ...eventDatesRef.current,
        [selectedDate.split("T")[0]]: {
          marked: true,
          dotColor: "red",
        },
      };
      setEvents((eventList: Event[]) => {
        return [...eventList, newEvent];
      });

      //   console.log(`Your new event ID is: ${event.id}`);
      //   const parsedEvent = {
      //     id: event.id,
      //     title: event.title,
      //     startDate: new Date(event.startDate),
      //     endDate: new Date(event.endDate),
      //     eventType: "",
      //     information: "",
      //     alert: false,
      //   };
      //   setEvents([...events, parsedEvent]);

      //   const dateString = selectedDate.split("T")[0];

      //   setMarkedDates((prev) => ({
      //     ...prev,
      //     [dateString]: { marked: true },
      //   }));
    }
    //return { error: "adding error" };
  };

  const deleteEvent = async (eventId: string) => {
    const deletedEventId = await CalendarAPI.deleteEventAsync(eventId);
    console.log(`Deleted event with ID: ${deletedEventId}`);

    let deletedEvent: Event[] = [];
    let newEventList: Event[] = [];
    let dateEventObject: ObjectAny = {};
    events.map((event) => {
      let inConsideration =
        dateEventObject[event.start_date.toISOString().split("T")[0]];
      dateEventObject[event.start_date.toISOString().split("T")[0]] =
        inConsideration ? inConsideration + 1 : 1;

      if (event.id !== eventId) {
        newEventList.push(event);
      } else {
        deletedEvent.push(event);
      }
    });
    setEvents(newEventList);

    //const deletedEvent = events.find((event) => event.id === eventId);
    if (deletedEvent.length > 0) {
      const dateString = deletedEvent[0].start_date.toISOString().split("T")[0];
      if (eventDatesRef.current && dateEventObject[dateString] === 1) {
        delete eventDatesRef.current[dateString];
        setDates(eventDatesRef.current);
      }
    }
  };

  const onDayPress = (day: DateData) => {
    const dateString = day.dateString;
    let newDates: ObjectAny = {};
    newDates = { ...eventDatesRef.current };
    newDates = {
      ...newDates,
      [dateString]: { ...newDates[dateString], selected: true },
    };
    setDates(newDates);
    setSelectedDate(dateString);
    console.log(dateString);
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        markedDates={dates}
        theme={{
          backgroundColor: "#ffffff",
          calendarBackground: "#ffffff",
          textSectionTitleColor: "#b6c1cd",
          selectedDayBackgroundColor: "#00adf5",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#00adf5",
          dayTextColor: "#2d4150",
        }}
        style={{
          borderWidth: 1,
          borderColor: "gray",
          height: 400,
        }}
      />
      <View style={styles.eventContainer}>
        <Text>Selected date: {selectedDate}</Text>
        {/* <Button title="Create a new calendar" onPress={createCalendar} /> */}
        <Button title="Add Test Event" onPress={addEvent} />
        {events.map((event) => {
          const { id, title, start_date, end_date } = event;
          const startDateString = start_date.toISOString().split("T")[0];
          return startDateString === selectedDate ? (
            <View style={styles.event} key={id}>
              <Text style={styles.eventTitle}>{title}</Text>
              <Text style={styles.eventTime}>
                {start_date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                -{" "}
                {end_date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
              <Button
                title="Delete"
                onPress={() => deleteEvent(id)}
                color="red"
              />
            </View>
          ) : null;
        })}
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

export function CalendarScreen({}) {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeNoStack"
        component={CalendarPage}
        options={{
          headerShown: true,
          title: "Calendar",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#38668E" },
          headerTintColor: "#a5f3fc",
          headerBackTitle: " ",
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "",
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
