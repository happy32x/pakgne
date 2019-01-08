import React, { Component } from 'react'
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import BarStatus from './BarStatus'
import ParameterViewerContent from './ParameterViewerContent'
import THEME from '../INFO/THEME'

const USER_IMG = '../assets/Pakgne-Poupi-Muriel-Blanche.jpg'
const HEADER_MAX_HEIGHT = 300
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

class ParameterViewer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
      refreshing: false,
    }
    this.onScroll = this._onScroll.bind(this)
  }

  static navigationOptions = {
    header: null
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

    const titleScale = scrollY.interpolate({
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
    })

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
          <Animated.Image
            style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }],
              },
            ]}
            source={require(USER_IMG)}
          />
        </Animated.View>

        <Animated.View
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
        </Animated.View>

        { Platform.OS === 'android' ? <BarStatus color={THEME.STATUS_BAR.DEFAULT_COLOR} /> : null }
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
    resizeMode: 'cover',
  },
  bar: {
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