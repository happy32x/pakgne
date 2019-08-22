import firebase from 'firebase'
import * as Google from 'expo-google-app-auth'
import * as AppAuth from 'expo-app-auth'

class Fire {

  constructor() {
    this.init()
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid
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
          } else {                        
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
        });
      } else {
        console.log('User already signed-in Firebase.');        
      }
    });
  }  

  signInWithGoogleAsync = async() => {    

    console.log("LEGNTTTT : " + firebase.apps.length)
    if (firebase.apps.length) {
      console.log("ENTER : " + firebase.apps.length)
      firebase.app().delete().then(function() {
        firebase.initializeApp({    
          apiKey: "AIzaSyBdpZn6_tBkHvcV9noTIGyIR_9Ot25111E",
          authDomain: "rnpakgneauth.firebaseapp.com",
          databaseURL: "https://rnpakgneauth.firebaseio.com",
          projectId: "rnpakgneauth",
          storageBucket: "",
          messagingSenderId: "52116961312",
          appId: "1:52116961312:web:497ac736f99b4e28"    
        });
      })
    }

    try {
      console.log("fuck you one time")
      const result = await Google.logInAsync({        
        androidClientId: '52116961312-enaulip52tsh0agv2pp0mo401famog2j.apps.googleusercontent.com',
        //iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: [
          'profile',
          'email',
          'https://www.googleapis.com/auth/youtube'
        ],
        redirectUrl: `${AppAuth.OAuthRedirect}:/oauth2redirect/google`
      })

      if (result.type === 'success') {        
        console.log("fuck you second time")  
        this.onSignIn(result)         
        return result.accessToken
      } else {
        console.log("ERROR")
        return { cancelled: true }
      }
    } catch (e) {
      console.log("CATCH !")
      console.log(e)
      return { error: true }
    }
  }

  init = () =>
    firebase.initializeApp({
      apiKey: "AIzaSyBdpZn6_tBkHvcV9noTIGyIR_9Ot25111E",
      authDomain: "rnpakgneauth.firebaseapp.com",
      databaseURL: "https://rnpakgneauth.firebaseio.com",
      projectId: "rnpakgneauth",
      storageBucket: "",
      messagingSenderId: "52116961312",
      appId: "1:52116961312:web:497ac736f99b4e28"
    })
}

Fire.shared = new Fire()
export default Fire