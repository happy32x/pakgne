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
  _isMounted = false
  
  constructor(props) {
    super(props)
    this.state = {}

    this.toggleFavorite = this._toggleFavorite.bind(this)
  }

  _toggleFavorite() {    
    this.props.toggleFavorite(this.props.data[0], this.props.data[1])
  }

  render() {
   
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

          <View style={styles.bottom_share_container}>
            <BounceUpAndDownStatic
              scale={SCALE} 
              tension={TENSION}
              style={styles.share_main}
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
              <View style={styles.share_button_container}>
                <Icon style={styles.same_element_one} name="md-share-alt" />
                <Text style={[styles.same_element_four, { fontSize: 12, paddingBottom:3, }]}>  PARTAGER</Text> 
              </View>             
            </BounceUpAndDownStatic>
          </View>

        </View>
      )
  }
}

const styles = StyleSheet.create({
  main_container: { 
    alignSelf:'stretch', 
    marginBottom:10,
    backgroundColor: THEME.PRIMARY.COLOR, 
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
  bottom_share_container: { 
    backgroundColor: THEME.PRIMARY.COLOR, 
    alignSelf:'stretch', 
    alignItems:'center', 
    justifyContent:'center',
    flexDirection:'row', 
    height: 45,
    marginLeft: 10,
    marginRight: 10,
    borderTopWidth: 1,
    borderTopColor: THEME.TERTIARY.SEPARATOR_COLOR,
  },
  same_element: { 
    flex:1, 
    alignItems:'center', 
    justifyContent:'center', 
    flexDirection:'row'
  },
  share_main: {     
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
  same_element_four: { 
    color: THEME.TERTIARY.COLOR,
    fontSize: 14,
  },
  share_button_container: {    
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    borderWidth: 0,
    borderColor: THEME.PRIMARY.BACKGROUND_COLOR,
    borderRadius: 5,
    padding: 5,
  },
})

const mapStateToProps = (state) => {
  return {
    favoritesVideo: state.toggleFavorite.favoritesVideo
  }
}

export default connect(mapStateToProps)(Favorite)