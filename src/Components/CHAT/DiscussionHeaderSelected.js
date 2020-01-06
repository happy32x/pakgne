import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Animated,
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { imageResizer } from '../../AI/ImageResizer'

import Ionicons from 'react-native-vector-icons/Ionicons'
import BarStatus from '../BarStatus'
import DIMENSION from '../../INFO/DIMENSION'
import THEME from '../../INFO/THEME'
import BounceUpAndDownStatic from '../../Animations/BounceUpAndDownStatic'

const REDVALUE = 40
const USER_IMG_SIZE = 100

const DEFAULT_IMG = '../../assets/default_100.jpg'
const DEFAULT_GROUP_IMG = '../../assets/default_group_100.jpg'

import DEFAULT_IMG_LARGE from '../../assets/default.jpg'
import DEFAULT_GROUP_IMG_LARGE from '../../assets/default_group.jpg'

class DiscussionHeaderSelected extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      optionOpacity: new Animated.Value(0)
    }
  }
  
  componentDidUpdate() {
    console.log('UPDATE')
  }

  componentDidMount() { 
    Animated.timing(this.state.optionOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }

  render() {
    return (
      <Animated.View style={[styles.header, { opacity: this.state.optionOpacity }]}>
        <View style={styles.header_container_left}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(THEME.PRIMARY.WAVE_COLOR_PRIMARY,true)}
            onPress={() => this.props.disableSelectedMode()}
          >
            <View style={styles.arrow_back_container}>
              <Ionicons style={styles.arrow_back_icon} name="md-arrow-back" /> 
            </View>
          </TouchableNativeFeedback>                 
        </View>

        <View style={styles.header_container_right}> 
          {
            this.props.multiSelected
            ? null
            : <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple(THEME.PRIMARY.WAVE_COLOR_PRIMARY,true)} 
                onPress={() => this.props.addQuote('Happy Julien', 'Bonjour le France !')}         
              >
                <View style={styles.favorite_container} >
                  <IconMaterialCommunityIcons style={styles.favorite} name="reply" />
                </View>
              </TouchableNativeFeedback>               
          }     
          {
            this.props.multiSelected
            ? null
            : <TouchableNativeFeedback 
                background={TouchableNativeFeedback.Ripple(THEME.PRIMARY.WAVE_COLOR_PRIMARY,true)}
                onPress={() => this.props.copyDiscussion()}     
              >
                <View style={styles.paramater_container}>
                  <IconMaterialCommunityIcons style={styles.paramater} name="content-copy" />
                </View>
              </TouchableNativeFeedback>
          }
          {/*<TouchableNativeFeedback 
            background={TouchableNativeFeedback.Ripple(THEME.PRIMARY.WAVE_COLOR_PRIMARY,true)}        
          >
            <View style={styles.paramater_container}>
              <IconMaterialIcons style={styles.paramater} name="edit" />
            </View>
          </TouchableNativeFeedback>*/}
          {
            this.props.lockDelete      
            ? null
            : <TouchableNativeFeedback 
                background={TouchableNativeFeedback.Ripple(THEME.PRIMARY.WAVE_COLOR_PRIMARY,true)} 
                onPress={() => this.props.deleteDiscussion()}       
              >
                <View style={styles.paramater_container}>
                  <Icon style={styles.paramater} name="md-trash" />
                </View>
              </TouchableNativeFeedback>
          }
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(THEME.PRIMARY.WAVE_COLOR_PRIMARY,true)} 
            onPress={() => this.props.shareDiscussion()}         
          >
            <View style={styles.search_container}>
              <IconMaterialCommunityIcons style={styles.search} name="share" />
            </View>
          </TouchableNativeFeedback>
          {/*<TouchableNativeFeedback 
            background={TouchableNativeFeedback.Ripple(THEME.PRIMARY.WAVE_COLOR_PRIMARY,true)}        
          >
            <View style={styles.paramater_container}>
              <Icon style={styles.paramater} name="md-more" />
            </View>
          </TouchableNativeFeedback>*/}
        </View>      
      
        { Platform.OS === 'android' ? <BarStatus color={THEME.STATUS_BAR.DEFAULT_COLOR} /> : null }
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: THEME.PRIMARY.BACKGROUND_COLOR,
    height: DIMENSION.MAX_HEADER_HEIGHT,
    width: '100%',
    alignItems: 'center', 
		justifyContent: 'center',
		flexDirection:'row',
		paddingTop: DIMENSION.STATUSBAR_HEIGHT,
		marginTop:0,       
  },
  header_container_left: {    
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    //paddingRight: 10,
    //backgroundColor: 'green',
  },
  favorite_container: {
		width: 45, 
		height: DIMENSION.MIN_HEADER_HEIGHT, 
		alignItems: 'center', 
		justifyContent: 'center', 
		flexDirection: 'row',		
	},
	favorite: {
		fontWeight:'bold', 
		fontFamily:'normal', 
		color: THEME.PRIMARY.COLOR, 
		fontSize:25 
	},
	search_container: {
		width: 45, 
		height: DIMENSION.MIN_HEADER_HEIGHT, 
		alignItems: 'center', 
		justifyContent: 'center', 
		flexDirection: 'row'
	},
	search: {
		fontWeight:'bold', 
		fontFamily:'normal', 
		color: THEME.PRIMARY.COLOR, 
		fontSize:25 
	},
	paramater_container: {
		width: 45, 
		height: DIMENSION.MIN_HEADER_HEIGHT, 
		alignItems:'center', 
		justifyContent:'center', 
		flexDirection:'row'
	},
	paramater: {
		fontWeight:'bold', 
		fontFamily:'normal', 
		color: THEME.PRIMARY.COLOR, 
		fontSize:25 
	},
})

export default DiscussionHeaderSelected