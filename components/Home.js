import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    TouchableOpacityBase
} from 'react-native';
import { AuthSession } from 'expo';
import * as Font from 'expo-font';
import io from 'socket.io-client';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
// });
const instructions = "Open and close your curtains with only a press of a button!";

class Home extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    
    componentDidMount() {
        // console.log("Hi");
        
        Font.loadAsync({
            'raleway-regular': require('../assets/fonts/Raleway-Regular.ttf'),
            'raleway-bold': require('../assets/fonts/Raleway-Bold.ttf'),
        });

        this.socket = io('http://128.97.244.92:8080',{
            transports: ['websocket'], jsonp: false
        });        
    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    onOpenPress = (event) => {
        event.stopPropagation();
        this.socket.emit('instruction', 'open');
        console.log("open pressed");
    }
      
    onClosePress = (event) => {
        event.stopPropagation();
        this.socket.emit('instruction', 'close');
        console.log("close pressed");
    }
    
    onRelease = (event) => {
        event.stopPropagation();
        this.socket.emit('instruction', 'stop');
        console.log("released button");
    }

    onOpenAll = (event) => {
        event.stopPropagation();
        this.socket.emit('instruction', 'openall');
        console.log("open all");
    }

    onCloseAll = (event) => {
        event.stopPropagation();
        this.socket.emit('instruction', 'closeall');
        console.log("close all");
    }


    render() {
        return (
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
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Test')}>
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
      fontFamily: "raleway-regular",
      color: 'white',
      fontSize: 20,
    },
});

export default Home;