import React from 'react';
import { 
  View,
  StyleSheet, 
  ActivityIndicator,
} from 'react-native'

import THEME from '../src/INFO/THEME'
import firebase from 'firebase'

export default class Loading extends React.Component {

  static navigationOptions = {
    header: null
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged( (firebaseUser) => {
      if(firebaseUser){        
        this.props.navigation.navigate('Entry')
      }
      else{        
        this.props.navigation.navigate('Login')
      }
    })
  }

  componentDidMount(){
    this.checkIfLoggedIn()
  }  

  render() {
    return (
      <View style={styles.main_container}> 
        <ActivityIndicator size="large" color={THEME.PRIMARY.BACKGROUND_COLOR}/>
      </View>
    )    
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //paddingTop: DIMENSION.STATUSBAR_HEIGHT,
    backgroundColor: "#FFF", //"#fcfcfc",
  }, 
})