import { createStackNavigator } from 'react-navigation'
import Main from './Main'
import ArticleViewer from './ArticleViewer'
import VideoViewer from './VideoViewer'

const Root = createStackNavigator(
    {
      Main: Main,
      ArticleViewer: ArticleViewer,
      VideoViewer: VideoViewer,
    },
    {
      initialRouteName: 'Main',
    }
  );

export default Root

