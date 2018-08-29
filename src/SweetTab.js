import React from 'react'
import { Dimensions } from 'react-native'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view'
import News from './News'
import Default from './Default'

const FirstRoute = () => (
  <News />
);

const SecondRoute = () => (
  <Default />
);

const ThirdRoute = () => (
  <Default />
);

export default class SweetTab extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'NEWS' },
      { key: 'second', title: 'VIDEOS' },
      { key: 'third', title: 'ARTICLES' },
    ],
  }

  _handleIndexChange = index => this.setState({ index })

  _renderTabBar = props => <TabBar 
    {...props} 
    indicatorStyle={{backgroundColor:'#FFF'}} 
    style={{backgroundColor:'#F57F17'}}
    labelStyle={{fontWeight:'bold', fontFamily:'normal'}}
  />

  _renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
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