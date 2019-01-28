import React, { Component } from 'react'
import {
  View,
  StyleSheet, 
  Dimensions,
  ImageBackground,
  ActivityIndicator, 
} from 'react-native'

import { youtubeImageResizer } from '../AI/YoutubeImageResizer'
import THEME from '../INFO/THEME'

const USER_IMG_SIZE = Dimensions.get('window').width

class ImageContent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true
    }

    this.loadEnd = this._loadEnd.bind(this)
  }

  _loadEnd() {
    this.setState({ isLoading: false })
  }

  render(){
    return (     
      <View style={styles.main_container}>
        <ImageBackground 
          source={{ uri: this.props.imgURLPreview }} 
          style={styles.image_background}
        >
          <ImageBackground 
            source={{ uri: youtubeImageResizer(this.props.imgURLPreview, USER_IMG_SIZE) }}
            style={styles.image}
            onLoad={() => this.loadEnd()}
          >
            {
              this.state.isLoading 
                ? <ActivityIndicator style={styles.isloading} size="large" color={THEME.PRIMARY.BACKGROUND_COLOR}/>
                : null
            }
          </ImageBackground> 
        </ImageBackground>                
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
  image: {
    flex: 1,
    alignItems: 'center', 
		justifyContent: 'center',	
  }
})

export default ImageContent