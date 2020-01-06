import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,  
} from 'react-native'

import DIMENSION from '../../INFO/DIMENSION'
import THEME from '../../INFO/THEME'

function DiscussionEmpty(props) {
  return (         
    <View style={styles.isloading_container}>             
      <Text style={styles.isempty}>Aucune discussion</Text>      
    </View>
  )
}

const styles = StyleSheet.create({
  isloading_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  isempty: {
    color: THEME.TERTIARY.COLOR,
    transform: [{ translateY: -DIMENSION.STATUSBAR_HEIGHT }],
  },
})

export default DiscussionEmpty

