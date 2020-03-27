import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Easing,
  Animated,
  Platform,
  Keyboard,
  TextInput,
  StyleSheet,
  Dimensions,
  BackHandler,
  PanResponder,
  ImageBackground,
  ActivityIndicator,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from 'react-native'

import firebase from 'firebase'

import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import IconEntypo from 'react-native-vector-icons/Entypo'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'

import DIMENSION from '../../INFO/DIMENSION'
import THEME from '../../INFO/THEME'
import BounceUpAndDownStatic from '../../Animations/BounceUpAndDownStatic'
import BounceUpAndDownVoiceNote from '../../Animations/BounceUpAndDownVoiceNote'

class cameraViewer extends Component {
  _isMounted = false  

  constructor(props) {     
    super(props)
    this.state = {
      
    }            
  }

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    return (
      <View style={styles.main}>          
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {    
    flex: 1,
    backgroundColor: 'black'
  },
})

export default withNavigation(cameraViewer)

