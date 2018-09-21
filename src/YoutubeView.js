import React, { Component } from 'react' 
import { StyleSheet, View, WebView, Platform } from 'react-native'

export default class YoutubeView extends Component {
  onShouldStartLoadWithRequest = (navigator) => {
    if (navigator.url.indexOf('embed') !== -1
    ) {
        return true;
    } else {
        this.videoPlayer.stopLoading(); //Some reference to your WebView to make it stop loading that URL
        return false;
    }    
  }

  render() {
    return (
        <View style={{ flex:1 }}>
            <WebView
                    ref={(ref) => { this.videoPlayer = ref;}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}      
                    scalesPageToFit={true}               
                    source={{uri: `https://www.youtube.com/embed/${this.props.videoId}?autoplay=1&modestbranding=1&playsinline=1&showinfo=0&rel=0&controls=2` }}
                    onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest} //for iOS
                    onNavigationStateChange ={this.onShouldStartLoadWithRequest} //for Android
            />
        </View>
    )
  }
}
