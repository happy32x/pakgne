import React, { Component } from 'react'
import { 
  Animated,
  StyleSheet,
  TouchableWithoutFeedback, 
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default class ButtonScrollTop extends Component {
  constructor(props) {
    super(props);

    this.handlePressIn = this._handlePressIn.bind(this)
    this.handlePressOut = this._handlePressOut.bind(this)

    this.animatedValue = new Animated.Value(1)
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

  render() {
    const animatedStyle = {
      transform: [{ scale: this.animatedValue}]
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
    bottom: 10,
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
