import React from 'react';
import { 
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'

import THEME from '../src/INFO/THEME'
import firebase from 'firebase'

import { StackActions, NavigationActions } from 'react-navigation';

export default class Loading extends React.Component {

  static navigationOptions = {
    header: null
  }

  resetAction = (route) => StackActions.reset({
    index: 0, // <-- currect active route from actions array
    actions: [
      NavigationActions.navigate({ routeName: route }),
    ],
  });

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged( (firebaseUser) => {      
      if(firebaseUser){
        console.log("LE GROS CUL DE TA RACE, FINALEMENT TU SERT A QUOI ? GROS CUON !!!")
        //this.props.navigation.navigate('Main')
        this.props.navigation.dispatch(this.resetAction('Main'))
      } else {        
        console.log("FUCK TON CUL IMBECILE CHIEUR TO GROS CUL")
        this.props.navigation.dispatch(this.resetAction('Login'))
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