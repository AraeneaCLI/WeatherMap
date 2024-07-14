import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

interface ForecastProps {
  main: string;
  description: string;
  temp: number;
}

class Forecast extends Component<ForecastProps> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.main}>
          {this.props.main}
        </Text>
        <Text style={styles.description}>
          Current Conditions: {this.props.description}
        </Text>
        <Text style={styles.temp}>
          Temp: {this.props.temp}°C
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    margin: 10,
  },
  main: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
  },
  temp: {
    fontSize: 24,
  },
});

export default Forecast;
