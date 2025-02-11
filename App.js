import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Mohammed Faizal T</Text>
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
    backgroundColor: "#121212",
  },
   heading: {
    fontSize: 40,
    fontWeight: "medium",
    fontStyle:"italic",
    color: "#ffff",
  },
  clockText: {
    fontSize: 80,
    fontWeight: "bold",
    color: "#00ffcc",
  },
});

export default function App() {
  return <DigitalClock />;
}
