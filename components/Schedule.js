import React, { Component } from "react";
import {
  DatePickerIOS,
  View,
  StyleSheet,
  Text,
  Button,
  Alert,
  TouchableOpacity
} from "react-native";

export default class Schedule extends Component {
  static navigationOptions = {
    headerShown: false,
  }

  constructor(props) {
    super(props);
    this.state = { chosenDate: new Date() };
    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
    console.log(newDate);
  }

  confirmPress = () => {
    var now = new Date();
    var chosen = this.state.chosenDate.getTime();
    var extra_s = this.state.chosenDate.getSeconds();
    console.log(extra_s);
    var diff = this.state.chosenDate.getTime() - now.getTime() - extra_s*1000;
    console.log("Moves in " + diff / 1000 + " seconds");
    setTimeout(() => {
      console.log("Timer done");
    }, diff);
    Alert.alert("Schedule set");
    this.props.navigation.navigate('Home');
  };

  render() {
    return (
      <View style={styles.container}>
        

        <View style={styles.title_container}>
          <Text style={styles.title}>Select a time for curtain close/open!</Text>
        </View>


        <View style={styles.time_selector}>
          <DatePickerIOS
            date={this.state.chosenDate}
            onDateChange={this.setDate}
          />
        </View>


        <View style={styles.bottom}>
          <TouchableOpacity onPress={() => this.confirmPress()}>
            <View style={styles.button}>
              <Text style={styles.button_text}>Confirm</Text>
            </View>
          </TouchableOpacity>
        </View>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "lightblue"
  },

  title_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: "raleway-regular",
    fontSize: 30,
    textAlign: 'center',    
  },

  time_selector: {
    flex: 1,
    justifyContent: 'center',
  },

  bottom: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontFamily: "raleway-regular",
    color: 'white',
    fontSize: 20,
  },
});