import React from 'react'
import { StyleSheet, View, PanResponder, Dimensions } from 'react-native'

export default class Index extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      topPosition: 0,
      leftPosition: 0,
    }
    
    let {height, width} = Dimensions.get('window')
    this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderMove: (evt, gestureState) => {
            let touches = evt.nativeEvent.touches
            if (touches.length === 1) {
                this.setState({
                  topPosition: touches[0].pageY - height/2,
                  leftPosition: touches[0].pageX - width/2,
                })
            }
        }
    })
  }

  render() {
    return (
      <View style={styles.main_container}>
        <View {...this.panResponder.panHandlers} style={[
            styles.animation_view, 
            { 
                top: this.state.topPosition, 
                left: this.state.leftPosition,
            }
        ]}>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation_view: {
    backgroundColor: 'red',
    width: 100,
    height: 100,
    borderRadius: 50,
  }
})

//N'est pas noLife qui veut, mais qui peut