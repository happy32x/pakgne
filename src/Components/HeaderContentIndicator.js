import React, { Component } from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'

import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconFeather from 'react-native-vector-icons/Feather'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'
import DIMENSION from '../INFO/DIMENSION'

function HeaderContentIndicator(props) {
  return (
    <View style={[
      styles.main_container, 
      { 
        backgroundColor: props.backgroundColor, 
        height: !props.maxHeight ? DIMENSION.MIN_HEADER_HEIGHT : DIMENSION.MAX_HEADER_HEIGHT,
      }
    ]}>
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
    alignItems:'center', 
    justifyContent:'center',
  },
  icon: { 
    fontWeight:'bold', 
    fontFamily:'normal',  
    fontSize:40,
  },
})

export default HeaderContentIndicator

