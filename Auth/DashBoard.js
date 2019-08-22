import React from 'react'
import {
  View,
  Button,
  StyleSheet,
} from 'react-native'

import firebase from 'firebase'

export default class DashBoard extends React.Component {

  constructor(props){
    super(props)
    //console.log('UID/DashBoard : ' + firebase.auth().currentUser.uid)       
  }

  static navigationOptions = {
    header: null
  }

  render() {          
    return (
      <View style={styles.main_container}> 
        <Button 
          title = 'Sign Out'
          onPress = { () => firebase.auth().signOut() }
        />
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