import { createStackNavigator } from 'react-navigation'
import Main from './Main'
import ArticleViewer from './ArticleViewer'
import VideoViewer from './VideoViewer'
import SearchViewer from './SearchViewer'
import ParameterViewer from './ParameterViewer'

const Root = createStackNavigator(
    {
      Main: Main,
      ArticleViewer: ArticleViewer,
      VideoViewer: VideoViewer,
      SearchViewer: SearchViewer,
      ParameterViewer: ParameterViewer
    },
    {
      initialRouteName: 'Main',
    }
  );

export default Root

