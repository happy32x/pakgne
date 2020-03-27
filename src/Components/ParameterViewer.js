import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  Animated,
  Platform,
  Dimensions,
  StyleSheet,  
  ImageBackground,
  TouchableNativeFeedback,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import BarStatus from './BarStatus'
import ParameterHeader from './ParameterHeader'
import ParameterViewerContent from './ParameterViewerContent'
import DIMENSION from '../INFO/DIMENSION'
import THEME from '../INFO/THEME'
import { LinearGradient } from 'expo-linear-gradient'
import { black } from 'ansi-colors'
import firebase from 'firebase'

import { imageResizer } from '../AI/ImageResizer'

const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground)

const USER_IMG = '../assets/Pakgne-Poupi-Muriel-Blanche.jpg'
const HEADER_MAX_HEIGHT = 300
//const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? DIMENSION.MAX_HEADER_HEIGHT : DIMENSION.MAX_HEADER_HEIGHT
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT
const USER_IMG_SIZE = Dimensions.get('window').width

class ParameterViewer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isBannerImageLoading: true,
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
      refreshing: false,
    }
    this.onScroll = this._onScroll.bind(this)
    this.navigateBack = this._navigateBack.bind(this)
  }

  static navigationOptions = {
    header: null
  }

  _navigateBack() {
    this.props.navigation.goBack()
  }

  _renderScrollViewContent() {
    return (
      <ParameterViewerContent headerMaxHeight={HEADER_MAX_HEIGHT}/>
    )
  }

  _onScroll() {
    return (
      Animated.event(
        [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
        { useNativeDriver: true },
      )
    )
  }

  render() {
    // Because of content inset the scroll value will be negative on iOS so bring
    // it back to 0.
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
    )
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    })

    const imageOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    })
    const imageTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    })

    /*const titleScale = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.8],
      extrapolate: 'clamp',
    })
    const titleTranslateY = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, -8],
      extrapolate: 'clamp',
    })
    const titleTranslateX = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, -50],
      extrapolate: 'clamp',
    })*/

    return (
      <View style={styles.fill}>

        <Animated.ScrollView
          style={styles.fill}
          scrollEventThrottle={1}
          onScroll={this.onScroll()}
        >
          {this._renderScrollViewContent()}
        </Animated.ScrollView>      

        <Animated.View
          pointerEvents="none"
          style={[
            styles.header,
            { transform: [{ translateY: headerTranslate }] },
          ]}
        >
          {/*<Animated.Image
            style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }],
              },
            ]}
            source={{uri: firebase.auth().currentUser.photoURL}}
          /> */}
          <AnimatedImageBackground
            style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }],
              },
            ]}
            source={{ uri: this.state.isBannerImageLoading ?firebase.auth().currentUser.photoURL :null }}          
            resizeMode={"contain"}
          >
            <Image
              style={styles.image}
              source={{ uri: imageResizer(firebase.auth().currentUser.photoURL, USER_IMG_SIZE) }}
              onLoad={() => this.setState({ isBannerImageLoading: false })}
              resizeMode={"contain"}
            />                
          </AnimatedImageBackground>
        </Animated.View>

        <Animated.View  
          style={[
            styles.tranparentBar,
            {
              opacity: 1,
              height: 3,
              transform: [{ translateY: headerTranslate }],            
            },
          ]}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0.3)', 'transparent']}
            style={{
              flex: 1
            }}      
          />
        </Animated.View>

        <ParameterHeader title='Parameter' navigateBack={this.navigateBack} />

        {/*<Animated.View
          style={[
            styles.bar,
            {
              transform: [
                { scale: titleScale },
                { translateY: titleTranslateY },
                { translateX: titleTranslateX },
              ],
            },
          ]}
        >
          <View style={styles.arrow_back_container} >
          <TouchableNativeFeedback 
            background={TouchableNativeFeedback.Ripple(THEME.PRIMARY.COLOR,true)}
            onPress={() => this.props.navigation.goBack()}
          > 
            <View style={styles.arrow_back_container_one}>
              <Icon style={styles.arrow_back} name="md-arrow-back" /> 
            </View>              
          </TouchableNativeFeedback>
          </View>

          <View style={styles.fill}>
            <Text style={styles.title}>Paramètres</Text>
          </View>
        </Animated.View>*/}        

      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: THEME.PRIMARY.BACKGROUND_COLOR,
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,    
  },
  image: {
    flex: 1,
    alignItems: 'center', 
		justifyContent: 'center',	
  },
  tranparentBar: {    
    position: 'absolute',
    width: '100%',  
    top: HEADER_MAX_HEIGHT,
    left: 0,
    right: 0,
  },
  /*bar: {
    backgroundColor: 'transparent',
    marginTop: Platform.OS === 'ios' ? 28 : 38,
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },*/
  bar: {
    backgroundColor: '#000000',
    marginTop: Platform.OS === 'ios' ? 28 : 38,
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    color: 'white',
    fontSize: 18,
  },
  arrow_back_container: {
    flex:0.2
  },
  arrow_back_container_one: { 
    width: 60, 
    height: 60,
    backgroundColor:"red",
    alignItems:'center', 
    justifyContent:'center',
    flexDirection:'row', 
  },
  arrow_back: {           
    color: THEME.PRIMARY.COLOR, 
    fontSize:22,                  
  },
})

export default ParameterViewer