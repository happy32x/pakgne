import React from 'react'
import { Dimensions } from 'react-native'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view'
import News from './News'
import ListVideo from './ListVideo'
import InfiniteScrollViewNew from '../_SandBox/InfiniteScrollViewNew/InfiniteScrollViewNew';
import ListVideoWell from './ListVideoWell';
import ListVideoFinal from './ListVideoFinal'
import Default from './Default'
import SandBox from './SandBox'

const FirstRoute = () => (
  <SandBox />
)

const SecondRoute = () => (
  <Default />
)

const ThirdRoute = () => (
  <Default />
)

const FourthRoute = () => (
  <Default />
)

export default class SweetTab extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'VIDEOS' },
      { key: 'second', title: 'COMMUN.' },
      { key: 'third', title: 'ASTUCES' },
      { key: 'fourth', title: 'SHOW' },
    ],
  }

  _handleIndexChange = index => this.setState({ index })

  _renderTabBar = props => <TabBar 
    {...props} 
    indicatorStyle={{backgroundColor:'#FFF'}} 
    style={{backgroundColor:'#F57F17'}}
    labelStyle={{fontSize:12, fontWeight:'bold', fontFamily:'normal'}}
  />

  _renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute,
  })

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
        initialLayout={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
      />
    )
  }
}