import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Alert
} from 'react-native';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
// });
const instructions = "Press open to open. Press close to close.";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>LazySlide</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        
        <View style={styles.buttons}>
          <View style={styles.button}>
            <Button
            title="Open"
            onPress={() => Alert.alert('Opening curtains')}
            />
          </View>
          <View style={styles.button}>
            <Button
            title="Close"
            onPress={() => Alert.alert('Closing curtains')}
            />
          </View>
        </View>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'lightblue',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  instructions: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 200,
  },
  buttons: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    color: 'white',
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#627E8D',
    color: 'white',
    width: 150,
    height: 60,
    margin: 10,
  },
});
