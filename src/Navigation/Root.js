import { createStackNavigator } from 'react-navigation'
import Main from '../Components/Main'
import ArticleViewer from '../Components/ArticleViewer'
import VideoViewer from '../Components/VideoViewer'
import SearchViewer from '../Components/SearchViewer'
import ParameterViewer from '../Components/ParameterViewer'

const Root = createStackNavigator(
    {
      Main: Main,
      ArticleViewer: ArticleViewer,
      VideoViewer: VideoViewer,
      SearchViewer: SearchViewer,
      ParameterViewer: ParameterViewer,
    },
    {
      initialRouteName: 'Main',
    }
  )

export default Root

