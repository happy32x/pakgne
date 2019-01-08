import React, { Component } from 'react'
import {
  View, 
  StyleSheet,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import THEME from '../INFO/THEME'

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
    backgroundColor: THEME.PRIMARY.COLOR
  },
  arrow: { 
    color: THEME.PRIMARY.BACKGROUND_COLOR, 
    fontSize:30 
  }
})

export default ButtonScrollTop