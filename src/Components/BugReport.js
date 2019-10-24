import React, { Component } from 'react'
import {
  View,
  StyleSheet,  
} from 'react-native'

import CommonHeader from './CommonHeader'
import BugReportContent from './BugReportContent'
import THEME from '../INFO/THEME'

class BugReport extends Component {
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
        <BugReportContent />
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

export default BugReport

