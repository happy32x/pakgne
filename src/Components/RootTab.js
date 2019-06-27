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
import Default from './Default'
import Header from './Header'
import DIMENSION from '../INFO/DIMENSION'
import THEME from '../INFO/THEME'
import { withNavigation } from 'react-navigation'

const BOTTOM_SHADOW_RAY = 5

class RootTab extends React.Component {

  //Constructor

  constructor(props) {
    super(props)

    const scrollAnim = new Animated.Value(0);
    const offsetAnim = new Animated.Value(0);

    this.state = {

      scrollTopVideoList: false,
      updateVideoList: false,
      updateVideoListToggle: false,      

      index: 0,
      indexOLD: 0,
      routes: [
        { key: '0', title: 'FEED' },
        { key: '1', title: 'TALK' },
        { key: '2', icon: 'show' },
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

    this.index = 0
    this.navigateTo = this._navigateTo.bind(this)

    this.firstRoute = () => (
      <VideoList 
        index = {this.state.index}
        indexOLD = {this.state.indexOLD}
        scrollTopVideoList = {this.state.scrollTopVideoList}
        updateVideoList = {this.state.updateVideoList}
        updateVideoListToggle = {this.state.updateVideoListToggle}
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
    /*this.secondRoute = () => (
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
    )*/
    this.secondRoute = () => ( <Default /> )
    this.thirdRoute = () => ( <DefaultShow /> )     
  }

  _navigateTo(destination, data) {
    data.id === "search" 
      ? this.props.navigation.navigate(destination, {
          searchId: this.state.index,
        })
      : this.props.navigation.navigate(destination, {
          parameterId: null,
        })
  }

  //Data Persist Handling

  _handleIndexChange = index => {
    this.index = index 
    this.setState({ index, indexOLD: this.state.index })    
    console.log('_handleIndexChange')
    console.log( 'index : ' + index )
  }

  _onTabPress = ({ route }) => { 
    /*console.log("this.state.scrollAnim : " + JSON.stringify(this.state.scrollAnim))
    console.log("this.state.index : " + this.state.index)
    console.log("route.key : " + route.key)  */  
    
    //scroll to top && update VideoList
    if(route.key == 0){ //On vérifie de la plus simple des manières si on a cliqué sur l'onglet VIDEO
      if(this.state.index === 0){ //On vérifie si on à appuyer sur Tab video plus d'une fois (ou une fois si on se trouve au lancement de l'app)
        if( JSON.stringify(this.state.scrollAnim) != 0 ){ //videoList n'est pas encore au top
          //scroll to top VideoList
          this.setState({ scrollTopVideoList: true, updateVideoList: false, indexOLD: this.state.index })
        }     
        if( JSON.stringify(this.state.scrollAnim) == 0 ){ //videoList est déjà au top
          //update VideoList
          this.setState({ scrollTopVideoList: false, updateVideoList: true, updateVideoListToggle: !this.state.updateVideoListToggle, indexOLD: this.state.index })


          
          /* OPTIMISATION POUR EVITER LES MULTIPLES SETSTATE*/

          /*if(this.weCanUpdate) {
            this.weCanUpdate = false
            this.setState({ scrollTopVideoList: false, updateVideoList: true, updateVideoListToggle: !this.state.updateVideoListToggle })
          }*/ 
          //Ensuite on execute une fonction depuis VideoList qui met "this.weCanUpdate" à true
          //Lorsque tout est terminé
          
        }
      }    
    }
  }

  _renderIcon = ({ route }) => {
    return (route.icon === "show" ?
    <IconFontAwesome style={styles.icon_tv} name="tv" />
    : null)
  }

  _renderScene = ({ route }) => {
    switch (route.key) {
      case '0':
        return this.firstRoute()
      case '1':
        return this.secondRoute()
      case '2':
        return this.thirdRoute()
      default:
        return null;
    }
  }

  /*_renderScene() {
    return (
      SceneMap({
        0: this.firstRoute,
        1: this.secondRoute,
        2: this.thirdRoute,
      })
    )
  }*/

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
    this.state.scrollAnim.removeAllListeners()
    this.state.offsetAnim.removeAllListeners()
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
          <Header 
            navigateTo={this.navigateTo}
          />
        </Animated.View>

        <TabView
          navigationState={this.state}
          renderScene={this._renderScene}
          renderTabBar={props => (
            <Animated.View style={[ styles.tabbar_container ,{ transform: [{ translateY: translateY }] }]}>
              <TabBar
                {...props} 
                renderIcon={this._renderIcon}
                onTabPress={this._onTabPress}
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

export default withNavigation(RootTab)