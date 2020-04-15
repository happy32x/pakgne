import React from 'react'
import {
  View,
  Text,
  Image,
  Share,
  Switch,
  Platform,
  StatusBar,
  StyleSheet,
  ScrollView,
  Dimensions,
  ToastAndroid,
  TouchableNativeFeedback,
} from 'react-native'

import { connect } from 'react-redux'
import VideoViewerList from './VideoViewerList'
import VideoViewerDescription from './VideoViewerDescription'

import Icon from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import BarStatus from './BarStatus'
import img from '../assets/2.jpg'
import YoutubeView from './YoutubeView'
import RateVideoViewer from './RateVideoViewer'
import likeConverter from '../Helpers/likeConverter'
import THEME from '../INFO/THEME'

const VIDEO_HEIGHT = 200

class VideoViewer extends React.Component{

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this.state = {
      switchValue: false,
      showDescription: false,
    }
    this.toggleFavorite = this._toggleFavorite.bind(this)
    this.isFavorite = this._isFavorite.bind(this)

    this.toggleDescription = this._toggleDescription.bind(this)   
    this.toggleSwitch = this._toggleSwitch.bind(this)   

    this.navigateTo = this._navigateTo.bind(this)
    this.navigateBack = this._navigateBack.bind(this)
  }

  _toggleDescription(value) {
    this.setState({showDescription: value})
  }

  _toggleFavorite() {
    const action = { 
      type: "TOGGLE_FAVORITE", 
      value: [
        this.props.navigation.state.params.video[0],
        this.props.navigation.state.params.video[1]
      ]}
    this.props.dispatch(action)
  }
  _isFavorite() {
    return this.props.favoritesVideo.findIndex(item => item[0].id.videoId === this.props.navigation.state.params.video[0].id.videoId)
  }

  _toggleSwitch(value) {
    value ? ToastAndroid.show('Auto', ToastAndroid.SHORT) : ToastAndroid.show('Annulé', ToastAndroid.SHORT)
    this.setState({switchValue: value})
  }

  _navigateTo(destination, data) {
    this.props.navigation.navigate(destination, data)
  }

  _navigateBack() {
    this.props.navigation.goBack()
  }

  render() {
    const { navigation } = this.props
    const video = navigation.getParam('video', 'NO-DATA')
  
    return (
      <View style={styles.main_container}>
          <View style={styles.video_container}>
            <YoutubeView videoId={video[0].id.videoId} />

            <TouchableNativeFeedback 
              background={TouchableNativeFeedback.Ripple(THEME.SECONDARY.WAVE_COLOR,true)}
              onPress={() => this.navigateBack()}
            > 
              <View style={styles.arrow_back_container}>
                <Icon style={styles.arrow_back} name="md-arrow-back" /> 
              </View>              
            </TouchableNativeFeedback>
          </View>          

          <View style={styles.main_container}>
            <VideoViewerList
              videoId = {video[0].id.videoId}
              video = {video}
              commentCount = {video[1].statistics.commentCount}  
              navigateTo = {this.navigateTo}
              navigateBack = {this.navigateBack}       
              toggleFavorite={this.toggleFavorite}
              isFavorite={this.isFavorite}
              toggleDescription = {this.toggleDescription}
            />
          </View>          

          { this.state.showDescription
          ? <VideoViewerDescription
              video = {video}
              toggleDescription = {this.toggleDescription}
            />
          : null }

          { Platform.OS === 'android' ? <BarStatus color={THEME.SECONDARY.COLOR} /> : null }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: { 
    flex:1,
    backgroundColor: THEME.PRIMARY.COLOR
  },
  main_container_one: { 
    flex: 1, 
    height: null, 
    width: null 
  },
  video_container: {
    alignSelf:'stretch', 
    height: VIDEO_HEIGHT, 
    backgroundColor: THEME.SECONDARY.COLOR,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  }, 
  arrow_back_container: { 
    position:"absolute", 
    top: 0,
    left: 0,
    width: 40, 
    height: 40,
    alignItems:'center', 
    justifyContent:'center', 
    opacity: 0.3
  },
  arrow_back: {           
    fontWeight:'bold', 
    color: THEME.PRIMARY.COLOR, 
    fontSize:20,                  
  },
  bottom_info_container: { 
    alignSelf:"stretch", 
  },
  bottom_info: { 
    alignSelf:"stretch", 
    padding:15 
  },
  title_container: { 
    alignSelf:"stretch" 
  },
  title: { 
    fontSize:17 
  },
  bottom_element: { 
    alignSelf:"stretch", 
    marginTop:15, 
    flexDirection:'row' 
  },
  same_element: { 
    fontSize:12, 
    color: THEME.TERTIARY.COLOR
  },
  like_text: { 
    fontSize:12, 
    color: THEME.PRIMARY.BACKGROUND_COLOR
  },
  like_icon: { 
    color: THEME.PRIMARY.BACKGROUND_COLOR, 
    fontSize:20 
  },
  same_element_one: { 
    flex:1, 
    alignItems:'center', 
    justifyContent:'center'
  },
  same_element_two: { 
    color: THEME.TERTIARY.COLOR, 
    fontSize:20 
  },
  continued_container: { 
    alignSelf:"stretch",
    flexDirection: 'row',
    borderTopWidth: 1, 
    borderColor: THEME.TERTIARY.SEPARATOR_COLOR
  },
  continued_container_one: { 
    flex: 1, 
    padding:15, 
    alignItems:'flex-start',
    justifyContent:'center',
  },
  continued_container_two: { 
    flex: 3,
    padding:15,
    paddingRight:8, 
    alignItems:'flex-end',
    justifyContent:'center',
  },
  continued_container_three: { 
    flex: 1,
    paddingLeft:0,
    paddingRight:15, 
    alignItems:'center',
    justifyContent:'center',
  },
  continued: { 
    fontSize:13, 
    color: THEME.TERTIARY.COLOR 
  },
  related_video_container: { 
    alignSelf:"stretch" 
  },
  related_video_container_one: { 
    alignSelf:"stretch", 
    paddingLeft:15, 
    paddingRight:15 
  },
  related_video_container_two: { 
    alignSelf:"stretch", 
    height:90, 
    flexDirection:'row', 
    marginBottom:15
  },
  related_video_duration: {
    color: THEME.PRIMARY.COLOR, 
    position:"absolute", 
    backgroundColor: THEME.SECONDARY.COLOR,
    paddingLeft:6, 
    paddingRight:6, 
    right:5,
    bottom:5,
    opacity:0.8,
    fontSize:11,
  },
  related_video_title_container: { 
    flex:1, 
    paddingTop:1, 
    paddingBottom:5, 
    paddingLeft:15 
  },
  related_video_title: { 
    fontSize:14 
  },
  related_video_more_info: { 
    fontSize:11, 
    color: THEME.TERTIARY.COLOR,
    marginTop:1 
  },
})

const mapStateToProps = (state) => {
  return {
    favoritesVideo: state.toggleFavorite.favoritesVideo,
    currentUser: state.UserInfoReducer.currentUser,
  }
}

export default connect(mapStateToProps)(VideoViewer)
