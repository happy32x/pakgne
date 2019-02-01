import React from 'react'
import { 
  View,
  Dimensions,
  StyleSheet,
  Animated,
} from 'react-native'

import {
  TabView,
  TabBar,
  SceneMap
} from 'react-native-tab-view'

import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import DefaultShow from './DefaultShow'
import VideoList from './VideoList'
import ArticleList from './ArticleList'
import Header from './Header'
import DIMENSION from '../INFO/DIMENSION'
import THEME from '../INFO/THEME'

const BOTTOM_SHADOW_RAY = 5

class RootTab extends React.Component {

  //Constructor

  constructor(props) {
    super(props)

    const scrollAnim = new Animated.Value(0);
    const offsetAnim = new Animated.Value(0);

    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'VIDEOS' },
        { key: 'second', title: 'ARTICLES' },
        { key: 'third', icon: 'show' },
      ],

      scrollAnim,
      offsetAnim,
      clampedScroll: Animated.diffClamp(
        Animated.add(
          scrollAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: 'clamp',
          }),
          offsetAnim,
        ),
        0,
        DIMENSION.MIN_HEADER_HEIGHT,
      ),
    }

    this.renderScene = this._renderScene.bind(this)

    this.firstRoute = () => (
      <VideoList 
        onScroll = {
          Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }],
            { useNativeDriver: true }
          )
        }
        onScrollEndDrag={this._onScrollEndDrag}
        onMomentumScrollBegin={this._onMomentumScrollBegin}
        onMomentumScrollEnd={this._onMomentumScrollEnd}
      />
    )
    this.secondRoute = () => (
      <ArticleList
        onScroll = {
          Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }],
            { useNativeDriver: true }
          )
        }
        onScrollEndDrag={this._onScrollEndDrag}
        onMomentumScrollBegin={this._onMomentumScrollBegin}
        onMomentumScrollEnd={this._onMomentumScrollEnd}
      />
    )
    this.thirdRoute = () => (<DefaultShow />) 
  }

  //Data Persist Handling

  _handleIndexChange = index => this.setState({ index }, () => console.log("index : " + index))

  _renderIcon = ({ route }) => {
    return (route.icon === "show" ?
    <IconFontAwesome style={styles.icon_tv} name="tv" />
    : null)
  }

  _renderScene() {
    return (
      SceneMap({
        first: this.firstRoute,
        second: this.secondRoute,
        third: this.thirdRoute,
      })
    )
  }

  //Animation

  _clampedScrollValue = 0;
  _offsetValue = 0;
  _scrollValue = 0;

  componentDidMount() {
    this.state.scrollAnim.addListener(({ value }) => {
      const diff = value - this._scrollValue;
      this._scrollValue = value;
      this._clampedScrollValue = Math.min(
        Math.max(this._clampedScrollValue + diff, 0),
        DIMENSION.MIN_HEADER_HEIGHT,
      );
    });
    this.state.offsetAnim.addListener(({ value }) => {
      this._offsetValue = value;
    });
  }

  componentWillUnmount() {
    this.state.scrollAnim.removeAllListeners();
    this.state.offsetAnim.removeAllListeners();
  }

  _onScrollEndDrag = () => {
    this._scrollEndTimer = setTimeout(this._onMomentumScrollEnd, 0);
  };

  _onMomentumScrollBegin = () => {
    clearTimeout(this._scrollEndTimer);
  };

  _onMomentumScrollEnd = () => {
    const toValue = this._scrollValue > DIMENSION.MAX_HEADER_HEIGHT &&
      this._clampedScrollValue > DIMENSION.MIN_HEADER_HEIGHT / 2
      ? this._offsetValue + DIMENSION.MAX_HEADER_HEIGHT
      : this._offsetValue - DIMENSION.MAX_HEADER_HEIGHT;

    Animated.timing(this.state.offsetAnim, {
      toValue,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const { clampedScroll } = this.state;

    const translateY = clampedScroll.interpolate({
      inputRange: [0, DIMENSION.MIN_HEADER_HEIGHT],
      outputRange: [0, -DIMENSION.MIN_HEADER_HEIGHT],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.main_container}>

        <Animated.View style={[ styles.header_container ,{ transform: [{ translateY: translateY }] }]}>
          <Header />
        </Animated.View>

        <TabView
          navigationState={this.state}
          renderScene={this.renderScene()}
          renderTabBar={props => (
            <Animated.View style={[ styles.tabbar_container ,{ transform: [{ translateY: translateY }] }]}>
              <TabBar 
                {...props} 
                renderIcon={this._renderIcon}
                indicatorStyle={styles.tabbar_indicator_style} 
                style={styles.tabbar_style}
                labelStyle={styles.tabbar_label_style}
              />
            </Animated.View>
          )}
          onIndexChange={this._handleIndexChange}
          initialLayout={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }}
        />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  icon_tv: { 
    fontWeight:'bold', 
    fontFamily:'normal', 
    color: THEME.PRIMARY.COLOR, 
    fontSize:26 
  },
  header_container: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: DIMENSION.MAX_HEADER_HEIGHT,
  },
  tabbar_container: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: DIMENSION.TOTAL_HEADER_HEIGHT + BOTTOM_SHADOW_RAY,
  },
  tabbar_label_style: {
    fontSize:14, 
    fontWeight:'bold', 
    fontFamily:'normal'
  },
  tabbar_style: {
    backgroundColor: THEME.PRIMARY.BACKGROUND_COLOR,
    height: DIMENSION.NAVBAR_HEIGHT,
    width: '100%',
    transform: [{ translateY: DIMENSION.MAX_HEADER_HEIGHT}],
    position: 'absolute',
		zIndex: 0,
  },
  tabbar_indicator_style: {
    backgroundColor: THEME.PRIMARY.COLOR
  }
})

export default RootTab