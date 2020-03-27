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

import ViewMoreText from 'react-native-view-more-text'
import Autolink from 'react-native-autolink'

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

import firebase from 'firebase'
import uuidv1 from 'uuid/v1'

import {  
  getVideoInfoFromApi,
  getNewTokenFromApi_Filter,

  getVideoRateDataFromApi,
  rateVideoFromApi,    
} from '../API/REQUEST'

import { 
  getAccessToken,
} from '../Store/storeData'

import { imageResizer } from '../AI/ImageResizer'

const SCALE = .7
const TENSION = 100

const REDVALUE = 50-10
const USER_IMG_SIZE = 100
const DEFAULT_IMG = '../assets/default_100.jpg'

class Video extends React.Component{
  _isMounted = false
  
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,      
      secondData: undefined,

      like: false,
      dislike: false,
      none: false,

      rate: 'none',
      isRateGot: false,      
    }

    this.requestId = null
    this.accessToken = null

    this.rate = 'none'
    this.secondData = undefined

    this.toggleFavorite = this._toggleFavorite.bind(this)  

    this.updateAccessToken = this._updateAccessToken.bind(this)

    this.fetchData = this._fetchData.bind(this)
    this.fetchData_rateVideoFromApi = this._fetchData_rateVideoFromApi.bind(this) 
    this.fetchData_getVideoRateDataFromApi = this._fetchData_getVideoRateDataFromApi.bind(this)  
        
    this.componentDidMountClone = this._componentDidMountClone.bind(this)

    this.renderViewMore = this._renderViewMore.bind(this)
    this.renderViewLess = this._renderViewLess.bind(this)
  }

  _renderViewMore = (handlePress) => {
    return (
      <Text style={{color: THEME.TERTIARY.COLOR, marginTop: 5}} onPress={handlePress}>
        Voir plus
      </Text>
    )
  }
  _renderViewLess = (handlePress) => {
    return (
      <Text style={{color: THEME.TERTIARY.COLOR, marginTop: 5}} onPress={handlePress}>
        Voir moins
      </Text>
    )
  }

  _updateAccessToken(accessToken) {
    this.accessToken = accessToken
  }

  _fetchData_getVideoRateDataFromApi(accessToken) {   
    this.updateAccessToken(accessToken)

    getVideoRateDataFromApi(accessToken, this.props.firstData.id.videoId).then( responseJson => {
      if(this._isMounted) {                
        console.log("Video :: _fetchData_getVideoRateDataFromApi :: responseJson :: " + JSON.stringify(responseJson))

        if(responseJson.error && responseJson.error.code === 401) { //Invalid Credentials <> Access Token                        
          getNewTokenFromApi_Filter(this.fetchData_getVideoRateDataFromApi)                       
        } else { //Success
          console.log(" AMERICAN DREAM !!! ")

          if(responseJson.items.length && responseJson.items[0].rating) {
            this.rate = responseJson.items[0].rating
            console.log(this.rate)
            this.rate === 'like'
              ? this.setState({ rate: 'like', like: true, dislike: false, none: false, isRateGot: true, isLoading: false }) //le rating de la video est sur like
              : this.rate === 'dislike'
                ? this.setState({ rate: 'dislike', like: false, dislike: true, none: false, isRateGot: true, isLoading: false }) //le rating de la video est sur dislike
                : this.rate === 'none'
                  ? this.setState({ rate: 'none', like: false, dislike: false, none: true, isRateGot: true, isLoading: false }) //le rating de la video est sur none
                  : null
          } else {
            console.log(" SORCERY !!! ")
          }
        } 
      }        
    })
  }

  _fetchData_rateVideoFromApi(accessToken) {   
    this.updateAccessToken(accessToken)  
    const requestId = this.requestId = uuidv1()

    rateVideoFromApi(accessToken, this.props.firstData.id.videoId, this.state.rate).then( responseJson => {
      if(this._isMounted && this.requestId === requestId) {                
        console.log("Video :: _fetchData_rateVideoFromApi :: responseJson :: " + JSON.stringify(responseJson))

        if(responseJson.status && responseJson.status === 401) { //Invalid Credentials <> Access Token         
          getNewTokenFromApi_Filter(this.fetchData_rateVideoFromApi)                          
        } else { //Success
          console.log(" AMERICAN DREAM !!! ")

          if(responseJson.status && responseJson.status === 204) { //Success               
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

  _toggleFavorite() {
    this.props.toggleFavorite(this.props.firstData, this.state.secondData)
  }

  _fetchData(callback) {
    getVideoInfoFromApi(this.props.firstData.id.videoId).then(callback)
  }

  _componentDidMountClone() { 
    getAccessToken().then(accessToken => {              
      if(this._isMounted) {            
        this.setState({ secondData: this.secondData }, () => this.fetchData_getVideoRateDataFromApi(accessToken))
      }  
    })     
  }

  componentDidMount() {
    console.log('Video :: componentDidMount :: ' + this.props.id)
    this._isMounted = true
    const favoriteVideoIndex = this.props.isFavorite(this.props.firstData)

    if (favoriteVideoIndex !== -1) {
      this.secondData = this.props.recoverFavorite(favoriteVideoIndex) 
      this.componentDidMountClone()
    } else {
      this.fetchData(responseJson => {
        this.secondData = responseJson.items[0]
        this.componentDidMountClone()
      })
    }    
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
                {/*this.props.firstData.id.videoId*/}
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
              this.state.secondData
                ? this.props.navigateTo( 'VideoViewer', { video: [this.props.firstData,this.state.secondData] } )    
                : console.log("Video :: render :: Element not load yet")
            }}>
              <View style={styles.image_container}>
                <Image 
                  source={{uri: this.props.firstData.snippet.thumbnails.medium.url}}
                  style={styles.image}
                />
                <Text style={styles.duration}>
                  {
                    this.state.secondData
                      ? timeConverter(this.state.secondData.contentDetails.duration)
                      : null
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
                this.state.isLoading || !this.state.isRateGot
                  ? console.log("Video :: render :: Element not load yet")
                  : this.state.rate === 'like'
                    ? this.setState({ isLoading: true,  rate: 'none'}, () => getAccessToken().then(accessToken => {
                                                                               this.fetchData_rateVideoFromApi(accessToken)
                                                                             })) 
                    : this.setState({ isLoading: true,  rate: 'like'}, () => getAccessToken().then(accessToken => {
                                                                               this.fetchData_rateVideoFromApi(accessToken)
                                                                             }))
              }} 
            >
              <View style={styles.same_element}>
                {
                  this.state.rate === 'like'
                    ? this.state.isLoading
                      ? <MaterialCommunityIcons style={[styles.same_element_one, {color:THEME.TERTIARY.COLOR}]} name="heart" />
                      : <MaterialCommunityIcons style={styles.same_element_one} name="heart" />
                    : this.state.rate === 'like'
                      ? <MaterialCommunityIcons style={styles.same_element_one} name="heart" />
                      : <MaterialCommunityIcons style={[styles.same_element_one, {color:THEME.TERTIARY.COLOR}]} name="heart-outline" />
                }                                  
              </View>              
              <View style={styles.same_element_two}>
                {
                  !this.state.isRateGot
                    ? <Text style={styles.same_element_four}>...</Text>  
                    : this.state.rate === 'like'
                      ? this.state.isLoading 
                        ? <Text style={styles.same_element_four}>{likeConverter(this.state.secondData.statistics.likeCount)}</Text>
                        : <Text style={[styles.same_element_four, {color:THEME.PRIMARY.BACKGROUND_COLOR}]}>{likeConverter(Number(this.state.secondData.statistics.likeCount)+1)}</Text>
                      : this.state.rate === 'like'
                        ? <Text style={[styles.same_element_four, {color:THEME.PRIMARY.BACKGROUND_COLOR}]}>{likeConverter(Number(this.state.secondData.statistics.likeCount)+1)}</Text>
                        : <Text style={styles.same_element_four}>{likeConverter(this.state.secondData.statistics.likeCount)}</Text>                    
                }                 
              </View>              
            </BounceUpAndDownStatic>

            <BounceUpAndDownStatic 
              scale={SCALE} 
              tension={TENSION} 
              style={[styles.same_element, { opacity: this.state.isLoading ? 0.4 : 1 }]}
              onPress={() => {                               
                this.state.isLoading || !this.state.isRateGot
                  ? console.log("Video :: render :: Element not load yet")
                  : this.state.rate === 'dislike'
                    ? this.setState({ isLoading: true, rate: 'none' }, () => getAccessToken().then(accessToken => {
                                                                               this.fetchData_rateVideoFromApi(accessToken)
                                                                             })) 
                    : this.setState({ isLoading: true, rate: 'dislike' }, () => getAccessToken().then(accessToken => {
                                                                               this.fetchData_rateVideoFromApi(accessToken)
                                                                             })) 
              }}
            >
              <View style={styles.same_element}>
                {
                  this.state.rate === 'dislike'                  
                    ? this.state.isLoading 
                      ? <MaterialCommunityIcons style={[styles.same_element_one, {color:THEME.TERTIARY.COLOR}]} name="heart-broken" />
                      : <MaterialCommunityIcons style={styles.same_element_one} name="heart-broken" />
                    : this.state.rate === 'dislike'
                      ? <MaterialCommunityIcons style={styles.same_element_one} name="heart-broken" />
                      : <MaterialCommunityIcons style={[styles.same_element_one, {color:THEME.TERTIARY.COLOR}]} name="heart-broken-outline" /> 
                }                                  
              </View>
              <View style={styles.same_element_two}>
                { 
                  !this.state.isRateGot
                    ? <Text style={styles.same_element_four}>...</Text> 
                    : this.state.rate === 'dislike'
                      ? this.state.isLoading 
                        ? <Text style={styles.same_element_four}>{likeConverter(this.state.secondData.statistics.dislikeCount)}</Text>                          
                        : <Text style={[styles.same_element_four, {color:THEME.PRIMARY.BACKGROUND_COLOR}]}>{likeConverter(Number(this.state.secondData.statistics.dislikeCount)+1)}</Text>
                      : this.state.rate === 'dislike'
                        ? <Text style={[styles.same_element_four, {color:THEME.PRIMARY.BACKGROUND_COLOR}]}>{likeConverter(Number(this.state.secondData.statistics.dislikeCount)+1)}</Text>
                        : <Text style={styles.same_element_four}>{likeConverter(this.state.secondData.statistics.dislikeCount)}</Text>                    
                }                 
              </View>              
            </BounceUpAndDownStatic>

            <BounceUpAndDownStatic 
              scale={SCALE} 
              tension={TENSION}
              style={styles.same_element}
              onPress={() => {
                this.state.secondData
                  ? this.props.navigateTo( 'CommentList', { videoId: this.props.firstData.id.videoId, commentCount: this.state.secondData.statistics.commentCount, autoFocus: false } )
                  : console.log("Video :: render :: Element not load yet")               
              }}     
            >
              <View style={styles.same_element}>     
                {
                  this.state.secondData
                    ? this.state.secondData.statistics.commentCount === 0
                      ? <Icon style={[styles.same_element_one, {color:THEME.TERTIARY.COLOR}]} name="md-chatbubbles" />
                      : <Icon style={styles.same_element_one} name="md-chatbubbles" />  
                    : <Icon style={styles.same_element_one} name="md-chatbubbles" />      
                }        
              </View>
              <View style={styles.same_element_two}>
                <Text style={styles.same_element_four}>
                  {
                    this.state.secondData
                      ? likeConverter(this.state.secondData.statistics.commentCount)
                      : '...'                      
                  }
                </Text>
              </View>
            </BounceUpAndDownStatic>            
          </View>

          {/*
            this.props.firstData.oneComment.length === 0
            ? null
            : <View style={styles.comment_container}>    

                <View style={styles.comment_container_left}>
                  <BounceUpAndDownStatic 
                    scale={.8}
                    onPress={() => {
                      this.props.navigateTo('ImageViewerDynamic', { 
                        title: this.props.firstData.oneComment[0].snippet.topLevelComment.snippet.authorDisplayName,
                        imgURLPreview: imageResizer(this.props.firstData.oneComment[0].snippet.topLevelComment.snippet.authorProfileImageUrl, USER_IMG_SIZE) ,                
                      })
                    }}
                  >
                    <View style={styles.comment_container_left_img_container}>                    
                      <Image
                        style={styles.comment_container_left_img}
                        defaultSource={require(DEFAULT_IMG)}
                        source={{ uri: imageResizer(this.props.firstData.oneComment[0].snippet.topLevelComment.snippet.authorProfileImageUrl, USER_IMG_SIZE) }}
                      />
                    </View>
                  </BounceUpAndDownStatic>
                </View>

                <View style={styles.comment_container_right}>
                  <View                                      
                    style={styles.comment_area}
                    onPress={() => {
                      this.state.secondData
                        ? this.props.navigateTo( 'CommentList', { videoId: this.props.firstData.id.videoId, commentCount: this.state.secondData.statistics.commentCount } )
                        : console.log("Video :: render :: Element not load yet")               
                    }}
                  >                
                    <Text style={styles.comment_area_name}>
                      {this.props.firstData.oneComment[0].snippet.topLevelComment.snippet.authorDisplayName}
                    </Text>
                    <ViewMoreText
                      numberOfLines={3}
                      renderViewMore={this.renderViewMore}
                      renderViewLess={this.renderViewLess}                      
                    >
                      <Autolink
                        style={styles.comment_area_text}
                        text={this.props.firstData.oneComment[0].snippet.topLevelComment.snippet.textOriginal}
                        hashtag="instagram"
                        mention="twitter"
                      />    
                    </ViewMoreText>
                  </View>

                  <View style={styles.design_fix_area}>
                    <Icon style={styles.arrow_dropdown_icon} name="md-arrow-dropdown" />
                  </View>
                </View>                

              </View>
          */}

          <View style={[styles.comment_container, {/*marginTop: 0*/} ]}>    

            <View style={styles.comment_container_left}>
              <BounceUpAndDownStatic 
                scale={.8}
                onPress={() => {
                  this.props.navigateTo('ImageViewerDynamic', { 
                    title: firebase.auth().currentUser.displayName,
                    imgURLPreview: imageResizer(firebase.auth().currentUser.photoURL, USER_IMG_SIZE),                
                  })
                }}           
              >
                <View style={styles.comment_container_left_img_container}>        
                  <Image
                    style={styles.comment_container_left_img}       
                    defaultSource={require(DEFAULT_IMG)}        
                    source={{ uri: firebase.auth().currentUser.photoURL }}
                  />
                </View>
              </BounceUpAndDownStatic>
            </View>

            <View style={styles.comment_container_right}>
              <BounceUpAndDownStatic
                scale={.9}                 
                style={[styles.comment_area, {                   
                  width: '100%',
                  borderWidth: 1,
                  borderRadius: REDVALUE,
                  borderColor: THEME.TERTIARY.WAVE_COLOR
                }]}
                onPress={() => {
                  this.state.secondData
                    ? this.props.navigateTo( 'CommentList', { videoId: this.props.firstData.id.videoId, commentCount: this.state.secondData.statistics.commentCount, autoFocus: true } )
                    : console.log("Video :: render :: Element not load yet")               
                }}
              >
                <Text style={{                              
                  fontWeight: 'normal',
                  fontSize: 16,
                  color: THEME.TERTIARY.WAVE_COLOR,
                  marginTop: -2                  
                }}>
                  laisser un commentaire ...
                </Text>                        
              </BounceUpAndDownStatic>
            </View>

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
    borderBottomWidth: 1,
    borderBottomColor: THEME.TERTIARY.SEPARATOR_COLOR,    
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

  comment_container: {
    marginTop: 15,
    marginBottom: 15,
    width: '100%',
    height: null,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
  },
  comment_container_left: {
    width: REDVALUE,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  comment_container_left_img_container: {
    width: REDVALUE,
    height: REDVALUE,
  },
  comment_container_left_img_background: {
    flex: 1, 
    borderRadius: REDVALUE, 
    height: null, 
    width: null 
  },
  comment_container_left_img: {
    position: "absolute",
    borderRadius: REDVALUE, 
    width: REDVALUE,
    height: REDVALUE,
  },
  comment_container_right: {
    flex: 1,
    alignItems: 'flex-start', 
    justifyContent: 'center',
    marginLeft: 10,
  },

  comment_area: {
    width: null,
    height: null,
    borderRadius: 10,
    backgroundColor: THEME.TERTIARY.SEPARATOR_COLOR,
    padding: 10,
    alignItems: 'flex-start', 
    justifyContent: 'center',
  },
  comment_area_name: {
    lineHeight: 22,
    fontWeight: 'bold',
  },
  comment_area_text: {
    fontSize: 16, 
    lineHeight: 22,
  },

  design_fix_area: {
    position: 'absolute',
    width: 10*2,
    height: 10,
    backgroundColor: 'transparent',
    top: 1,
    left: -10,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  arrow_dropdown_icon: {
    color: THEME.TERTIARY.SEPARATOR_COLOR,
    fontSize: 50
  },
})

const mapStateToProps = (state) => {
  return {
    favoritesVideo: state.toggleFavorite.favoritesVideo,
    currentUser: state.UserInfoReducer.currentUser,
  }
}

export default connect(mapStateToProps)(Video)