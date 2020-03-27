import React from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Animated,
} from 'react-native'

import {
  TabView,
  TabBar,
  SceneMap,
} from 'react-native-tab-view'

import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import DefaultShow from './DefaultShow'
import VideoList from './VideoList'
import ChatList from './CHAT/ChatList'
import Default from './Default'
import VideoListRefresh from './VideoListRefresh'
import Header from './Header'

import DIMENSION from '../INFO/DIMENSION'
import THEME from '../INFO/THEME'

import {
  setVideoListOrder,
  setVideoListRandom,
} from '../Store/storeData'

import { withNavigation } from 'react-navigation'

const BOTTOM_SHADOW_RAY = 5

class RootTab extends React.Component {

  //Constructor

  constructor(props) {
    super(props)

    const scrollAnim = new Animated.Value(0)
    const offsetAnim = new Animated.Value(0)

    this.state = {
      order: 'date', //this.props.date,
      random: 'false', //this.props.random,

      newVideo: false,
      newTalk: false,

      newVideoSeenOnTabBar: false,
      newTalkSeenOnTabBar: false,

      updateTabBar: false,

      scrollTopVideoList: false,
      scrollTopChatList: false,

      updateVideoList: false,
      updateVideoListToggle: false,

      index: 0,
      indexOLD: 0,
      routes: [
        { key: '0', title: 'VIDEO' },
        { key: '1', title: 'TALK' },
        //{ key: '2', icon: 'show' },
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

    this._scrollAnimVideoList = 0
    this._scrollAnimChatList = 0

    //this.firstRoute = () => ( <VideoListRefresh updateForNewVideo={this.updateForNewVideo} /> )
    this.firstRoute = () => (
      <VideoList
        index = {this.state.index}
        indexOLD = {this.state.indexOLD}
        scrollTopVideoList = {this.state.scrollTopVideoList}
        updateVideoList = {this.state.updateVideoList}
        updateVideoListToggle = {this.state.updateVideoListToggle}

        updateForNewVideo = {this.updateForNewVideo}        
        newVideo = {this.state.newVideo}
        closeNewVideoPopUp = {this.closeNewVideoPopUp}

        order = {this.state.order}
        random = {this.state.random}
        updateVideoListOrder = {this.updateVideoListOrder}

        onScroll={
          Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }],
            {
              useNativeDriver: true,
              listener: event => {
                this._scrollAnimVideoList = event.nativeEvent.contentOffset.y
                // console.log("RootTab :: firstRoute :: this._scrollAnimVideoList :: " + this._scrollAnimVideoList)
                // do something special
              },
            },
          )
        }

        onScrollEndDrag={this._onScrollEndDrag}
        onMomentumScrollBegin={this._onMomentumScrollBegin}
        onMomentumScrollEnd={this._onMomentumScrollEnd}
      />
    )
    this.secondRoute = () => ( <Default /> )
    /*this.secondRoute = () => (
      <ChatList
        index = {this.state.index}
        indexOLD = {this.state.indexOLD}
        scrollTopChatList = {this.state.scrollTopChatList}

        onScroll={
          Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }],
            {
              useNativeDriver: true,
              listener: event => {
                this._scrollAnimChatList = event.nativeEvent.contentOffset.y
                // console.log("RootTab :: firstRoute :: this._scrollAnimChatList :: " + this._scrollAnimChatList)
                // do something special
              },
            },
          )
        }
        
        onScrollEndDrag={this._onScrollEndDrag}
        onMomentumScrollBegin={this._onMomentumScrollBegin}
        onMomentumScrollEnd={this._onMomentumScrollEnd}
      />
    )*/
    //this.thirdRoute = () => ( <DefaultShow /> )   

    this.listenForNewVideo = this._listenForNewVideo.bind(this)
    this.updateForNewVideo = this._updateForNewVideo.bind(this)

    this.closeNewVideoPopUp = this._closeNewVideoPopUp.bind(this)
    this.updateVideoListOrder = this._updateVideoListOrder.bind(this)
  }

  _closeNewVideoPopUp() {
    this.setState({newVideo: false})
  }

  //this is a new video listener
  _listenForNewVideo(videoID) {
    this.index === 0 
      ? this.setState({newVideo: true})
      : this.setState({newVideoSeenOnTabBar: true, updateTabBar: !this.state.updateTabBar})
  }

  _updateVideoListOrder(order, random) {

    //on sauvegarde order & random dans Async Storage
    setVideoListOrder( order ).then(() => {
      setVideoListRandom( random ).then(() => {
        console.log('RootTab :: _updateVideoListOrder :: setVideoListOrder :: order & random successful saved !')          
      })
    })

    this.setState({
      newVideo: false,
      scrollTopVideoList: false,
      updateVideoList: true,
      updateVideoListToggle: !this.state.updateVideoListToggle,
      indexOLD: this.state.index,
      order: order,
      random: random,
    })
  }

  _updateForNewVideo() {
    this.setState({
      newVideo: false,
      scrollTopVideoList: false,
      updateVideoList: true,
      updateVideoListToggle: !this.state.updateVideoListToggle,
      indexOLD: this.state.index 
    })
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
    
    this.state.newVideoSeenOnTabBar
    ? this.setState({ index, indexOLD: this.state.index, newVideoSeenOnTabBar: false, updateTabBar: !this.state.updateTabBar }) 
    : this.state.newTalkSeenOnTabBar
      ? this.setState({ index, indexOLD: this.state.index, newTalkSeenOnTabBar: false, updateTabBar: !this.state.updateTabBar })
      : this.setState({ index, indexOLD: this.state.index })

    //console.log('RootTab :: _handleIndexChange')
    //console.log('RootTab :: index : ' + index )
  }

  _onTabPress = ({ route }) => {
    /*console.log("this.state.scrollAnim : " + JSON.stringify(this.state.scrollAnim))
    console.log("this.state.index : " + this.state.index)
    console.log("route.key : " + route.key)  */ 

    //scroll to top && update VideoList
    if(route.key == 0){ //On vérifie de la plus simple des manières si on a cliqué sur l'onglet VIDEO
      if(this.state.index === 0){ //On vérifie si on à appuyer sur Tab video plus d'une fois (ou une fois si on se trouve au lancement de l'app)
        if( JSON.stringify(this.state.scrollAnim) != 0 || this._scrollAnimVideoList != 0 ){ //videoList n'est pas encore au top
          //scroll to top VideoList
          this.setState({ scrollTopVideoList: true, updateVideoList: false, indexOLD: this.state.index })
          this._scrollAnimVideoList = 0 //initialisation au point zero (tout les indiateurs sont au top)
        }     
        else if( JSON.stringify(this.state.scrollAnim) == 0 || this._scrollAnimVideoList == 0 ){ //videoList est déjà au top
          //update VideoList
          this.setState({ 
            scrollTopVideoList: false, 
            updateVideoList: true, 
            updateVideoListToggle: !this.state.updateVideoListToggle, 
            indexOLD: this.state.index,
            newVideo: false,
          })
        }
      }    
    }  
    else if(route.key == 1){ //On vérifie de la plus simple des manières si on a cliqué sur l'onglet TALK
      if(this.state.index === 1){ //On vérifie si on à appuyer sur Tab TALK plus d'une fois (ou une fois si on se trouve au lancement de l'app)
        if( JSON.stringify(this.state.scrollAnim) != 0 || this._scrollAnimChatList != 0){ //chatList n'est pas encore au top
          //scroll to top ChatList
          this.setState({ scrollTopChatList: true, indexOLD: this.state.index })
          this._scrollAnimChatList = 0 //initialisation au point zero (tout les indiateurs sont au top)
        }                          
      }    
    }      
  }

  /*_renderIcon = ({ route }) => {
    return (route.icon === "show" ?
    <IconFontAwesome style={styles.icon_tv} name="tv" />
    : null)
  }*/

  /*_renderBadge = ({route}) => {
    return (
      route.title === 'VIDEO'
      ? <IconFontAwesome style={styles.icon_tv} name="tv" />
      : route.title === 'TALK'
        ? <IconFontAwesome style={styles.icon_tv} name="tv" />
        : null
    )
  }*/

  _renderLabel = ({route, focused, color}) => {
    return (
      route.title === 'VIDEO' && this.state.newVideoSeenOnTabBar === true && !focused || route.title === 'VIDEO' && this.state.newVideoSeenOnTabBar === true
      ? <Text style={{ color, fontWeight:'bold'}}>{route.title}  ⚫</Text>
      : route.title === 'TALK' && this.state.newTalkSeenOnTabBar === true && !focused || route.title === 'TALK' && this.state.newTalkSeenOnTabBar === true
        ? <Text style={{ color, fontWeight:'bold'}}>{route.title}  ⚫</Text>
        : <Text style={{ color, fontWeight:'bold'}}>{route.title}</Text>
    )
  }

  _renderScene = ({ route }) => {
    switch (route.key) {
      case '0':
        return this.firstRoute()
      case '1':
        return this.secondRoute()
      /*case '2':
        return this.thirdRoute()*/
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
    }).start()         
  }

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
            appNamePolice={this.props.appNamePolice}
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
                //renderIcon={this._renderIcon}
                renderLabel={this._renderLabel}
                //renderBadge={this._renderBadge}
                onTabPress={this._onTabPress}
                indicatorStyle={styles.tabbar_indicator_style}
                style={styles.tabbar_style}
                labelStyle={styles.tabbar_label_style}
                updateTabBar={this.state.updateTabBar}
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