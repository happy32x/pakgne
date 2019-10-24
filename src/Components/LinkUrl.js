import React, { Component } from 'react'
import {   
  View,
  Text,
  Linking,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native'

import THEME from '../INFO/THEME'

class LinkUrl extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pressed: false
    }
  }

  handlePress = () => {
    Linking.canOpenURL(this.props.url).then(supported => {
      if (supported) {
        Linking.openURL(this.props.url);
      } else {
        console.log("Don't know how to open URL: " + this.props.url);
      }
    })
  }

  render() {
    return (
      <TouchableWithoutFeedback 
        onPress={this.handlePress}        
        onPressIn={() => this.setState({pressed: true})}
        onPressOut={() => this.setState({pressed: false})}
      >
        <View>
          <Text style={[
            styles.link,
            this.state.pressed
              ? {
                  color: '#660099',
                  backgroundColor: THEME.TERTIARY.WAVE_COLOR,                   
                } 
              : {color: '#190dab'} 
          ]}>
            {this.props.text}
          </Text>          
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({ 
  link: {
    fontSize:16, 		    
    marginTop: 20,
    //lineHeight: 27,
    fontStyle: 'italic',
    textDecorationLine: 'underline'
  }
})

export default LinkUrl