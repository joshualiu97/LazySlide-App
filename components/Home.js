import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  DatePickerIOS
} from 'react-native';
import * as Font from 'expo-font';
import io from 'socket.io-client';

const instructions = "Open and close your curtains with only a press of a button!";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenDate: new Date(),
      homeMode: true,
      setOpen: true,
    };
    this.setDate = this.setDate.bind(this);
  };

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
    // console.log(newDate);
  };
  
  componentDidMount() {
    Font.loadAsync({
      'raleway-regular': require('../assets/fonts/Raleway-Regular.ttf'),
      'raleway-bold': require('../assets/fonts/Raleway-Bold.ttf'),
    });

    this.socket = io('http://128.97.244.65:8080',{
      transports: ['websocket'], jsonp: false
    });
  };

  componentWillUnmount() {
    this.socket.disconnect();
  };

  onOpenPress = (event) => {
    event.stopPropagation();
    this.socket.emit('instruction', 'open');
    console.log("Open pressed");
  };
  
  onClosePress = (event) => {
    event.stopPropagation();
    this.socket.emit('instruction', 'close');
    console.log("Close pressed");
  };

  onRelease = (event) => {
    event.stopPropagation();
    this.socket.emit('instruction', 'stop');
    console.log("Released button");
  };

  onOpenAll = (event) => {
    event.stopPropagation();
    this.socket.emit('instruction', 'open all');
    console.log("Open all");
  };

  onCloseAll = (event) => {
    event.stopPropagation();
    this.socket.emit('instruction', 'close all');
    console.log("Close all");
  };

  confirmPress = () => {
    var now = new Date();
    var extra_s = this.state.chosenDate.getSeconds();
    // console.log(extra_s);
    var diff = this.state.chosenDate.getTime() - now.getTime() - extra_s*1000;
    console.log("Moves in " + diff / 1000 + " seconds");
    setTimeout(() => {
      console.log("Timer done. Sending:")
      console.log(this.state.setOpen ? 'open all' : 'close all');
      this.socket.emit('instruction', this.state.setOpen ? 'open all' : 'close all');
      console.log("Sent");
    }, diff);
    Alert.alert("Schedule set");
    this.setState({homeMode: true});
  };

  onPressOpenHelper = () => {
    this.setState({setOpen: true});
    this.confirmPress();
  };

  onPressCloseHelper = () => {
    this.setState({setOpen: false});
    this.confirmPress();
  };

  render() {
    let schedule = (

      <View style={styles.container_sch}>


        <View style={styles.title_container_sch}>
          <Text style={styles.title_sch}>Select a time for curtain close/open!</Text>
        </View>


        <View style={styles.time_selector}>
          <DatePickerIOS date={this.state.chosenDate} onDateChange={this.setDate}/>
        </View>


        <View style={styles.bottom}>
          
          <View>
            <TouchableOpacity onPress={this.onPressOpenHelper}>
              <View style={styles.button}>
                <Text style={styles.button_text}>Open</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity onPress={this.onPressCloseHelper}>
              <View style={styles.button}>
                <Text style={styles.button_text}>Close</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>


      </View>
    );

    let home = (
      <View style={styles.container}>
      {/* flex: 1, main container  */}


        <View style={styles.header}>
        {/* top half, contains title and intro message */}
          <Text style={styles.title}>LazySlide</Text>
          <Text style={styles.instructions}>{instructions}</Text>
        </View>


        <View style={styles.schedule_container}>
          <Text style={styles.schedule_header}>Schedule</Text>                    
          <View style={styles.buttons}>
            <TouchableOpacity onPress={() => this.setState({homeMode: false})}>
              <View style={styles.button}>
                <Text style={styles.button_text}>Set</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>


        <View style={styles.button_container}>
        {/* bottom half container */}
            
          <View style={styles.buttons}>
          {/* button container */}
              
            <TouchableOpacity onPress={this.onOpenAll}>
              <View style={styles.button}>
                <Text style={styles.button_text}>Open All</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.onCloseAll}>
              <View style={styles.button}>
                <Text style={styles.button_text}>Close All</Text>
              </View>
            </TouchableOpacity>

          </View>



          <View style={styles.buttons}>
          {/* button container */}
              
            <TouchableOpacity onPressIn={this.onOpenPress} onPressOut={this.onRelease}>
              <View style={styles.button}>
                <Text style={styles.button_text}>Open (Hold)</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPressIn={this.onClosePress} onPressOut={this.onRelease}>
              <View style={styles.button}>
                <Text style={styles.button_text}>Close (Hold)</Text>
              </View>
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('Test')}>
              <Text>HI</Text>
            </TouchableOpacity> */}

          </View>

        </View>

      </View>
    );
    
    return this.state.homeMode ? home : schedule;
  }
}

const styles = StyleSheet.create({
  container: {
    fontFamily: "raleway-regular",
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'lightblue',
  },
  
  header: {
    flex: 2,
    // backgroundColor: 'red',
    width: '80%',
    alignItems: 'center',
    justifyContent:'center',
  },
  title: {
    fontFamily: "raleway-bold",
    fontSize: 60,
    fontWeight: 'bold',
  },
  instructions: {
    fontFamily: "raleway-regular",
    fontSize: 20,
    textAlign: 'center',
  },

  schedule_container: {
      flex: 1.5,
  },
  schedule_header: {
      fontFamily: "raleway-bold",
      fontSize: 25,
      textAlign: 'center',
  },

  button_container: {
    flex: 2.5,
    justifyContent: 'center',
  },
  buttons: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    color: 'white',
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
  
  container_sch: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "lightblue"
  },
  
  title_container_sch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title_sch: {
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
    flexDirection: 'row',
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