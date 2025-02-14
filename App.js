import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import * as Font from "expo-font";
import * as ScreenOrientation from "expo-screen-orientation";

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());
  const [fontLoaded, setFontLoaded] = useState(false);
  const [orientation, setOrientation] = useState("portrait");
  const [hour, setHour] = useState(time.getHours() % 12 || 12);
  const [ampm, setAmpm] = useState(time.getHours() < 12 ? "aM" : "pM");

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
      setHour(time.getHours() % 12 || 12)
      setAmpm(time.getHours() < 12 ? 'aM' : 'pM')
    }, 1000);

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

  const openWebsite = () => {
    Linking.openURL("https://www.github.com/Faizal661");
  };

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
            orientation === "landscape" ? styles.landscapeText : styles.protraitText, styles.portraitContainer
          ]}
        >
          {hour.toString().padStart(2, "0")}:
          {time.getMinutes().toString().padStart(2, "0")}:
          {time.getSeconds().toString().padStart(2, "0")}
          <Text style={styles.ampm}>{ampm}</Text>
        </Text>
      </View>
      <TouchableOpacity onPress={openWebsite}>
        <View style={styles.container2}>
          <Text style={styles.loadingText}>Developed By </Text>
          <Text style={styles.linkText}>Faizal661</Text>
        </View>
      </TouchableOpacity>
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
  container2: {
    flexDirection: "row",
    marginBottom: 60,
  },
  portraitContainer: {
    marginLeft: 60,
    paddingBottom: 50
  },
  protraitText: {
    fontSize: 160,
    width: 200,
    lineHeight: 160,

  },
  clockText: {
    fontSize: 110,
    color: "#e1e1e1",
    fontFamily: "DigitalDismay",
    lineHeight: 120,
    paddingBottom: 20,
  },
  landscapeText: {
    lineHeight: 450,
    fontSize: 230,

  },
  linkText: {
    fontSize: 16,
    color: "#767676",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  loadingText: {
    fontSize: 16,
    color: "#b2b2b2",
  },
  ampm: {
    fontSize: 30,
    color: "#b2b2b2",
  }
});

export default function App() {
  return <DigitalClock />;
}
