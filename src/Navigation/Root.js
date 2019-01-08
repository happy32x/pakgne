import { createStackNavigator } from 'react-navigation'
import Main from '../Components/Main'
import ArticleViewer from '../Components/ArticleViewer'
import VideoViewer from '../Components/VideoViewer'
import CommentList from '../Components/CommentList'
import CommentListReply from '../Components/CommentListReply'
import SearchViewer from '../Components/SearchViewer'
import ParameterViewer from '../Components/ParameterViewer'

const Root = createStackNavigator(
    {
      Main: Main,
      SearchViewer: SearchViewer,
      ParameterViewer: ParameterViewer,
      VideoViewer: VideoViewer,
      CommentList: CommentList,
      CommentListReply: CommentListReply,
      ArticleViewer: ArticleViewer,
    },
    {
      initialRouteName: 'Main',
    }
  )

export default Root

