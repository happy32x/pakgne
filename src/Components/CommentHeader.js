import React, { Component } from 'react'
import {
  View,
  Text,
  Platform,
  StyleSheet,  
  ActivityIndicator,
  TouchableNativeFeedback,
} from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import BarStatus from './BarStatus'
import DIMENSION from '../INFO/DIMENSION'
import THEME from '../INFO/THEME'

function CommentHeader(props) {
  return (     
    <View style={styles.header}>

      <View style={styles.header_container_left}>
        <Text style={styles.header_text_one} >Commentaires </Text>

        <View style={styles.header_commentCount}>  
          {
            !props.isLoading 
              ? <Text style={styles.header_text_two}>{props.commentCount}</Text>
              : <ActivityIndicator style={styles.isloading} size="small" color={THEME.SECONDARY.COLOR}/>
          }
        </View>                
      </View>

      <View style={styles.header_container_right}>
        <TouchableNativeFeedback 
          background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,true)}
          onPress={() => props.toggleModal()}
        >
          <View style={styles.header_close}>
            <Ionicons style={styles.close_icon} name="md-options" />
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback 
          background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,true)}
          onPress={() => props.navigateBack()}
        >
          <View style={styles.header_close}>
            <IconMaterialCommunityIcons style={styles.close_icon} name="close" />
          </View>
        </TouchableNativeFeedback>
      </View>      

      { Platform.OS === 'android' ? <BarStatus color={THEME.PRIMARY.COLOR} /> : null }           
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: THEME.PRIMARY.COLOR,
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
    paddingLeft: 15,    
  },
  header_container_right: {
    flexDirection:'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  header_text_one: {
    fontSize: 18,
    color: THEME.SECONDARY.COLOR,
  },
  header_text_two: {
    fontSize: 18,    
    fontWeight: 'bold'
  },
  header_close: {
    width: DIMENSION.MIN_HEADER_HEIGHT, 
		height: DIMENSION.MIN_HEADER_HEIGHT, 
		alignItems: 'center', 
		justifyContent: 'center', 
  },
  close_icon: {
    fontWeight:'bold', 
		fontFamily:'normal', 
		color: THEME.SECONDARY.COLOR, 
		fontSize:25,
  },
  header_commentCount: {
    width: null, 
		height: DIMENSION.MIN_HEADER_HEIGHT, 
		alignItems: 'center', 
    justifyContent: 'center',
    paddingLeft:10,
    paddingRight:10,
  },
  isloading: {
    transform: [{ translateY: 1 }],
  },  
})

export default CommentHeader

