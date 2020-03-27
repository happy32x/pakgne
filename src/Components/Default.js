import React, { Component } from 'react'
import { 
  View,
  Image,
  StyleSheet
} from 'react-native'

import iconOff from '../assets/iconOff.png'
import VideoListOrder from './VideoListOrder'

class Default extends Component {
  render() {
    return (
      <View style={styles.main_container}>
        <Image 
          source={ iconOff }
          style={styles.img}
        />
        {/*<VideoListOrder />*/}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: { 
    height: 70, 
    width: 70 
  },
})

export default Default