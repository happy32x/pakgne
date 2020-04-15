import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'

import DIMENSION from '../INFO/DIMENSION'
import THEME from '../INFO/THEME'

import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

function LockedComment(props) {
  return (         
    <View style={styles.isloading_container}>  
      <IconMaterialCommunityIcons style={styles.icon} name="comment-remove-outline" />
      <Text style={styles.txt}>Les commentaires sont désactivés</Text>      
    </View>
  );
}

const styles = StyleSheet.create({
  isloading_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.PRIMARY.COLOR,
  },
  icon: { 
    fontSize: 70,
    color: THEME.TERTIARY.COLOR,
  },
  txt: {
    color: THEME.TERTIARY.COLOR,
    //transform: [{ translateY: -DIMENSION.STATUSBAR_HEIGHT }],
  },
})

export default LockedComment

