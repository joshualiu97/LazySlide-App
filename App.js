import React, { Component } from 'react';
import Home from './components/Home.js'
import Schedule from './components/Schedule.js'
import Test from './components/Test.js'
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
  Home: {screen: Home},
  Schedule: {screen: Schedule},
});

const App = createAppContainer(MainNavigator);

export default App;