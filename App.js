import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';
import { AuthSession } from 'expo';
import * as Font from 'expo-font';
import Home from './components/Home.js'

export default class App extends Component {
  componentDidMount() {
    Font.loadAsync({
      'raleway-regular': require('./assets/fonts/Raleway-Regular.ttf'),
      'raleway-bold': require('./assets/fonts/Raleway-Bold.ttf'),
    });
  }

  render() {
    return (
      <Home/>
    );
  }
}