import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ActivityIndicator,  
  TouchableNativeFeedback
} from 'react-native'

import THEME from '../src/INFO/THEME'
import firebase from 'firebase'
import * as Google from 'expo-google-app-auth'
import * as AppAuth from 'expo-app-auth'
import { connect } from 'react-redux'
import { 
  setAccessToken,
  setRefreshToken,
  setAccessTokenTimeOut,
} from '../src/Store/storeData'

import {
  setAccessTokenRequest,
  setAccessTokenTimeOutRequest,
} from '../src/API/REQUEST' 

import icon from '../src/assets/icon.png'
import GoogleLogo from '../src/assets/google_logo.png'

class Login extends React.Component {

  constructor(props) {
    super(props)    
    this.state = {
      loading: false
    }
    this.accessTokenTimeOut = null
  }

  static navigationOptions = {
    header: null
  }

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  onSignIn = (googleUser) => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged( (firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
              googleUser.idToken,
              googleUser.accessToken,
            );
        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential).then(function(result){
          console.log('user signed in')
          if(result.additionalUserInfo.isNewUser) {   
            console.log('user is new')

            firebase.database().ref('/users/' + result.user.uid).set({
              gmail: result.user.email,
              profile_picture: result.additionalUserInfo.profile.picture, 
              locale: result.additionalUserInfo.profile.locale, 
              first_name: result.additionalUserInfo.profile.given_name, 
              last_name: result.additionalUserInfo.profile.family_name, 
              created_at: Date.now(),
            })
            .then(function(snapshot) {
              //console.log('snapshot', snapshot)
            })

            //on ajoute l'utilisateur dans le chat pakgne
            firebase.database().ref('/members/pakgnegroup/' + result.user.uid).set(true)

            //on ajoute le groupe pakgne dans les groupe de l'utilisateur
            firebase.database().ref('/userChats/' + result.user.uid + '/pakgnegroup/').set(true)

          } else {      
            console.log('user is old')                        
            firebase.database().ref('/users/' + result.user.uid).update({
              last_logged_in: Date.now()              
            })
          }                         
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        })
      } else {
        console.log('User already signed-in Firebase.');        
      }
    })
  }  

  signInWithGoogleAsync = async() => {    
    try {
      console.log("fuck you one time")
      const result = await Google.logInAsync({        
        androidClientId: '52116961312-enaulip52tsh0agv2pp0mo401famog2j.apps.googleusercontent.com',
        //iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: [
          'profile',
          'email',
          'https://www.googleapis.com/auth/youtube',
          'https://www.googleapis.com/auth/youtube.readonly',
          'https://www.googleapis.com/auth/youtube.force-ssl',
        ],
        redirectUrl: `${AppAuth.OAuthRedirect}:/oauth2redirect/google`,

        //A TESTER
        //accessType: 'offline'
        accesstType: 'offline'
      })   

      if (result.type === 'success') { 
        this.accessTokenTimeOut = Math.floor(Date.now() / 1000)         
        console.log("fuck you second time")      

        //We keep user 'access_token', 'refresh_token' & 'access_token_timeout'
        //in AsyncStorage local storage
        setRefreshToken(result.refreshToken).then(() => {
          console.log('Login :: signInWithGoogleAsync :: setRefreshToken :: refreshToken successful saved !')
        })
        setAccessTokenTimeOut( this.accessTokenTimeOut ).then(() => {
          setAccessTokenTimeOutRequest( this.accessTokenTimeOut )
          console.log('Login :: signInWithGoogleAsync :: setAccessTokenTimeOut :: AccessTokenTimeOut successful saved !')
        })
        setAccessToken(result.accessToken).then(() => {
          setAccessTokenRequest(result.accessToken)
          console.log('Login :: signInWithGoogleAsync :: setAccessToken :: accessToken successful saved !')  

          const action = { type: "UPDATE_USER_INFO", value: result }
          this.props.dispatch(action)

          this.onSignIn(result)                     
          return result.accessToken
        })        
      } else {
        this.setState({loading: false}) 
        console.log("ERROR")
        return { cancelled: true }
      }
    } catch (e) {
      this.setState({loading: false}) 
      console.log("CATCH !")
      console.log(e)
      return { error: true }
    }
  }

  render() {
    return (
      <View style={styles.main_container}>        
        <ImageBackground 
          resizeMode={"contain"}
          source={icon}
          style={styles.icon}
        />
        {
          this.state.loading
            ? <ActivityIndicator size="large" color={THEME.PRIMARY.BACKGROUND_COLOR}/>
            : <View style={styles.main}>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,false)}
                  onPress = { () => this.setState( {loading: true}, () => this.signInWithGoogleAsync() ) }                              
                >
                  <View style={styles.google_sign_in_button}>
                    <View style={styles.google_logo_container}>
                      <Image source={GoogleLogo} style={styles.google_logo}/>
                    </View>
                    <View style={styles.google_text_container}>
                      <Text style={styles.google_text}>Sign In With Google</Text>
                    </View>
                  </View>
                </TouchableNativeFeedback>            
              </View>
        }                 
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
    backgroundColor: '#fCfCfC',
  },
  icon: {
		width: 80,
    height: 80,
    marginBottom: 50,
  },
  main: {
    width: 220,
    height: 50,    
    borderRadius: 5,
    elevation: 2,
    overflow:'hidden'
  },
  google_sign_in_button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,        
    backgroundColor: '#FFFFFF',    
  },
  google_logo_container: {    
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#FFF',
  },
  google_logo: {
    resizeMode: 'contain',
    marginHorizontal: 10,
    width: 20,
    height: 20,
  },
  google_text_container: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#FFF',
  },
  google_text: {    
    color: '#7F7F7F',
    fontSize: 16,    
  },
})

const mapStateToProps = (state) => {
  return {
    currentUser: state.UserInfoReducer.currentUser
  }
}

export default connect(mapStateToProps)(Login)