import React, { Component } from 'react'
import {
  View,
  StyleSheet,  
} from 'react-native'

import CommonHeader from './CommonHeader'
import EmptyDynamic from './EmptyDynamic'
import THEME from '../INFO/THEME'

class ParameterElement extends Component {
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
    const type = navigation.getParam('type', 'NO-DATA') 
    const icon = navigation.getParam('icon', 'NO-DATA') 
    const color = navigation.getParam('color', 'NO-DATA') 
    const message = navigation.getParam('message', 'NO-DATA') 

    return (
      <View style={styles.main_container}>                
        <CommonHeader title={title} navigateBack={this.navigateBack} />
        <EmptyDynamic type={type} icon={icon} color={color} message={message} />      
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

export default ParameterElement

