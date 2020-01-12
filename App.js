import React, { Component } from 'react';
import Home from './components/Home.js'
import Schedule from './components/Schedule.js'
import Test from './components/Test.js'
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

export default class App extends Component {
  render() {
    return (
      <Home/>
    );
  };
}