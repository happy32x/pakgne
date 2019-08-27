import React, { Component } from 'react'
import {
  View,
  StyleSheet, 
  Dimensions,
  ImageBackground,
} from 'react-native'

import THEME from '../INFO/THEME'
import firebase from 'firebase'

const USER_IMG_SIZE = Dimensions.get('window').width

class ImageContentSimple extends Component {
  render(){
    return (     
      <View style={styles.main_container}>
        <ImageBackground 
          source={{uri: this.props.imgURLPreview}}
          style={styles.image_background}
        />                        
      </View>
    )
  }  
}

const styles = StyleSheet.create({
  main_container: {    
		flex: 1,
    alignItems: 'center', 
		justifyContent: 'center',		
    marginTop:0,
    backgroundColor: THEME.SECONDARY.COLOR,
    //paddingTop: DIMENSION.MAX_HEADER_HEIGHT,
  },
  image_background: {
    width: '100%',
    height: USER_IMG_SIZE,	
  },
})

export default ImageContentSimple