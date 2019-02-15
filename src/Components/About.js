import React, { Component } from 'react'
import {
  View,
  StyleSheet,  
} from 'react-native'

import CommonHeader from './CommonHeader'
import AboutContent from './AboutContent'
import THEME from '../INFO/THEME'

class About extends Component {
  constructor(props) {
    super(props)
    this.navigateBack = this._navigateBack.bind(this)
  }

  static navigationOptions = {
    header: null
  };

  _navigateBack() {
    this.props.navigation.goBack()
  }

  render() {   
    const { navigation } = this.props
    const title = navigation.getParam('title', 'NO-DATA')  

    return (
      <View style={styles.main_container}>                
        <CommonHeader title={title} navigateBack={this.navigateBack} />
        <AboutContent />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: THEME.PRIMARY.COLOR
  },
})

export default About

