import React, { Component } from 'react'
import { 
  Animated,
  StyleSheet,
  TouchableWithoutFeedback, 
  StatusBar,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const screenWidth = StatusBar.currentWidth

export default class ButtonScrollTop extends Component {
  constructor(props) {
    super(props);

    this.handlePressIn = this._handlePressIn.bind(this)
    this.handlePressOut = this._handlePressOut.bind(this)

    this.animatedValue = new Animated.Value(1)
    this.positonValue = new Animated.Value(-30)
  }
  
  _handlePressIn() {
    Animated.spring(this.animatedValue, {
      toValue: .5
    }).start()
  }

  _handlePressOut() {
    Animated.spring(this.animatedValue, {
      toValue: 1,
      friction: 3,
      tension: 40
    }).start()
  }

  componentDidUpdate() {
    if( this.props.isButtonScrollTopVisible ) {
      Animated.spring(this.positonValue, {
        toValue: 10,
        speed: 20,
        bounciness: 20,
      }).start()
    } else {
      Animated.spring(this.positonValue, {
        toValue: -30,
        speed: 20,
        bounciness: 20,
      }).start()
    }
  }

  render() {
    const animatedStyle = {
      transform: [{ scale: this.animatedValue}]
    }

    const positionStyle = {
      bottom: this.positonValue
    }

    return (
      <TouchableWithoutFeedback 
        onPress={() => this.props.scrollTop() }
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
      >
        <Animated.View style={[
          styles.button,
          animatedStyle,
          positionStyle,
        ]}>       
          <Icon style={{ color:"#F57F17", fontSize:30 }} name="ios-arrow-dropup-circle" /> 
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    position:"absolute", 
    right:10,
    borderRadius:15,
    width: 30,
    height: 30,
    alignItems:'center', 
    justifyContent:'center',
    opacity: 0.8,
    backgroundColor: "#FFF"
  },
})
