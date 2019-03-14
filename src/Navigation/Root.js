import { createStackNavigator } from 'react-navigation'
import Main from '../Components/Main'
import ArticleViewer from '../Components/ArticleViewer'
import VideoViewer from '../Components/VideoViewer'
import ImageViewer from '../Components/ImageViewer'
import ImageViewerDynamic from '../Components/ImageViewerDynamic'
import CommentList_INTERMEDIARY from '../Components/CommentList_INTERMEDIARY'
import CommentList from '../Components/CommentList'
import CommentListReply from '../Components/CommentListReply'
import CommentList_FUTUR from '../Components/CommentList_FUTUR'
import CommentListReply_FUTUR from '../Components/CommentListReply_FUTUR'
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
      CommentList_INTERMEDIARY: CommentList_INTERMEDIARY,
      CommentList: CommentList,
      CommentListReply: CommentListReply,
      CommentList_FUTUR: CommentList_FUTUR,
      CommentListReply_FUTUR: CommentListReply_FUTUR,
      ArticleViewer: ArticleViewer,
      About: About,
      ParameterElement: ParameterElement,
    },
    {
      initialRouteName: 'Main',
    }
  )

export default Root

