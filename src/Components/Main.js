import React from 'react'
import { 
  View, 
  Platform,
  StyleSheet,
} from 'react-native'

import BarStatus from './BarStatus'
import RootTab from './RootTab'

class Main extends React.Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <View style={styles.main_container}>
        <RootTab />
        { Platform.OS === 'android' ? <BarStatus color="#e17000"/> : null }
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
