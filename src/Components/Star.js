import React, { Component } from 'react'
import { 
  View,
  StyleSheet, 
  TouchableNativeFeedback  
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

class Star extends Component {

  render() {
    return (
      <TouchableNativeFeedback 
        background={TouchableNativeFeedback.Ripple("#fabe92",true)}
        onPress={() => this.props.toggleFavorite()}
      >
        <View style={styles.button_container}>
          <Icon 
            style={styles.button} 
            name={ this.props.shouldShine ? "md-star":"md-star-outline" }
          />
        </View>
      </TouchableNativeFeedback>
    )
  }
}

const styles = StyleSheet.create({
  button_container: {
    flex: 1, 
    alignItems:'center', 
    justifyContent:'center'
  },
  button: { 
    fontWeight:'bold', 
    fontFamily:'normal', 
    color:"#F57F17", 
    fontSize:20 
  }
})


export default Star