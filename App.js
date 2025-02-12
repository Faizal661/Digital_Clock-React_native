import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Font from "expo-font";
import * as ScreenOrientation from "expo-screen-orientation";

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());
  const [fontLoaded, setFontLoaded] = useState(false);
  const [orientation, setOrientation] = useState("portrait");
  const [hour,setHour]= useState();

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        "DigitalDismay": require("./assets/fonts/DigitalDismay.otf"),
      });
      setFontLoaded(true);
    }
    loadFont();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    setHour(time.getHours()%12)

    return () => clearInterval(interval);
  }, []);

  // Detect orientation changes
  useEffect(() => {
    async function getOrientation() {
      const orientationInfo = await ScreenOrientation.getOrientationAsync();
      if (
        orientationInfo === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
        orientationInfo === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
      ) {
        setOrientation("landscape");
      } else {
        setOrientation("portrait");
      }
    }

    getOrientation();

    // Listen for orientation changes
    const subscription = ScreenOrientation.addOrientationChangeListener(
      (event) => {
        const newOrientation = event.orientationInfo.orientation;
        if (
          newOrientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
          newOrientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
        ) {
          setOrientation("landscape");
        } else {
          setOrientation("portrait");
        }
      }
    );

    return () => ScreenOrientation.removeOrientationChangeListener(subscription);
  }, []);


  if (!fontLoaded) {
    return <Text style={styles.loadingText}>Loading Font...</Text>;
  }

  return (
    <View
      style={[
        styles.container,
        orientation === "landscape" ? styles.landscapeContainer : {},
      ]}
    >
      <View>
        <Text
          style={[
            styles.clockText,
            orientation === "landscape" ? styles.landscapeText : {},
          ]}
        >
          {hour.toString().padStart(2, "0")}:
          {time.getMinutes().toString().padStart(2, "0")}:
          {time.getSeconds().toString().padStart(2, "0")}
        </Text>
      </View>
      {/* <Text style={styles.loadingText}

      >developed by mohammed Faizal T
      </Text> */}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  landscapeContainer: {
    flexDirection: "row", // Make it wider
  },
  clockText: {
    fontSize: 110,
    color: "#fff",
    fontFamily: "DigitalDismay",
    lineHeight: 120,
    paddingBottom: 20,
  },
  landscapeText: {
    lineHeight: 450,
    fontSize: 230,

  },
  loadingText: {
    fontSize: 20,
    color: "#fff",
  },
});

export default function App() {
  return <DigitalClock />;
}
