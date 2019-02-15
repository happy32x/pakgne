import React, { Component } from 'react'
import { 
  View, 
  Text,
  StyleSheet 
} from 'react-native'

import THEME from '../INFO/THEME'

import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'
import IconOcticons from 'react-native-vector-icons/Octicons'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

function EmptyDynamic (props) {
  return (
    <View style={styles.main_container}>
      
      {
        props.type === 'MaterialCommunityIcons' ? <IconMaterialCommunityIcons style={[styles.icon, {color: props.color}]} name={props.icon} />
          : props.type === 'Octicons' ? <IconOcticons style={[styles.icon, {color: props.color}]} name={props.icon} /> 
            : props.type === 'Ionicons' ? <IconIonicons style={[styles.icon, {color: props.color}]} name={props.icon} />
              : props.type === 'MaterialIcons' ? <IconMaterialIcons style={[styles.icon, {color: props.color}]} name={props.icon} />
                : <Text>the specified font is not supported</Text>
      }

      <Text style={styles.txt}>{props.message}</Text>

    </View>
  )    
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {  
    color: THEME.TERTIARY.COLOR,
  },
  icon: { 
    fontWeight:'bold', 
    fontFamily:'normal',  
    fontSize:40,
  },
})

export default EmptyDynamic