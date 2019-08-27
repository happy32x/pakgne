import React from 'react'
import { 
  View,
  Platform,
  StyleSheet,
} from 'react-native'

import BarStatus from './BarStatus'
import RootTab from './RootTab'
import THEME from '../INFO/THEME'

import firebase from 'firebase'

class Main extends React.Component {

  constructor(props) {
    super(props)            
  }

  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <View style={styles.main_container}>
        <RootTab />
        { Platform.OS === 'android' ? <BarStatus color={THEME.STATUS_BAR.DEFAULT_COLOR}/> : null }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: THEME.TERTIARY.SEPARATOR_COLOR,
  },
})

export default Main
