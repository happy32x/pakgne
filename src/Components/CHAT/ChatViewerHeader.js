import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import BarStatus from '../BarStatus'
import DIMENSION from '../../INFO/DIMENSION'
import THEME from '../../INFO/THEME'
import BounceUpAndDownStatic from '../../Animations/BounceUpAndDownStatic'

const REDVALUE = 40

const DEFAULT_IMG = '../../assets/default_100.jpg'
const DEFAULT_GROUP_IMG = '../../assets/default_group_100.jpg'

import DEFAULT_IMG_LARGE from '../../assets/default.jpg'
import DEFAULT_GROUP_IMG_LARGE from '../../assets/default_group.jpg'

function ChatViewerHeader(props) {
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
      </View>

      <View style={styles.header_container_right}> 
        {/* icône de partage ou option */}   
        
        <View style={styles.title_container}>
          <Text style={styles.title} numberOfLines={1}>{ props.title }</Text>
        </View>
        <View style={styles.comment_container_left}>            
            <BounceUpAndDownStatic 
              scale={.8}
              onPress={() => {
                props.navigateTo('ImageViewer', { 
                  title: props.title,
                  //imgURLPreview: youtubeImageResizer(this.props.data.snippet.topLevelComment.snippet.authorProfileImageUrl, USER_IMG_SIZE) ,                
                  imgURLPreview: props.type === 'group' ? DEFAULT_GROUP_IMG_LARGE : DEFAULT_IMG_LARGE
                })
              }}
            >
              <View style={styles.comment_container_left_img_container}>
                {props.type === 'group'
                  ? <View>
                      <Image
                        style={styles.comment_container_left_img_background}
                        source={require(DEFAULT_GROUP_IMG)}
                      />
                      <Image
                        style={styles.comment_container_left_img}                        
                        source={require(DEFAULT_GROUP_IMG)}
                        //source={{ uri: youtubeImageResizer(this.props.data.snippet.topLevelComment.snippet.authorProfileImageUrl, USER_IMG_SIZE) }}
                      />
                    </View>             
                  : <View>
                      <Image
                        style={styles.comment_container_left_img_background}
                        source={require(DEFAULT_IMG)}
                      />
                      <Image
                        style={styles.comment_container_left_img}
                        source={require(DEFAULT_IMG)}
                        //source={{ uri: youtubeImageResizer(this.props.data.snippet.topLevelComment.snippet.authorProfileImageUrl, USER_IMG_SIZE) }}
                      />
                    </View>
                }                
              </View>
            </BounceUpAndDownStatic>
        </View>          
      </View>      
    
      { Platform.OS === 'android' ? <BarStatus color={THEME.STATUS_BAR.DEFAULT_COLOR} /> : null }
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
    //borderBottomWidth: 1,
    //borderBottomColor: THEME.TERTIARY.SEPARATOR_COLOR,        
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
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 10,
  },
  title_container: {
    flex: 1,
    paddingRight: 10,
  }, 
  title: {
    fontSize: 16,
    fontWeight:'bold',
    color: THEME.PRIMARY.COLOR,
  }, 

  comment_container_left: { 
    alignItems:'center', 
    justifyContent:'flex-end', 
    flexDirection:'row'
  },
  comment_container_left_img_container: {
    width: REDVALUE,
    height: REDVALUE,    
  },
  comment_container_left_img_background: {
    flex: 1, 
    borderRadius: REDVALUE, 
    height: null, 
    width: null 
  },
  comment_container_left_img: {
    position: "absolute",
    borderRadius: REDVALUE, 
    width: REDVALUE,
    height: REDVALUE,
  },
})

export default ChatViewerHeader