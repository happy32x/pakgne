import React, { Component } from 'react'
import {
  View,
  StyleSheet,  
} from 'react-native'

import CommonHeader from './CommonHeader'
import FavoriteList from './FavoriteList'
import THEME from '../INFO/THEME'

class FavoriteViewer extends Component {
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
    return (
      <View style={styles.main_container}>                
        <CommonHeader title='Favorite' navigateBack={this.navigateBack} />
        <FavoriteList />      
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: THEME.TERTIARY.SEPARATOR_COLOR,
  },
})

export default FavoriteViewer

