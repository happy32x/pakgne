import React, { Component } from 'react'
import { 
  View, 
  Text,
  Image, 
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native'

import iconOff from '../assets/iconOff.png'
import THEME from '../INFO/THEME'

class Empty extends Component {
  render() {
    return (
      <KeyboardAvoidingView style={styles.main_container} behavior="padding" enabled>
        <Image 
          source={ iconOff }
          style={styles.img}
        />
        <Text style={styles.txt}>Aucun résultat</Text>
      </KeyboardAvoidingView>
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
  txt: {  
    color: THEME.TERTIARY.COLOR,
  },
})

export default Empty