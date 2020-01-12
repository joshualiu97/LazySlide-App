import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert
} from 'react-native';
import * as Font from 'expo-font';

export default class Test extends Component {
    static navigationOptions = {
        headerShown: false,
    }

    ShowAlertWithDelay1=()=>{
        console.log("alert requested1");
        setTimeout(function() {
            //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
            Alert.alert("Alert Shows After 5 Seconds of Delay.");
            console.log("Alerted1");
        }, 5000);
    }
    ShowAlertWithDelay2=()=>{
        console.log("alert requested2");
        setTimeout(function() {
            //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
            Alert.alert("Alert Shows After 5 Seconds of Delay.");
            console.log("Alerted2");
        }, 5000);
    }

    render() {
        return (
          <View style={styles.container}>
            <TouchableOpacity onPress={this.ShowAlertWithDelay1}>
                <Text style={styles.words}>Alert</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={this.ShowAlertWithDelay2}>
                <Text style={styles.words}>Alert</Text>
            </TouchableOpacity>
                        
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
    words: {
        fontSize: 30,
    }
});
