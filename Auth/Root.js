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

// Import React Navigation
import { 
  createAppContainer,
  createStackNavigator
} from 'react-navigation'

import firebase from 'firebase'

//console.log('UID/Root : ' + firebase.auth().currentUser.uid)

// Create the navigator
const Navigator = createStackNavigator(
    {
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
    },
    {
      initialRouteName: 'Main',
    }
  )

// Prepare root component
const Root = createAppContainer(Navigator)

// Export it as the root component
export default Root





