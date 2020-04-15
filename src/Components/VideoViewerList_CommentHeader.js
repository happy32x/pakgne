import React, { Component } from 'react'
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableNativeFeedback,
} from 'react-native'

import likeConverter from '../Helpers/likeConverter'
import Ionicons from 'react-native-vector-icons/Ionicons'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import DIMENSION from '../INFO/DIMENSION'
import THEME from '../INFO/THEME'

class VideoViewerList_CommentHeader extends Component {
  constructor(props) {
    super(props)
  }

  render() { 
    return ( 
      <View 
        style={styles.header} 
        ref={(lv) => this._scroll = lv}
      >

        <View style={styles.header_container_left}>
          <Text style={styles.header_text_one} >Commentaires </Text>

          <View style={styles.header_commentCount}>  
            {
              !this.props.isLoading 
                ? <Text style={styles.header_text_two}>{likeConverter(this.props.commentCount)}</Text>
                : <ActivityIndicator style={styles.isloading} size="small" color={THEME.SECONDARY.COLOR}/>
            }
          </View>                
        </View>

        <View style={styles.header_container_right}>
          <TouchableNativeFeedback 
            background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,true)}
            onPress={() => this.props.setModalPosition( this._scroll )}
          >
            <View style={styles.header_close}>
              <Ionicons style={styles.close_icon} name="md-options" />
            </View>
          </TouchableNativeFeedback>
        </View>   

      </View>           
    )
  }
}

const styles = StyleSheet.create({
  header: {
    borderTopWidth: 1,
    borderTopColor: THEME.ON_LOAD_COLOR,
    backgroundColor: THEME.PRIMARY.COLOR,
		height: DIMENSION.MIN_HEADER_HEIGHT,
    width: '100%',
    alignItems: 'center',
		justifyContent: 'center',
		flexDirection:'row',
    marginTop:0,        
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

export default VideoViewerList_CommentHeader

