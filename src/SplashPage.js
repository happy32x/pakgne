import React from 'react'
import { StatusBar,Image, View } from 'react-native'
import splashscreen from './assets/splashscreen.png'

export default class SplashPage extends React.Component {
  render() {
    return ( 
      <View style={{flex:1}}>   
        <StatusBar hidden={true} />       
        <Image 
           source={splashscreen}
           style={{flex:1, width:null, height: null}}
        />
      </View>
    )
  }
}
