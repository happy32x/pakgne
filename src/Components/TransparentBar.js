import React, { Component } from 'react'
import {
  View,  
  StyleSheet,
} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'
import DIMENSION from '../INFO/DIMENSION'

function TransparentBar(props) {
  return (         
    <View style={styles.tranparentBar}>
      <LinearGradient
        colors={['rgba(0,0,0,0.3)', 'transparent']}
        style={{flex: 1}}      
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tranparentBar: {    
    position: 'absolute',
    width: '100%',  
    height: 3,
    opacity: 1,    
    top: DIMENSION.MAX_HEADER_HEIGHT,
    left: 0,
    right: 0,
  },
})

export default TransparentBar