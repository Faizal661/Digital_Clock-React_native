import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Font from "expo-font";

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());
  const [fontLoaded, setFontLoaded] = useState(false);

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
    return () => clearInterval(interval);
  }, []);

  if (!fontLoaded) {
    return <Text style={styles.loadingText}>Loading Font...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.clockText}>
        {time.getHours().toString().padStart(2, "0")}:
        {time.getMinutes().toString().padStart(2, "0")}:
        {time.getSeconds().toString().padStart(2, "0")}
      </Text>
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
  clockText: {
    fontSize: 100,
    color: "#fff",
    fontFamily: "DigitalDismay", 
    lineHeight: 100,
  },
  loadingText: {
    fontSize: 20,
    color: "#fff",
  }, 
});

export default function App() { 
  return <DigitalClock />;
}
