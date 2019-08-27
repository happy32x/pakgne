import React from 'react'
import {
  Platform,
  Text,
  View,
  Image,  
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native'

import THEME from '../INFO/THEME'
import firebase from 'firebase'

const YOUTUBE_LOGO_ON = '../assets/app_icons_youtube_on.png' 
const YOUTUBE_LOGO_OFF = '../assets/app_icons_youtube_off.png' 

class YoutubeSubscribeButton extends React.Component{

  constructor(props) {
    super(props)
    this.state = {      
      subscribe: false,
    }
  }

  render() {
    return (
    
      this.state.subscribe
                                                                                                                      
      ? <TouchableNativeFeedback 
          background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,false)}
          onPress={() => {this.setState({subscribe: !this.state.subscribe})}}
        >
          <View style={styles.subscribe_button_container}>
            <Image
              style={styles.subscribe_button_image}
              source={require(YOUTUBE_LOGO_OFF)}
            />  
            <Text style={[styles.subscribe_button_text, {color:THEME.SECONDARY.WAVE_COLOR}]}>  DEJA ABONNE A PAKGNE</Text>
          </View>  
        </TouchableNativeFeedback>             

      : <TouchableNativeFeedback 
          background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,false)}
          onPress={() => {this.setState({subscribe: !this.state.subscribe})}}
        >
          <View style={styles.subscribe_button_container}>
            <Image
              style={styles.subscribe_button_image}
              source={require(YOUTUBE_LOGO_ON)}
            />  
            <Text style={[styles.subscribe_button_text, {color:'red'}]}>  ABONNEZ-VOUS A PAKGNE</Text>
          </View>
        </TouchableNativeFeedback>           
    )
  }
}

const styles = StyleSheet.create({
  subscribe_button_container: {
    alignItems:'center',
    justifyContent:'center',   
    flexDirection:'row',
    paddingTop: 25,
    paddingBottom: 25,
  },
  subscribe_button_image: {
    width: 30,
    height: 30,
  },
  subscribe_button_text: {
    fontWeight: 'bold',
    fontSize:15,
  }
})

export default YoutubeSubscribeButton