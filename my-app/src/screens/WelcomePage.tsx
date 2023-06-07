import React, { useState } from "react";
import {
  Text,
  View,
  Button,
  Dimensions,
  StatusBar,
  SafeAreaView,
  ScrollView,
  PixelRatio,
  StyleSheet,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export const WelcomeScreen = () => {
  const [sliderState, setSliderState] = useState({ currentPage: 0 });
  const { width, height } = Dimensions.get("window");

  const setSliderPage = (event: any) => {
    const { currentPage } = sliderState;
    const { x } = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.floor(x / width);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };

  const { currentPage: pageIndex } = sliderState;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }} className="bg-blue-300">
        <ScrollView
          style={{ flex: 1 }}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={(event: any) => {
            setSliderPage(event);
          }}
        >
          <View style={{ width, height }}>
            <MaterialIcons
              name="fitness-center"
              size={36}
              color="black"
              style={styles.imageStyle}
            />
            <View style={styles.wrapper}>
              <Text style={styles.header}>beHealthy</Text>
              <Text style={styles.paragraph}></Text>
            </View>
          </View>
          <View style={{ width, height }}>
            <MaterialIcons
              name="fitness-center"
              size={36}
              color="black"
              style={styles.imageStyle}
            />

            <View style={styles.wrapper}>
              <Text style={styles.header}>Live Chat</Text>
              <Text style={styles.paragraph}>
                Ask the advice from live experts and AI
              </Text>
            </View>
          </View>
          <View style={{ width, height }}>
            <MaterialIcons
              name="fitness-center"
              size={36}
              color="black"
              style={styles.imageStyle}
            />

            <View style={styles.wrapper}>
              <Text style={styles.header}>Meal Track</Text>
              <Text style={styles.paragraph}>
                Check your meal nutrients and have a well plan
              </Text>
            </View>
          </View>
          <View style={{ width, height }}>
            <MaterialIcons
              name="fitness-center"
              size={36}
              color="black"
              style={styles.imageStyle}
            />

            <View style={styles.wrapper}>
              <Text style={styles.header}>Calender</Text>
              <Text style={styles.paragraph}>Record your scheme</Text>
            </View>
          </View>
          <View style={{ width, height }}>
            <MaterialIcons
              name="fitness-center"
              size={36}
              color="black"
              style={styles.imageStyle}
            />

            <View style={styles.wrapper}>
              <Text style={styles.header}>Plans</Text>
              <Text style={styles.paragraph}>
                Full of nutrients and workout plans for you
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.paginationWrapper}>
          {Array.from(Array(5).keys()).map((key, index) => (
            <View
              style={[
                styles.paginationDots,
                { opacity: pageIndex === index ? 1 : 0.2 },
              ]}
              key={index}
            />
          ))}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(135),
    width: "100%",
  },
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 17,
  },
  paginationWrapper: {
    position: "absolute",
    bottom: 200,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  paginationDots: {
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
    backgroundColor: "#0898A0",
    marginLeft: 10,
  },
});
