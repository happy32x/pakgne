import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Default from './Default'
import VideoList from './VideoList'

const FirstRoute = () => (
  <VideoList />
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

class RootTab extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'VIDEOS' },
      { key: 'second', title: 'COMMUN.' },
      { key: 'third', title: 'ASTUCES' },
      { key: 'fourth', icon: 'show' },
    ],
  }

  _handleIndexChange = index => this.setState({ index })

  _renderIcon = ({ route }) => {
    return (route.icon === "show" ?
    <IconMaterialIcons style={styles.icon_tv} name="live-tv" />
    : null)
  }

  _renderTabBar = props => <TabBar 
    {...props} 
    renderIcon={this._renderIcon}
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

const styles = StyleSheet.create({
  icon_tv: { 
    fontWeight:'bold', 
    fontFamily:'normal', 
    color:"#FFF", 
    fontSize:25 
  },
})


export default RootTab