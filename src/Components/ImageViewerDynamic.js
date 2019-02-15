import React, { Component } from 'react'
import {
  View,
  StyleSheet,  
} from 'react-native'

import ImageHeader from './ImageHeader'
import ImageContent from './ImageContent'
import THEME from '../INFO/THEME'

class ImageViewerDynamic extends Component {
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
    const imgURLPreview = navigation.getParam('imgURLPreview', 'NO-DATA')    

    return (
      <View style={styles.main_container}>                
        <ImageHeader title={title} navigateBack={this.navigateBack} />
        <ImageContent imgURLPreview={imgURLPreview} />
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

export default ImageViewerDynamic

