import React from 'react'
import {
  TouchableNativeFeedback, 
  View, 
  Text, 
  Image,
  StyleSheet,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import timeConverter from '../Helpers/timeConverter'
import viewConverter from '../Helpers/viewConverter'
import MomentConverter from './MomentConverter'
import { getVideoInfoFromApi } from '../API/REQUEST'
import VideoMiniLoader from './VideoMiniLoader'
import THEME from '../INFO/THEME'

class VideoMini extends React.Component{
  _isMounted = false
  
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      secondData: undefined,
      isLike: false,
    }

    this.fetchData = this._fetchData.bind(this)
  }

  _fetchData(callback) {
    getVideoInfoFromApi(this.props.firstData.id.videoId).then(callback)
  }

  componentDidMount() {
    this._isMounted = true

    this.fetchData(responseJson => {
      if(this._isMounted) {
        const secondData = responseJson.items[0]
        this.setState({
          isLoading: false,
          secondData,
        })
      }      
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (this.state.isLoading) {
      return (
          <VideoMiniLoader />
      )
    } else {
      return (    
        <TouchableNativeFeedback 
          background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,false)}
          onPress={() => {
            this.props.navigateTo( 'VideoViewer', { video: [this.props.firstData,this.state.secondData] } )
          }}
        >
          <View style={styles.related_video_container_one}>
            <View style={styles.related_video_container_two}>
              <View style={styles.main_container}>
                <Image 
                  source={{uri: this.props.firstData.snippet.thumbnails.medium.url}}
                  style={styles.main_container_one}
                  resizeMode={"contain"}
                />                
                <Text style={styles.related_video_duration}>{timeConverter(this.state.secondData.contentDetails.duration)}</Text>
              </View>
              <View style={styles.related_video_title_container}>
                <Text style={styles.related_video_title} numberOfLines={4}>{this.props.firstData.snippet.title}</Text>
                <Text style={styles.related_video_more_info}>
                  {viewConverter(this.state.secondData.statistics.viewCount)} - <MomentConverter publishAt={this.props.firstData.snippet.publishedAt} />
                </Text>
              </View>
            </View>
          </View>
        </TouchableNativeFeedback>
      )
    }
  }
}

const styles = StyleSheet.create({
  main_container: { 
    flex:1,
    backgroundColor: THEME.SECONDARY.COLOR, 
  },
  main_container_one: { 
    flex: 1, 
    height: null, 
    width: null,
  },
  related_video_container_one: { 
    alignSelf:"stretch", 
    paddingLeft:15, 
    paddingRight:15,
    borderBottomWidth: 0,
    borderBottomColor: THEME.ON_LOAD_COLOR,
    backgroundColor: THEME.PRIMARY.COLOR,
  },
  related_video_container_two: { 
    alignSelf:"stretch", 
    height:100, 
    flexDirection:'row', 
    marginTop:10,
    marginBottom:10,
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
    fontSize:16 
  },
  related_video_more_info: { 
    fontSize:13, 
    color: THEME.TERTIARY.COLOR,
    marginTop:1 
  },
})

export default VideoMini

