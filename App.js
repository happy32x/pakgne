import React from 'react'
import { 
  View,
  Text,
  Image,
  StatusBar,
  Dimensions,
  StyleSheet, 
} from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import THEME from './src/INFO/THEME'
import AppIntroSlider from 'react-native-app-intro-slider'
import Entry from './Auth/Entry'

import firebase from 'firebase'
import { firebaseConfig } from './Auth/config'

const STATUSBAR_HEIGHT = StatusBar.currentHeight
const IMAGE_SIZE = Dimensions.get('window').width*70/100

const slides = [
  {
    key: 'One',
    title: 'Salut !',
    text: "Bienvenu dans l'application Pakgne",
    image: require('./src/assets/icon_original.png'),
    color: THEME.PRIMARY.COLOR,
    backgroundColor: THEME.PRIMARY.BACKGROUND_COLOR,
    dotStyle:{backgroundColor: 'rgba(0, 0, 0, 1)'}
    
  },
  {
    key: 'Two',
    title: 'Social',
    text: "Vous pourrez y voir toutes les videos de vos stars préférées, dialoguer entre fans et partager vos émotions",
    image: require('./src/assets/Animated-television-clipart-1.png'),
    color: THEME.SECONDARY.WAVE_COLOR,
    backgroundColor: '#ebedff',
  },
  {
    key: 'Three',
    title: 'Fun',
    text: "Et surtout n'oubliez pas de vous amuser :)",
    image: require('./src/assets/Pakgne-Poupi-Muriel-Blanche.jpg'),
    color: THEME.PRIMARY.COLOR,
    backgroundColor: '#febe29',
  }
]

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showRealApp: false
    }

    if(!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }      

  }

  _renderItem = (item) => {
    return (
      <View style={[styles.slide, {backgroundColor:item.backgroundColor}]}>
        <Text style={[styles.title, {color:item.color}]}>{item.title}</Text>
        <Image source={item.image} style={styles.image} />
        <Text style={[styles.text, {color:item.color}]}>{item.text}</Text>
      </View>
    )
  }
  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  };

  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true })
  }

  render() {
    if (this.state.showRealApp) {      
      return <Entry />
    } else {
      return <AppIntroSlider
                renderItem={this._renderItem}
                renderDoneButton={this._renderDoneButton}
                renderNextButton={this._renderNextButton} 
                slides={slides} 
                onDone={this._onDone}                
             />
    }
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: STATUSBAR_HEIGHT,
  },
  image: {
    resizeMode: 'contain',
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
  text: {
    fontSize: 14,
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
    marginBottom: 100,
  },
  title: {
    fontSize: 22,
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 0,
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
