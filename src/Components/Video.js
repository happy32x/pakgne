import React from 'react'
import {
  TouchableNativeFeedback, 
  TouchableWithoutFeedback, 
  View, 
  Text, 
  Image,
  StyleSheet,
  Share,
} from 'react-native'

import Constants from 'expo'
import Icon from 'react-native-vector-icons/Ionicons'
import Star from './Star'
import timeConverter from '../Helpers/timeConverter'
import likeConverter from '../Helpers/likeConverter'
import MomentConverter from './MomentConverter'
import { getVideoInfoFromApi } from '../API/REQUEST'
import VideoLoader from './VideoLoader'
import { connect } from 'react-redux'

class Video extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      secondData: undefined
    }

    this.fetchData = this._fetchData.bind(this)
    this.toggleFavorite = this._toggleFavorite.bind(this)
  }

  _toggleFavorite() {
    this.props.toggleFavorite(this.props.firstData, this.state.secondData)
  }

  _fetchData(callback) {
    getVideoInfoFromApi(this.props.firstData.id.videoId).then(callback)
  }

  componentDidMount() {
    const favoriteVideoIndex = this.props.isFavorite(this.props.firstData)
    if (favoriteVideoIndex !== -1) {
      this.setState({ 
        isLoading: false,
        secondData: this.props.recoverFavorite(favoriteVideoIndex),
      })
      return
    }

    this.fetchData(responseJson => {
      const secondData = responseJson.items[0]
      this.setState({
        isLoading: false,
        secondData,
      })
    })
  }

  render() {
    if (this.state.isLoading) {
      return (
          <VideoLoader />
      )
    } else {
      return (
        <View  key={this.props.firstData.id.videoId} style={styles.main_container}>

          <View style={styles.top_element_container}>
            <View style={styles.film_logo_container}>
              <Icon style={styles.film_logo} name="md-film" />
            </View>

            <View style={styles.title_video_container}>
              <Text style={styles.title_video}>
                {this.props.firstData.snippet.title}
              </Text>
              <Text style={styles.publish_at_video}>
                <MomentConverter publishAt={this.props.firstData.snippet.publishedAt} />
              </Text>
            </View>

            <View style={styles.star_container}>
              <Star 
                shouldShine={
                  this.props.isFavorite(this.props.firstData) !== -1
                  ? true
                  : false
                } 
                toggleFavorite={this.toggleFavorite}
              />
            </View>
          </View>

          <View style={styles.middle_element_container}>
            <TouchableWithoutFeedback onPress={() => {
              this.props.navigateTo( 'VideoViewer', { video: [this.props.firstData,this.state.secondData] } )
            }}>
              <View style={styles.image_container}>
                <Image 
                  source={{uri: this.props.firstData.snippet.thumbnails.medium.url}}
                  style={styles.image}
                />
                <Text style={styles.duration}>
                  {timeConverter(this.state.secondData.contentDetails.duration)}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.bottom_element_container}>
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#fabe92",true)}>
              <View style={styles.same_element}>
                <View style={styles.same_element}>
                  <Icon style={styles.same_element_one} name="md-heart" />
                </View>
                <View style={styles.same_element_two}>
                  <Text style={styles.same_element_four}>{likeConverter(this.state.secondData.statistics.likeCount)}</Text>
                </View>
              </View>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple("#fabe92",true)}                            
            >
              <View style={styles.same_element}>
                <View style={styles.same_element}>
                  <Icon style={styles.same_element_one} name="md-chatbubbles" />
                </View>
                <View style={styles.same_element_two}>
                  <Text style={styles.same_element_four}>{likeConverter(this.state.secondData.statistics.commentCount)}</Text>
                </View>
              </View>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback 
              background={TouchableNativeFeedback.Ripple("#fabe92",true)}
              onPress={() => {
                Share.share({
                  message: `https://www.youtube.com/watch?v=${this.props.firstData.id.videoId}`,
                  url: `https://www.youtube.com/watch?v=${this.props.firstData.id.videoId}`,
                  title: `${this.props.firstData.snippet.title}`
                }, {
                  dialogTitle: 'Partager cette video',
                  excludedActivityTypes: [
                    'com.apple.UIKit.activity.PostToTwitter'
                  ]
                })
              }}
            >
              <View style={styles.same_element}>
                <View style={styles.same_element}>
                  <Icon style={styles.same_element_one} name="md-share" />
                </View>
                <View style={styles.same_element_two}>
                  <Text style={[styles.same_element_four, { fontSize: 12, paddingBottom:3 }]}>partager</Text>
                </View>
              </View>
            </TouchableNativeFeedback>
          </View>

        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  main_container: { 
    alignSelf:'stretch', 
    marginBottom:10 
  },
  top_element_container: { 
    backgroundColor:"#FFF", 
    alignSelf:'stretch', 
    flexDirection:'row' 
  },
  film_logo_container: { 
    flex: 1, 
    alignItems:'center',
    justifyContent:'center', 
    paddingTop:10, 
    paddingBottom:10, 
    paddingLeft:10
  },
  film_logo: { 
    fontWeight:'bold', 
    fontFamily:'normal', 
    color:"#000", 
    fontSize:25 
  },
  title_video_container: { 
    flex: 10, 
    alignItems:'flex-start', 
    justifyContent:'center', 
    paddingTop:10, 
    paddingBottom:10, 
    paddingLeft:10 
  },
  title_video: { 
    color: '#000', 
    fontSize: 16 
  },
  publish_at_video: { 
    color: '#A7A7A7', 
    fontSize: 14 
  },
  star_container: { 
    flex: 2 
  },
  middle_element_container: { 
    backgroundColor:"#000", 
    height: 200, 
    alignSelf:'stretch' 
  },
  image_container: { 
    flex:1 
  },
  image: { 
    flex: 1, 
    height: null, 
    width: null 
  },
  duration: {
    color:"#FFF",
    position:"absolute",
    backgroundColor:"#000",
    paddingLeft:6,
    paddingRight:6,
    right:10,
    bottom:10,
    opacity:0.8,
    fontSize:13,
  },
  bottom_element_container: { 
    backgroundColor:"#FFF", 
    alignSelf:'stretch', 
    flexDirection:'row', 
    height:45 
  },
  same_element: { 
    flex:1, 
    alignItems:'center', 
    justifyContent:'center', 
    flexDirection:'row'
  },
  same_element_one: { 
    fontWeight:'bold', 
    fontFamily:'normal', 
    color:"#F57F17", 
    fontSize:20 
  },
  same_element_two: { 
    flex:1, 
    alignItems:'center', 
    justifyContent:'flex-start', 
    flexDirection:'row'
  },
  same_element_four: { 
    color: '#A7A7A7', 
    fontSize: 14 
  },
})

const mapStateToProps = (state) => {
  return {
    favoritesVideo: state.toggleFavorite.favoritesVideo
  }
}

export default connect(mapStateToProps)(Video)

