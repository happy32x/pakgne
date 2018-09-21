import React, { Component } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import icon from './assets/icon.png'
import iconOff from './assets/iconOff.png'

export default class Default extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image 
            source={ iconOff }
            style={{ height: 70, width: 70 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
  