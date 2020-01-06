import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'

import DIMENSION from '../../INFO/DIMENSION'
import THEME from '../../INFO/THEME'

function DiscussionLoading(props) {
  return (         
    <View style={styles.isloading_container}>             
      <ActivityIndicator style={styles.isloading} size="large" color={props.color}/>        
    </View>
  );
}

const styles = StyleSheet.create({
  isloading_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  isloading: {
    transform: [{ translateY: -DIMENSION.STATUSBAR_HEIGHT }],
  },
})

export default DiscussionLoading

