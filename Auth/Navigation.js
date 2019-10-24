// Import the screens
import Login from './Login'
import Loading from './Loading'
import DashBoard from './DashBoard'

// Import the screens
import Main from '../src/Components/Main'
import FavoriteViewer from '../src/Components/FavoriteViewer'
import SearchViewer from '../src/Components/SearchViewer'
import VideoViewer from '../src/Components/VideoViewer'
import ImageViewer from '../src/Components/ImageViewer'
import ImageViewerDynamic from '../src/Components/ImageViewerDynamic'
import CommentList from '../src/Components/CommentList'
import CommentListReply from '../src/Components/CommentListReply'
import ParameterViewer from '../src/Components/ParameterViewer'
import ParameterElement from '../src/Components/ParameterElement'
//import ChatViewer from '../../SandBox/CHAT/ChatViewer'
import About from '../src/Components/About'
import Faq from '../src/Components/Faq'
import Cgu from '../src/Components/Cgu'
import BugReport from '../src/Components/BugReport'
import UserProfile from '../src/Components/UserProfile'

//import firebase from 'firebase'
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
      DashBoard: DashBoard,

      Main: Main,
      FavoriteViewer: FavoriteViewer,
      SearchViewer: SearchViewer,
      VideoViewer: VideoViewer,
      ImageViewer: ImageViewer,
      ImageViewerDynamic: ImageViewerDynamic,
      CommentList: CommentList,
      CommentListReply: CommentListReply,
      ParameterViewer: ParameterViewer,
      ParameterElement: ParameterElement,
      //ChatViewer: ChatViewer,
      About: About,
      Faq: Faq,
      Cgu: Cgu,
      BugReport: BugReport,
      UserProfile: UserProfile,         
    },
    {
      initialRouteName: 'Loading', 
    }
  )

// Prepare root component
const Navigation = createAppContainer(Navigator)

// Export it as the root component
export default Navigation