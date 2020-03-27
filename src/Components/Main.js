import React from 'react'
import { 
  View,
  Platform,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from 'react-native'

import BarStatus from './BarStatus'
import RootTab from './RootTab'
import THEME from '../INFO/THEME'

import * as Font from 'expo-font'
import icon from '../assets/icon.png'

import { 
  getVideoListOrder,
  getVideoListRandom,
} from '../Store/storeData'

class Main extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      fontLoaded: false,
      order: 'date',
      random: 'false',
    }
  }

  static navigationOptions = {
    header: null
  }

  async componentDidMount() {
    console.log("Main :: componentDidMount :: OKKKKKKKKKKKKKKKKKKKK")

    await Font.loadAsync({
      'candy': require('../assets/fonts/candy.ttf'),
    });    

    getVideoListOrder().then(order => {
      getVideoListRandom().then(random => {
        this.setState({ 
          fontLoaded: true, 
          order, 
          random,
        })
      })
    })
  }

  render() {
    return (
      this.state.fontLoaded 
      ? <View style={styles.main_container}>
          <RootTab appNamePolice='candy' order={this.state.order} random={this.state.random}/>
          { Platform.OS === 'android' ? <BarStatus color={THEME.STATUS_BAR.DEFAULT_COLOR}/> : null }
        </View>
      : <View style={styles.main_loader}>        
          <ImageBackground 
            resizeMode={"contain"}
            source={icon}
            style={styles.icon}
          />
          <ActivityIndicator size="large" color={THEME.PRIMARY.BACKGROUND_COLOR}/>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: THEME.TERTIARY.SEPARATOR_COLOR,
  },
  main_loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //paddingTop: DIMENSION.STATUSBAR_HEIGHT,
    backgroundColor: '#fCfCfC',
  },
  icon: {
		width: 80,
    height: 80,
    marginBottom: 50,
  },
})

export default Main
