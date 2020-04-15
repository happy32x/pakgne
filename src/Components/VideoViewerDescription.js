import React from 'react'
import {
  View,
  Text,
  Image,
  Share,
  Switch,
  Platform,
  Animated,
  StatusBar,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableNativeFeedback,
} from 'react-native'

import IconAntDesign from 'react-native-vector-icons/AntDesign'
import Autolink from 'react-native-autolink'
import THEME from '../INFO/THEME'

const VIDEO_HEIGHT = 200
const STATUS_BAR_HEIGHT = StatusBar.currentHeight
const WINDOWS_WIDTH = Dimensions.get("window").width
const WINDOWS_HEIGHT = Dimensions.get("window").height
const END_POINT = WINDOWS_HEIGHT - VIDEO_HEIGHT - STATUS_BAR_HEIGHT
const START_POINT = 0
const TOP = VIDEO_HEIGHT + STATUS_BAR_HEIGHT

class VideoViewerDescription extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      descriptionAnim: new Animated.Value(START_POINT),
    }    
  }

  componentDidMount(){
    Animated.timing(this.state.descriptionAnim, {
      toValue: END_POINT,
      duration: 200,
    }).start()
  }

  render() {
    const animatedStyle = {
      height: this.state.descriptionAnim,
      opacity: this.state.descriptionAnim.interpolate({
        inputRange: [START_POINT, END_POINT],
        outputRange: [0, 1]
      })
    }

    return (
      <Animated.View 
        style={[
          styles.description_container,
          animatedStyle,
        ]}
      >
        <TouchableNativeFeedback 
          background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,false)}                    
          onPress={() => {
            this.props.toggleDescription(false)
          }}
        >
          <View style={styles.title_container}>
            <View style={styles.title_container_text}>
              <Text style={styles.title}>{this.props.video[0].snippet.title}</Text>
              <Text style={styles.same_element}>{this.props.video[1].statistics.viewCount} vues</Text>
            </View>
            <View style={styles.title_container_icon}>                  
              <IconAntDesign style={styles.text} name="caretup" />
            </View>
          </View>
        </TouchableNativeFeedback>

        <ScrollView style={styles.scrollView}>
          <Autolink
            style={styles.description_text}
            text={this.props.video[0].snippet.description}            
            hashtag="instagram"
            mention="twitter"
          />        
        </ScrollView>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({  
  description_container: {
    overflow: 'hidden',
    flexDirection: 'column',
    alignItems:'center',
    justifyContent:'flex-start',
    position: 'absolute',      
    width: WINDOWS_WIDTH,  
    top: TOP,      
    backgroundColor: THEME.PRIMARY.COLOR,
    //backgroundColor: 'red',
  },
  title_container: {
    alignSelf:"stretch",    
    flexDirection: 'row', 
    alignItems: 'flex-start',
    justifyContent:'center',
  },
  title_container_text: {
    flex:1,
    paddingLeft: 15,
    paddingVertical: 7.5,
  },
  title_container_icon: {
    width: 50,
    height: 50,      
    alignItems: 'center',
    justifyContent:'center',
  },
  title: {
    fontSize:17,
  },
  icon: {
    fontSize:12,
  },
  same_element: { 
    fontSize:13, 
    color: THEME.TERTIARY.COLOR
  },
  scrollView: {
    flex: 1,    
  },
  description_text: {
    margin: 15,
    fontSize: 15,
    color: THEME.SECONDARY.WAVE_COLOR
  }
})

export default VideoViewerDescription
