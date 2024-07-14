import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, NativeSyntheticEvent, TextInputSubmitEditingEventData, ImageBackground } from "react-native";

import Forecast from "./components/forecast";
import WeatherService from "./components/weathermap";  // Import the WeatherService correctly

interface ForecastData {
  main: string;
  description: string;
  temp: number;
}

interface AppState {
  zip: string;
  forecast: ForecastData | null;
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = { zip: "", forecast: null };
  }

  _handleTextChange = (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    let zip = event.nativeEvent.text;
    WeatherService.fetchForecast(zip).then((forecast) => {
      this.setState({ forecast });
    }).catch(error => {
      console.error(error);
    });
  };

  render() {
    let content = null;
    if (this.state.forecast !== null) {
      content = (
        <Forecast main={this.state.forecast.main} description={this.state.forecast.description} temp={this.state.forecast.temp} />
      );
    }
    return (
      <View style={styles.container}>
        <ImageBackground source={require('./assets/img/bg.jpeg')} resizeMode="cover" style={styles.backdrop}>
          <Text style={styles.text}>
            You Input: {this.state.zip}
          </Text>
          {content}
          <TextInput
            style={styles.input}
            onSubmitEditing={this._handleTextChange}
            placeholder="Enter ZIP code"
          />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  backdrop: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "80%",
    paddingLeft: 8,
    backgroundColor: 'transparent',
    opacity: 0.7,
    marginTop: 10,
  },
});

export default App;
