import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  StatusBar,
} from 'react-native'

import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconFeather from 'react-native-vector-icons/Feather'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'

const STATUSBAR_HEIGHT = StatusBar.currentHeight
const MIN_HEADER_HEIGHT = 60 
const MAX_HEADER_HEIGHT = STATUSBAR_HEIGHT + MIN_HEADER_HEIGHT
const NAVBAR_HEIGHT = 50
const TOTAL_HEADER_HEIGHT = MAX_HEADER_HEIGHT + NAVBAR_HEIGHT

function ContentIndicator(props) {
  return (
    <View style={[styles.main_container, { backgroundColor: props.backgroundColor }]}>
      {
        props.type === 'MaterialCommunityIcons' ? <IconMaterialCommunityIcons style={[styles.icon, {color: props.color}]} name={props.icon} />
          : props.type === 'Feather' ? <IconFeather style={[styles.icon, {color: props.color}]} name={props.icon} /> 
            : props.type === 'Ionicons' ? <IconIonicons style={[styles.icon, {color: props.color}]} name={props.icon} />
              : props.type === 'MaterialIcons' ? <IconMaterialIcons style={[styles.icon, {color: props.color}]} name={props.icon} />
                : <Text>the specified font is not supported</Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    alignSelf:'stretch',
    height: MIN_HEADER_HEIGHT,
    alignItems:'center', 
    justifyContent:'center',
  },
  icon: { 
    fontWeight:'bold', 
    fontFamily:'normal',  
    fontSize:40,
  },
})

export default ContentIndicator

