import React, { Component } from 'react'
import { 
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback
} from 'react-native'

import THEME from '../INFO/THEME'

import Icon from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

class Favori extends Component {

  render() {
    return (      
      <TouchableNativeFeedback 
        background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,true)}                            
        onPress={() => this.props.toggleFavorite()}
      >
        <View style={styles.same_element_one}>
          <MaterialCommunityIcons 
            style={[
              styles.same_element_two, 
              { color: this.props.shouldShine ? THEME.PRIMARY.BACKGROUND_COLOR:THEME.TERTIARY.COLOR }
            ]}             
            name={ this.props.shouldShine ? "playlist-check":"playlist-plus" }
          />
          <Text 
            style={[
              styles.same_element, 
              { color: this.props.shouldShine ? THEME.PRIMARY.BACKGROUND_COLOR:THEME.TERTIARY.COLOR }
            ]} 
            numberOfLines={1}
          >
            favori
          </Text>
        </View>        
      </TouchableNativeFeedback>
    )
  }
}

const styles = StyleSheet.create({
  same_element: { 
    fontSize:13, 
  },
  same_element_one: { 
    flex:1, 
    alignItems:'center', 
    justifyContent:'center'
  },
  same_element_two: {     
    fontSize:22
  },
})

export default Favori