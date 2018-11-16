import React, { Component } from 'react'
import {
  View, 
  StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

class ButtonScrollTop extends Component {

  render() {
    return (
      <View style={styles.button}>       
        <Icon style={styles.arrow} name="ios-arrow-dropup-circle" /> 
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    borderRadius:15,
    width: 30,
    height: 30,
    alignItems:'center', 
    justifyContent:'center',
    opacity: 0.8,
    backgroundColor: "#FFF"
  },
  arrow: { 
    color:"#F57F17", 
    fontSize:30 
  }
})

export default ButtonScrollTop