import React, { Component } from 'react'
import { 
  Animated,
  StyleSheet,
  TouchableWithoutFeedback, 
} from 'react-native'

const topPosition = 10
const bottomPosition = -40

class ButtonScrollTop extends Component {
  constructor(props) {
    super(props)

    this.handlePressIn = this._handlePressIn.bind(this)
    this.handlePressOut = this._handlePressOut.bind(this)

    this.animatedValue = new Animated.Value(1)
    this.positonValue = new Animated.Value(bottomPosition)
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
        toValue: topPosition,
        speed: 20,
        bounciness: 20,
      }).start()
    } else {
      Animated.spring(this.positonValue, {
        toValue: bottomPosition,
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
          {this.props.children}
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    position:"absolute", 
    right:10,
    bottom:10,
  },
})

export default ButtonScrollTop