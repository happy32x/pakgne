import React, { Component } from 'react'
import { 
  Text,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native'

import THEME from '../INFO/THEME'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

class EmptySearch extends Component {
  render() {
    return (
      <KeyboardAvoidingView style={styles.main_container} behavior="padding" enabled>        
        <IconMaterialCommunityIcons style={styles.icon} name="feature-search-outline" />
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
  icon: { 
    fontSize: 70,
    color: THEME.TERTIARY.COLOR,
  },
  txt: {  
    color: THEME.TERTIARY.COLOR,    
  },
})

export default EmptySearch