import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,  
} from 'react-native'

import DIMENSION from '../INFO/DIMENSION'
import THEME from '../INFO/THEME'

function VideoViewerList_CommentEmpty(props) {
  return (         
    <View style={styles.isloading_container}>             
      <Text style={styles.isempty}>Aucun commentaire</Text>      
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

export default VideoViewerList_CommentEmpty

