import React, { Component } from 'react'
import {
  View,
  Text,
  Platform,
  StyleSheet,  
  TouchableNativeFeedback,
} from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import BarStatus from './BarStatus'
import DIMENSION from '../INFO/DIMENSION'
import THEME from '../INFO/THEME'

function CommonHeader(props) {
  return (     
    <View style={styles.header}>

      <View style={styles.header_container_left}>        
        <TouchableNativeFeedback 
          background={TouchableNativeFeedback.Ripple(THEME.PRIMARY.WAVE_COLOR_PRIMARY,true)}
          onPress={() => props.navigateBack()}
        >
          <View style={styles.arrow_back_container}>
            <Ionicons style={styles.arrow_back_icon} name="md-arrow-back" /> 
          </View>
        </TouchableNativeFeedback>              
        <Text style={styles.title}>{ props.title }</Text>        
      </View>

      <View style={styles.header_container_right}> 
        {/* icône de partage ou option */}             
      </View>      

      { Platform.OS === 'android' ? <BarStatus color={THEME.PRIMARY.BACKGROUND_COLOR} /> : null }           
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: THEME.PRIMARY.BACKGROUND_COLOR,
		height: DIMENSION.MAX_HEADER_HEIGHT,
    width: '100%',
    alignItems: 'center', 
		justifyContent: 'center',
		flexDirection:'row',
		paddingTop: DIMENSION.STATUSBAR_HEIGHT,
		marginTop:0,
    borderBottomWidth: 1,
    borderBottomColor: THEME.TERTIARY.SEPARATOR_COLOR,
  },
  header_container_left: {
    flex: 1,
    flexDirection:'row',
    alignItems: 'center', 
    justifyContent: 'flex-start',
    //paddingLeft: 15,    
  },
  arrow_back_container: {
    width: DIMENSION.MIN_HEADER_HEIGHT, 
		height: DIMENSION.MIN_HEADER_HEIGHT, 
		alignItems: 'center', 
		justifyContent: 'center', 
  },
  arrow_back_icon: {
    fontWeight:'bold', 
		fontFamily:'normal', 
		color: THEME.PRIMARY.COLOR, 
		fontSize:25,
  },
  header_container_right: {
    flexDirection:'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 18,
    color: THEME.PRIMARY.COLOR,
  }, 
})

export default CommonHeader