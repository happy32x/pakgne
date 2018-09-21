import React, { Component } from 'react'
import { View, TouchableNativeFeedback  } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default class Star extends Component {
  constructor(props) {
    super(props)
    this.state = { shine: false }
    this.setStar = this._setStar.bind(this)
  }

  _setStar() {
    this.setState({ shine: !this.state.shine })
  }

  render() {
    return (
      <TouchableNativeFeedback 
        background={TouchableNativeFeedback.Ripple("#fabe92",true)}
        onPress={() => this.setStar()}
      >
        <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
          <Icon 
            style={{ fontWeight:'bold', fontFamily:'normal', color:"#F57F17", fontSize:20 }} 
            name={ this.state.shine ? "md-star":"md-star-outline" }
          />
        </View>
      </TouchableNativeFeedback>
    );
  }
}