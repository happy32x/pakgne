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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Star from './Star'
import timeConverter from '../Helpers/timeConverter'
import likeConverter from '../Helpers/likeConverter'
import MomentConverter from './MomentConverter'
import { connect } from 'react-redux'
import THEME from '../INFO/THEME'
import BounceUpAndDownStatic from '../Animations/BounceUpAndDownStatic'

import uuidv1 from 'uuid/v1'

import {
  getVideoInfoFromApi,
  getVideoRateDataFromApi,
  rateVideoFromApi,
  getNewTokenFromApi,
  exectInProgressNotofier,
} from '../API/REQUEST'

const SCALE = .7
const TENSION = 100

class Video extends React.Component{
  _isMounted = false
  
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isFirstLoading: true,
      secondData: undefined,

      like: false,
      dislike: false,
      none: false,

      rate: 'none',
      isRateGot: false,
    }

    this.preventInfiniteLoop = false
    this.requestId = null
    
    this.rate = 'none'
    this.secondData = null

    this.fetchData = this._fetchData.bind(this)
    this.toggleFavorite = this._toggleFavorite.bind(this)  
    
    this.fetchData_rateVideoFromApi = this._fetchData_rateVideoFromApi.bind(this) 
    this.fetchData_getVideoRateDataFromApi = this._fetchData_getVideoRateDataFromApi.bind(this)   
    this.fetchData_getNewTokenFromApi = this._fetchData_getNewTokenFromApi.bind(this) 
  }

  _fetchData_rateVideoFromApi() {     
    const requestId = this.requestId = uuidv1()

    rateVideoFromApi(this.props.currentUser.accessToken, this.state.rate).then( response => {
      if(this._isMounted && this.requestId === requestId) {                
        console.log("Video :: _fetchData_rateVideoFromApi :: responseJson :: " + JSON.stringify(response))

        if(response.status && response.status === 401) { //Invalid Credentials <> Access Token
          if(!this.preventInfiniteLoop) {
            this.fetchData_getNewTokenFromApi(this.fetchData_rateVideoFromApi)
            this.preventInfiniteLoop = true
          }          
        } else { //Success
          console.log(" AMERICAN DREAM !!! ")

          if(response.status && response.status === 204) { //Success               
            //Evaluer rate pour savoir quoi afficher
            this.state.rate === 'like'
              ? this.setState({ like: true, dislike: false, none: false, isLoading: false, }) //il like la video
              : this.state.rate === 'dislike'
                ? this.setState({ like: false, dislike: true, none: false, isLoading: false, }) //il dislike la video
                : this.state.rate === 'none'
                  ? this.setState({ like: false, dislike: false, none: true, isLoading: false, }) //il annule le rate de la video
                  : null
          } else {
            console.log(" SORCERY !!! ")
          }
        }       
      }                 
    })
  }

  _fetchData_getVideoRateDataFromApi() {     

    getVideoRateDataFromApi(this.props.currentUser.accessToken, this.props.firstData.id.videoId).then( responseJson => {
      if(this._isMounted) {                
        console.log("Video :: _fetchData_getVideoRateDataFromApi :: responseJson :: " + JSON.stringify(responseJson))

        if(responseJson.error && responseJson.error.code === 401) { //Invalid Credentials <> Access Token          
          if(!this.preventInfiniteLoop) {
            this.fetchData_getNewTokenFromApi(this.fetchData_getVideoRateDataFromApi)
            this.preventInfiniteLoop = true
          }  
        } else { //Success
          console.log(" AMERICAN DREAM !!! ")

          if(responseJson.items.length && responseJson.items[0].rating) {
            this.rate = responseJson.items[0].rating
            this.rate === 'like'
              ? this.setState({ like: true, dislike: false, none: false, isRateGot: true, isLoading: false, isFirstLoading: false, secondData: this.secondData }) //le rating de la video est sur like
              : this.rate === 'dislike'
                ? this.setState({ like: false, dislike: true, none: false, isRateGot: true, isLoading: false, isFirstLoading: false, secondData: this.secondData }) //le rating de la video est sur dislike
                : this.rate === 'none'
                  ? this.setState({ like: false, dislike: false, none: true, isRateGot: true, isLoading: false, isFirstLoading: false, secondData: this.secondData }) //le rating de la video est sur none
                  : null
          } else {
            console.log(" SORCERY !!! ")
          }
        } 
      }        
    })
  }

  _fetchData_getNewTokenFromApi(callback) {  

    getNewTokenFromApi(this.props.currentUser.refreshToken).then( responseJson => {
      if(this._isMounted) {                
        console.log("Video :: _fetchData_getNewTokenFromApi :: responseJson :: " + JSON.stringify(responseJson))

        if(responseJson.access_token) { //Success

          //global save
          console.log("Video :: _fetchData_getNewTokenFromApi :: responseJson :: this.props.currentUser.accessToken :: OLD :: " + this.props.currentUser.accessToken)
          const action = { type: "ADD_NEW_ACCESS__ID_TOKEN", value: responseJson }
          this.props.dispatch(action)
          console.log("Video :: _fetchData_getNewTokenFromApi :: responseJson :: this.props.currentUser.accessToken :: NEW :: " + this.props.currentUser.accessToken)
          callback()

          /* new Promise(resolve => {
            callback()
          }).then( exectInProgressNotofier() )          
        } else if (responseJson === 'exect in progress') { //Une execution est en cours
          //Une fois que le accessToken est mis à jour dans redux par le flow en cours, alors on continu notre execution
          //callback()*/

        } else { //Invalid Grant <> Refresh Token
          console.log("Video :: _fetchData_getNewTokenFromApi :: L'obtention du newRefreshToken a échoué !!!")
          //Alors on notifie tous ceux qui nous attendaient
        }
      }        
    })    
  }

  _toggleFavorite() {
    this.props.toggleFavorite(this.props.firstData, this.state.secondData)
  }

  _fetchData(callback) {
    getVideoInfoFromApi(this.props.firstData.id.videoId).then(callback)
  }

  componentDidMount() {
    this._isMounted = true
    const favoriteVideoIndex = this.props.isFavorite(this.props.firstData)

    if (favoriteVideoIndex !== -1) {
      this.secondData = this.props.recoverFavorite(favoriteVideoIndex)
      this.fetchData_getVideoRateDataFromApi()
    }

    this.fetchData(responseJson => {
      if(this._isMounted) {
        this.secondData = responseJson.items[0]
        this.fetchData_getVideoRateDataFromApi()
      }      
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
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
              this.state.isLoading 
                ? console("Video :: render :: Element not load yet")
                : this.props.navigateTo( 'VideoViewer', { video: [this.props.firstData,this.state.secondData] } )              
            }}>
              <View style={styles.image_container}>
                <Image 
                  source={{uri: this.props.firstData.snippet.thumbnails.medium.url}}
                  style={styles.image}
                />
                <Text style={styles.duration}>
                  {
                    this.state.isLoading
                      ? null
                      : timeConverter(this.state.secondData.contentDetails.duration)
                  }
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.bottom_element_container}>     

            <BounceUpAndDownStatic
              scale={SCALE} 
              tension={TENSION} 
              style={[styles.same_element, { opacity: this.state.isLoading ? 0.4 : 1 }]} 
              onPress={() => {                 
                this.state.isLoading
                  ? console("Video :: render :: Element not load yet")
                  : this.state.rate === 'like'
                    ? this.setState({ isLoading: true,  rate: 'none'}, () => this.fetchData_rateVideoFromApi()) 
                    : this.setState({ isLoading: true,  rate: 'like'}, () => this.fetchData_rateVideoFromApi()) 
              }} 
            >
              <View style={styles.same_element}>
                {
                  this.state.like
                    ? <MaterialCommunityIcons style={styles.same_element_one} name="heart" />
                    : <MaterialCommunityIcons style={styles.same_element_one} name="heart-outline" /> 
                }                                  
              </View>              
              <View style={styles.same_element_two}>
                {
                  !this.state.isRateGot
                    ? <Text style={styles.same_element_four}>...</Text>  
                    : this.state.like
                      ? <Text style={[styles.same_element_four, {color:THEME.PRIMARY.BACKGROUND_COLOR}]}>{likeConverter(this.state.secondData.statistics.likeCount+1)}</Text>
                      : <Text style={styles.same_element_four}>{likeConverter(this.state.secondData.statistics.likeCount)}</Text>                    
                }                 
              </View>              
            </BounceUpAndDownStatic>

            <BounceUpAndDownStatic 
              scale={SCALE} 
              tension={TENSION} 
              style={[styles.same_element, { opacity: this.state.isLoading ? 0.4 : 1 }]}
              onPress={() => {                               
                this.state.isLoading 
                  ? console("Video :: render :: Element not load yet")
                  : this.state.rate === 'dislike'
                    ? this.setState({ isLoading: true, rate: 'none' }, () => this.fetchData_rateVideoFromApi()) 
                    : this.setState({ isLoading: true, rate: 'dislike' }, () => this.fetchData_rateVideoFromApi()) 
              }}
            >
              <View style={styles.same_element}>
                {
                  this.state.dislike
                    ? <MaterialCommunityIcons style={styles.same_element_one} name="heart-broken" />
                    : <MaterialCommunityIcons style={styles.same_element_one} name="heart-broken-outline" /> 
                }                                  
              </View>
              <View style={styles.same_element_two}>
                { 
                  !this.state.isRateGot
                    ? <Text style={styles.same_element_four}>...</Text> 
                    : this.state.dislike
                      ? <Text style={[styles.same_element_four, {color:THEME.PRIMARY.BACKGROUND_COLOR}]}>{likeConverter(this.state.secondData.statistics.dislikeCount+1)}</Text>
                      : <Text style={styles.same_element_four}>{likeConverter(this.state.secondData.statistics.dislikeCount)}</Text>                    
                }                 
              </View>              
            </BounceUpAndDownStatic>

            <BounceUpAndDownStatic 
              scale={SCALE} 
              tension={TENSION}
              style={styles.same_element}
              onPress={() => {
                this.state.isFirstLoading
                  ? console("Video :: render :: Element not load yet")
                  : this.props.navigateTo( 'CommentList', { videoId: this.props.firstData.id.videoId, commentCount: this.state.secondData.statistics.commentCount } )
              }}     
            >
              <View style={styles.same_element}>
                <Icon style={styles.same_element_one} name="md-chatbubbles" />
              </View>
              <View style={styles.same_element_two}>
                <Text style={styles.same_element_four}>
                  {
                    this.state.isFirstLoading
                      ? '...'
                      : likeConverter(this.state.secondData.statistics.commentCount)
                  }
                </Text>
              </View>
            </BounceUpAndDownStatic>            
          </View>

          <View style={styles.bottom_share_container}>
            <BounceUpAndDownStatic
              scale={SCALE} 
              tension={TENSION}
              style={styles.share_main}
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
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: THEME.PRIMARY.COLOR,
  },
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
  bottom_element_container: { 
    backgroundColor: THEME.PRIMARY.COLOR, 
    alignSelf:'stretch', 
    flexDirection:'row', 
    height:45,
    marginLeft: 10,
    marginRight: 10,
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
  same_element_two: { 
    flex:1, 
    alignItems:'center',
    justifyContent:'flex-start',
    flexDirection:'row',
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
    favoritesVideo: state.toggleFavorite.favoritesVideo,
    currentUser: state.UserInfoReducer.currentUser,
  }
}

export default connect(mapStateToProps)(Video)

