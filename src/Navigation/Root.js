// Import the screens
import Main from '../Components/Main'
import FavoriteViewer from '../Components/FavoriteViewer'
import SearchViewer from '../Components/SearchViewer'
import VideoViewer from '../Components/VideoViewer'
import ImageViewer from '../Components/ImageViewer'
import ImageViewerDynamic from '../Components/ImageViewerDynamic'
import CommentList from '../Components/CommentList'
import CommentListReply from '../Components/CommentListReply'
import ParameterViewer from '../Components/ParameterViewer'
import ParameterElement from '../Components/ParameterElement'
//import ChatViewer from '../../SandBox/CHAT/ChatViewer'
import About from '../Components/About'

// Import React Navigation
import { 
  createAppContainer,
  createStackNavigator
} from 'react-navigation'

import Fire from '../../Auth/Fire'
//console.log('UID/Root : ' + Fire.shared.uid)

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





