import React from 'react'
import {
  View, 
  Text, 
  Image,
  Share,
  StyleSheet,
  TouchableNativeFeedback, 
  TouchableWithoutFeedback,   
} from 'react-native'

import Constants from 'expo-constants'
import Icon from 'react-native-vector-icons/Ionicons'
import Star from './Star'
import timeConverter from '../Helpers/timeConverter'
import likeConverter from '../Helpers/likeConverter'
import MomentConverter from './MomentConverter'
import { connect } from 'react-redux'
import THEME from '../INFO/THEME'
import BounceUpAndDownStatic from '../Animations/BounceUpAndDownStatic'

const SCALE = .7
const TENSION = 100

class Favorite extends React.Component{
  
  constructor(props) {
    super(props)
    this.state = {            
      isLike: false,
    }
    
    this.toggleFavorite = this._toggleFavorite.bind(this)
    this.toggleLike = this._toggleLike.bind(this)  
  }

  _toggleLike() {
    this.setState({ isLike: !this.state.isLike })
  }

  _toggleFavorite() {    
    this.props.toggleFavorite(this.props.data[0], this.props.data[1])
  }

  render() {  
      console.log("YAEH")
      return (
        <View style={styles.main_container}>

          <View style={styles.top_element_container}>
            <View style={styles.film_logo_container}>
              <Icon style={styles.film_logo} name="md-film" />
            </View>

            <View style={styles.title_video_container}>
              <Text style={styles.title_video}>
                {this.props.data[0].snippet.title}
              </Text>
              <Text style={styles.publish_at_video}>
                <MomentConverter publishAt={this.props.data[0].snippet.publishedAt} />
              </Text>
            </View>

            <View style={styles.star_container}>
              <Star 
                shouldShine={
                  this.props.isFavorite(this.props.data[0]) !== -1
                  ? true
                  : false
                }  
                toggleFavorite={this.toggleFavorite}
              />
            </View>
          </View>

          <View style={styles.middle_element_container}>
            <TouchableWithoutFeedback onPress={() => {
              this.props.navigateTo( 'VideoViewer', { video: [this.props.data[0],this.props.data[1]] } )
            }}>
              <View style={styles.image_container}>
                <Image 
                  source={{uri: this.props.data[0].snippet.thumbnails.medium.url}}
                  style={styles.image}
                />
                <Text style={styles.duration}>
                  {timeConverter(this.props.data[1].contentDetails.duration)}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.bottom_element_container}>
          
            <BounceUpAndDownStatic 
              scale={SCALE} 
              tension={TENSION} 
              style={styles.same_element}
              onPress={() => { this.toggleLike() }}  
            >
              <View style={styles.same_element}>
                { 
                  this.state.isLike
                    ? <Icon style={styles.same_element_one} name="md-heart" />
                    : <Icon style={styles.same_element_one} name="md-heart-empty" /> 
                }                                               
              </View>
              <View style={styles.same_element_two}>
                { 
                  this.state.isLike
                    ? <Text style={[styles.same_element_four, {color:THEME.PRIMARY.BACKGROUND_COLOR}]}>{likeConverter(this.props.data[1].statistics.likeCount)}</Text>
                    : <Text style={styles.same_element_four}>{likeConverter(this.props.data[1].statistics.likeCount)}</Text>
                }                 
              </View>              
            </BounceUpAndDownStatic>

            <BounceUpAndDownStatic 
              scale={SCALE} 
              tension={TENSION}
              style={styles.same_element}
              onPress={() => {
                this.props.navigateTo( 'CommentList', { videoId: this.props.data[0].id.videoId, commentCount: this.props.data[1].statistics.commentCount } )
              }}     
            >
              <View style={styles.same_element}>
                <Icon style={styles.same_element_one} name="md-chatbubbles" />
              </View>
              <View style={styles.same_element_two}>
                <Text style={styles.same_element_four}>{likeConverter(this.props.data[1].statistics.commentCount)}</Text>
              </View>
            </BounceUpAndDownStatic>

            <BounceUpAndDownStatic
              scale={SCALE} 
              tension={TENSION}
              style={styles.same_element}
              onPress={() => {
                Share.share({
                  message: `https://www.youtube.com/watch?v=${this.props.data[0].id.videoId}`,
                  url: `https://www.youtube.com/watch?v=${this.props.data[0].id.videoId}`,
                  title: `${this.props.data[0].snippet.title}`
                }, {
                  dialogTitle: 'Partager cette video',
                  excludedActivityTypes: [
                    'com.apple.UIKit.activity.PostToTwitter'
                  ]
                })
              }} 
            >
              <View style={styles.same_element}>
                <Icon style={styles.same_element_one} name="md-share-alt" />
              </View>
              <View style={styles.same_element_two}>
                <Text style={[styles.same_element_four, { fontSize: 12, paddingBottom:3 }]}>partager</Text>
              </View>
            </BounceUpAndDownStatic>
          </View>

        </View>
      )
  }
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: THEME.PRIMARY.COLOR,
  },
  main_container: { 
    alignSelf:'stretch', 
    marginBottom:10 
  },
  top_element_container: { 
    backgroundColor: THEME.PRIMARY.COLOR, 
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
    color: THEME.SECONDARY.COLOR, 
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
    color: THEME.SECONDARY.COLOR, 
    fontSize: 16 
  },
  publish_at_video: { 
    color: THEME.TERTIARY.COLOR, 
    fontSize: 14 
  },
  star_container: { 
    flex: 2 
  },
  middle_element_container: { 
    backgroundColor: THEME.SECONDARY.COLOR, 
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
    color: THEME.PRIMARY.COLOR,
    position:"absolute",
    backgroundColor: THEME.SECONDARY.COLOR,
    paddingLeft:6,
    paddingRight:6,
    right:10,
    bottom:10,
    opacity:0.8,
    fontSize:13,
  },
  bottom_element_container: { 
    backgroundColor: THEME.PRIMARY.COLOR, 
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
    color: THEME.PRIMARY.BACKGROUND_COLOR, 
    fontSize:20 
  },
  same_element_two: { 
    flex:1, 
    alignItems:'center', 
    justifyContent:'flex-start', 
    flexDirection:'row'
  },
  same_element_four: { 
    color: THEME.TERTIARY.COLOR, 
    fontSize: 14 
  },
})

const mapStateToProps = (state) => {
  return {
    favoritesVideo: state.toggleFavorite.favoritesVideo
  }
}

export default connect(mapStateToProps)(Favorite)

