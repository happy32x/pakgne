import React from 'react'
import { 
  View, 
  Platform,
  StyleSheet,
} from 'react-native'

import BarStatus from './BarStatus'
import RootTab from './RootTab'
import THEME from '../INFO/THEME'
import Test from './Test'

class Main extends React.Component {
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
    flex: 1
  },
})

export default Main
