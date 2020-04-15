import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,  
} from 'react-native'

import DIMENSION from '../INFO/DIMENSION'
import THEME from '../INFO/THEME'

function VideoViewerList_CommentLocked(props) {
  return (         
    <View style={styles.isloading_container}>             
      <Text style={styles.isempty}>Les commentaires sont désactivés</Text>      
    </View>
  );
}

const styles = StyleSheet.create({
  isloading_container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.PRIMARY.COLOR,    
  },
  isempty: {
    color: THEME.TERTIARY.COLOR,
    //transform: [{ translateY: -DIMENSION.STATUSBAR_HEIGHT }],
  },
})

export default VideoViewerList_CommentLocked

