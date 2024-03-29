import React, { Component } from 'react'
import { 
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native'

import THEME from '../INFO/THEME'

class BounceUpAndDownStatic extends Component {
  constructor(props) {
    super(props)

    this.handlePressIn = this._handlePressIn.bind(this)
    this.handlePressOut = this._handlePressOut.bind(this)

    this.animatedValue = new Animated.Value(1)
  }

  _handlePressIn() {    
    Animated.spring(this.animatedValue, {
      toValue: this.props.scale ? this.props.scale : 0.8
    }).start()
  }

  _handlePressOut() {    
    Animated.spring(this.animatedValue, {
      toValue: 1,
      friction: this.props.fiction ? this.props.fiction : 3,
      tension: this.props.tension ? this.props.tension : 40
    }).start()
  }

  render() {
    const animatedStyle = {
      transform: [{ scale: this.animatedValue}]
    }

    return (
      <TouchableWithoutFeedback 
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
        {...this.props}
      >
        <Animated.View style={[this.props.style ,animatedStyle]}>       
          {this.props.children}
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}

export default BounceUpAndDownStatic