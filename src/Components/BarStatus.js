import React from 'react'
import {
  StatusBar,
  View,
  StyleSheet
} from 'react-native'

class BarStatus extends React.Component {
  render() {
    return (
      <View style={[styles.main_container, {backgroundColor: this.props.color}]}/>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    position: "absolute",
    top:0,
    left:0,  
    height: StatusBar.currentHeight,
    width: '100%',
    zIndex: 2,
  },
})

export default BarStatus