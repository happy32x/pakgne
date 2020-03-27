import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableNativeFeedback,
} from 'react-native'

import firebase from 'firebase'

import Ionicons from 'react-native-vector-icons/Ionicons'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import DIMENSION from '../INFO/DIMENSION'
import THEME from '../INFO/THEME'
import BounceUpAndDownStatic from '../Animations/BounceUpAndDownStatic'
import { withNavigation } from 'react-navigation'

const REDVALUE = 50-10
const USER_IMG_SIZE = 100
const DEFAULT_IMG = '../assets/default_100.jpg'

class CommentPost extends Component {
  constructor(props) {
    super(props)
  }

  render() { 
    return (     
      <View style={[styles.comment_container, {/*marginTop: 0*/} ]}>    

        <View style={styles.comment_container_left}>
          <BounceUpAndDownStatic
            scale={.8}
            onPress={() => {
              this.props.navigation.navigate('ImageViewerDynamic', { 
                title: firebase.auth().currentUser.displayName,
                imgURLPreview: firebase.auth().currentUser.photoURL,                
              })
            }}
          >
            <View style={styles.comment_container_left_img_container}>  
              <Image
                style={styles.comment_container_left_img}
                defaultSource={require(DEFAULT_IMG)}
                source={{ uri: firebase.auth().currentUser.photoURL }}
              />
            </View>
          </BounceUpAndDownStatic>
        </View>

        <View style={styles.comment_container_right}>
          <BounceUpAndDownStatic
            scale={.9}                 
            style={[styles.comment_area, {                   
              width: '100%',
              borderWidth: 1,
              borderRadius: REDVALUE,
              borderColor: THEME.TERTIARY.WAVE_COLOR
            }]}
            onPress={() => {
              this.props.toggleModalCommentPostYoutube_VISIBLE()
            }}
          >
            <Text numberOfLines={1} style={{                              
              fontWeight: 'normal',
              fontSize: 16,
              color: THEME.TERTIARY.WAVE_COLOR,
              marginTop: -2                  
            }}>
              laisser un commentaire ...
            </Text>                        
          </BounceUpAndDownStatic>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  comment_container: {    
    width: '100%',
    height: DIMENSION.MIN_HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: THEME.ON_LOAD_COLOR,      
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    marginBottom: 15,    
  },
  comment_container_left: {
    width: REDVALUE,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  comment_container_right: {
    flex: 1,
    alignItems: 'flex-start', 
    justifyContent: 'center',
    marginLeft: 10,
  },

  comment_area: {
    width: null,
    height: null,
    borderRadius: 10,
    backgroundColor: THEME.TERTIARY.SEPARATOR_COLOR,
    padding: 10,
    alignItems: 'flex-start', 
    justifyContent: 'center',
  },
})

export default withNavigation(CommentPost)

