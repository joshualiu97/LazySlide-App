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

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
// });
const instructions = "Open and close your curtains with only a press of a button!";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
      {/* flex: 1, main container  */}
        
        <View style={styles.header}>
        {/* top half, contains title and intro message */}
          <Text style={styles.title}>LazySlide</Text>
          <Text style={styles.instructions}>{instructions}</Text>
        </View>

        <View style={styles.button_container}>
        {/* bottom half container */}
          <View style={styles.buttons}>
          {/* button container */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => Alert.alert('Opening curtains')}
            >
              <Text style={styles.button_text}>Open</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => Alert.alert('Closing curtains')}
            >
              <Text style={styles.button_text}>Close</Text>
            </TouchableOpacity>
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
  
  header: {
    flex:2,
    // backgroundColor: 'red',
    width: '80%',
    alignItems: 'center',
    justifyContent:'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  instructions: {
    fontSize: 20,
    textAlign: 'center',
  },

  button_container: {
    flex: 2,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttons: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    color: 'white',
    // backgroundColor: 'red',
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#627E8D',
    width: 150,
    height: 60,
    margin: 10,
    alignItems: 'center',
    justifyContent:'center',
  },
  button_text: {
    color: 'white',
    fontSize: 20,
  },
});
