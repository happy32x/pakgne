import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native'

import * as Font from 'expo-font'
import { LinearGradient } from 'expo-linear-gradient'

import DIMENSION from '../INFO/DIMENSION'
import BounceUpAndDownStatic from '../Animations/BounceUpAndDownStatic'
import HeaderContentIndicator from './HeaderContentIndicator'

import tv from '../assets/Animated-television-clipart-1_transparent.png'
import display from '../assets/tv_bad_signal.gif'


//WINDOWS SIZE

const WINDOW_H = Dimensions.get('window').height
const WINDOW_W = Dimensions.get('window').width
const DIVIDER = 2

//CANVAS SIZE

const CANVAS_H = 120
const CANVAS_W = 120

//CANVAS ADJUST POSITION

const ADJUST_CANVAS_POSITION_Y = 50
const ADJUST_CANVAS_POSITION_X = 0

//CANVAS POSITION

const CANVAS_POSITION_Y = ( WINDOW_H/DIVIDER - CANVAS_H/DIVIDER ) + ADJUST_CANVAS_POSITION_Y
const CANVAS_POSITION_X = ( WINDOW_W/DIVIDER - CANVAS_W/DIVIDER ) + ADJUST_CANVAS_POSITION_X


//========================================================


//ELEMENT RATIO

const RATIO_TV_H = 0              //par rapport a canvas
const RATIO_TV_W = 0              //par rapport a canvas
const RATIO_DISPLAY_H = -60       //par rapport a tv
const RATIO_DISPLAY_W = -30       //par rapport a tv

//ELEMENT SIZE

const TV_SIZE_H = CANVAS_H + RATIO_TV_H
const TV_SIZE_W = CANVAS_W + RATIO_TV_W
const DISPLAY_SIZE_H = TV_SIZE_H + RATIO_DISPLAY_H
const DISPLAY_SIZE_W = TV_SIZE_W + RATIO_DISPLAY_W 

//ELEMENT ADJUST POSITION

const ADJUST_TV_POSITION_Y = 0
const ADJUST_TV_POSITION_X = 0+5
const ADJUST_DISPLAY_POSITION_Y = 18
const ADJUST_DISPLAY_POSITION_X = 0+5

//ELEMEN POSITION

const TV_POSITION_Y = ( CANVAS_H/DIVIDER - TV_SIZE_H/DIVIDER ) + ADJUST_TV_POSITION_Y
const TV_POSITION_X = ( CANVAS_W/DIVIDER - TV_SIZE_W/DIVIDER ) + ADJUST_TV_POSITION_X
const DISPLAY_POSITION_Y = ( CANVAS_H/DIVIDER - DISPLAY_SIZE_H/DIVIDER ) + ADJUST_DISPLAY_POSITION_Y
const DISPLAY_POSITION_X = ( CANVAS_W/DIVIDER - DISPLAY_SIZE_W/DIVIDER ) + ADJUST_DISPLAY_POSITION_X

class DefaultShow extends Component {

  constructor(props) {
    super(props)
    this.state = {
      fontLoaded: false
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'candy': require('../assets/fonts/candy.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <View style={styles.main_container}>
        
        <HeaderContentIndicator type="MaterialIcons" icon="live-tv" color="#3e3e3e" backgroundColor="transparent" />
        <View style={{ flex: 1, paddingTop: 20,  paddingBottom: 20 }}>
          {
            this.state.fontLoaded
              ? <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Text style={{ fontFamily: 'candy', fontSize: 40, color: '#3e3e3e', textAlign: 'center' }}>Pakgne : La Télé Réalité ...</Text>
                  <Text style={{ fontFamily: 'candy', fontSize: 56, color: '#4a4a4a', textAlign: 'center' }}>Bientôt</Text>
                </View>
                : <Text style={styles.loading_candice_police}>Loading candice police ... </Text>
          }
        </View>        

        <LinearGradient
          colors={['rgba(0,0,0,0.5)', 'transparent']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: WINDOW_H,
            width: 5
          }}
          start={[0, 0]} 
          end={[1, 0]}
        />

        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 300,
          }}
        />
        
        <BounceUpAndDownStatic style={ styles.canvas } scale={.6}>
          <Image source={ display } style={ styles.display } /> 
          <Image source={ tv } style={ styles.tv }/>
        </BounceUpAndDownStatic>

      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#343434',
    paddingTop: DIMENSION.MEDIUM_HEADER_HEIGHT,
  },
  borderShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: WINDOW_H,
    width: 10,
    opacity: 1
  },
  canvas: { 
    position: 'absolute',
    height: CANVAS_H, 
    width: CANVAS_W,
    top: CANVAS_POSITION_Y,
    left: CANVAS_POSITION_X,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  tv: { 
    position: 'absolute',
    height: TV_SIZE_H, 
    width: TV_SIZE_W, 
    resizeMode: 'cover',
    top: TV_POSITION_Y,
    left: TV_POSITION_X,
  },
  display: { 
    position: 'absolute',
    height: DISPLAY_SIZE_H, 
    width: DISPLAY_SIZE_W, 
    resizeMode: 'cover',
    top: DISPLAY_POSITION_Y,
    left: DISPLAY_POSITION_X,
  },
  loading_candice_police: { 
    fontSize: 30, 
    fontWeight: 'bold', 
    color: '#3e3e3e', 
    textAlign: 'center',
  }, 
})

export default DefaultShow