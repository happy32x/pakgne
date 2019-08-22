// Import the screens
import Login from './Login'
import Loading from './Loading'
import Entry from './Entry'
import DashBoard from './DashBoard'

//import * as firebase from 'firebase'
//import { firebaseConfig } from './config'

/*firebase.app().delete().then(function() {
  firebase.initializeApp({})
})*/

//!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()
//!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : null

// Import React Navigation
import { 
  createAppContainer,
  createStackNavigator
} from 'react-navigation'

// Create the navigator
const Navigator = createStackNavigator(
    {
      Login: Login,
      Loading: Loading,
      Entry: Entry,   
      DashBoard: DashBoard,         
    },
    {
      initialRouteName: 'Loading', 
    }
  )

// Prepare root component
const Navigation = createAppContainer(Navigator)

// Export it as the root component
export default Navigation





