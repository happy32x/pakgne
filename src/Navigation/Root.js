import { createStackNavigator } from 'react-navigation'
import Main from '../Components/Main'
import ArticleViewer from '../Components/ArticleViewer'
import VideoViewer from '../Components/VideoViewer'
import ImageViewer from '../Components/ImageViewer'
import ImageViewerDynamic from '../Components/ImageViewerDynamic'
import CommentList from '../Components/CommentList'
import CommentListReply from '../Components/CommentListReply'
import SearchViewer from '../Components/SearchViewer'
import ParameterViewer from '../Components/ParameterViewer'
import About from '../Components/About'
import ParameterElement from '../Components/ParameterElement'

const Root = createStackNavigator(
    {
      Main: Main,
      SearchViewer: SearchViewer,
      ParameterViewer: ParameterViewer,
      VideoViewer: VideoViewer,
      ImageViewer: ImageViewer,
      ImageViewerDynamic: ImageViewerDynamic,
      CommentList: CommentList,
      CommentListReply: CommentListReply,
      ArticleViewer: ArticleViewer,
      About: About,
      ParameterElement: ParameterElement,
    },
    {
      initialRouteName: 'Main',
    }
  )

export default Root

