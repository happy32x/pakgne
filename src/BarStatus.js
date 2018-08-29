import React from 'react'
import { StatusBar, View } from 'react-native'

export default class BarStatus extends React.Component{
  render() {
    return (
      <View style={{
        position: "absolute",
        top:0,
        left:0,  
        height: StatusBar.currentHeight,
        width: '100%',
        backgroundColor: this.props.color,
      }}/>
    )
  }
}