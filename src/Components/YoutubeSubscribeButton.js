import React from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableNativeFeedback,
} from 'react-native'

import { 
  getNewTokenFromApi_Filter,

  getSubscriptionStatusFromApi,
  subscribeToChannel,
  unSubscribeToChannel,  
} from '../API/REQUEST'

import { 
  getAccessToken,
} from '../Store/storeData'

import { connect } from 'react-redux'

import THEME from '../INFO/THEME'
import DATA from '../API/DATA'

const channelId = DATA.CHANNEL_ID

const YOUTUBE_LOGO_ON = '../assets/app_icons_youtube_on.png'
const YOUTUBE_LOGO_OFF = '../assets/app_icons_youtube_off.png'

class YoutubeSubscribeButton extends React.Component {
  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {   
      isLoading: true,
      subscribe: false,
    }    
    this.subscriptionID = null
    this.accessToken = null

    console.log("YoutubeSubscribeButton :: constructor :: this.props.currentUser :: " + this.props.currentUser.accessToken) 

    this.updateAccessToken = this._updateAccessToken.bind(this)

    this.fetchData_getSubscriptionStatusFromApi = this._fetchData_getSubscriptionStatusFromApi.bind(this)            
    this.fetchData_subscribeToChannel = this._fetchData_subscribeToChannel.bind(this) 
    this.fetchData_unSubscribeToChannel = this._fetchData_unSubscribeToChannel.bind(this)     
  }  

  _updateAccessToken(accessToken) {
    this.accessToken = accessToken
  }

  _fetchData_getSubscriptionStatusFromApi(accessToken) {      
    this.updateAccessToken(accessToken)

    getSubscriptionStatusFromApi(accessToken).then( responseJson => {
      if(this._isMounted) {                
        console.log("YoutubeSubscribeButton :: _fetchData_getSubscriptionStatusFromApi :: responseJson :: " + JSON.stringify(responseJson))

        if(responseJson.error && responseJson.error.code === 401) { //Invalid Credentials <> Access Token
          getNewTokenFromApi_Filter(this.fetchData_getSubscriptionStatusFromApi)          
        } else { //Success
          console.log(" AMERICAN DREAM !!! ")

          if(responseJson.items.length && responseJson.items[0].snippet.resourceId.channelId === channelId) {
            if(this.subscriptionID === null) this.subscriptionID = responseJson.items[0].id
            this.setState({ isLoading: false, subscribe: true }) //il est déjà abonné à la chaine
          } else {
            this.setState({ isLoading: false, subscribe: false }) //il n'est pas encore abonné à la chaine
          }
        } 
      }        
    })
  }  

  _fetchData_subscribeToChannel(accessToken) {    
    this.updateAccessToken(accessToken) 

    subscribeToChannel(accessToken).then( responseJson => {
      if(this._isMounted) {                
        console.log("YoutubeSubscribeButton :: _fetchData_subscribeToChannel :: responseJson :: " + JSON.stringify(responseJson))

        if(responseJson.error && responseJson.error.code === 401) { //Invalid Credentials <> Access Token          
          getNewTokenFromApi_Filter(this.fetchData_subscribeToChannel)  
        } else { //Success
          console.log(" AMERICAN DREAM !!! ")

          if(responseJson.snippet && responseJson.snippet.resourceId.channelId === channelId) {
            if(this.subscriptionID === null) this.subscriptionID = responseJson.id
            this.setState({ isLoading: false, subscribe: true }) //il est déjà abonné à la chaine
          } else {
            console.log(" SORCERY !!! ")
          }
        } 
      }        
    })
  }

  _fetchData_unSubscribeToChannel(accessToken) {    
    this.updateAccessToken(accessToken) 

    unSubscribeToChannel(accessToken, this.subscriptionID).then( responseJson => {
      if(this._isMounted) {                        
        console.log("YoutubeSubscribeButton :: _fetchData_unSubscribeToChannel :: responseJson :: " + JSON.stringify(responseJson))

        if(responseJson.status && responseJson.status === 401) { //Invalid Credentials <> Access Token          
          getNewTokenFromApi_Filter(this.fetchData_unSubscribeToChannel) 
        } else { //Success
          console.log(" AMERICAN DREAM !!! ")

          if(responseJson.status && responseJson.status === 204) { //Success                
            this.setState({ isLoading: false, subscribe: false }) //il n'est pas encore abonné à la chaine     
          } else {
            console.log(" SORCERY !!! ")
          }   
        } 
      }                
    })
  }

  /*_fetchData_getNewTokenFromApi() {  
    
    getNewTokenFromApi(this.props.currentUser.refreshToken).then( responseJson => {
      if(this._isMounted) {                
        console.log("YoutubeSubscribeButton :: _fetchData_getNewTokenFromApi :: responseJson :: " + JSON.stringify(responseJson))
        console.log("YoutubeSubscribeButton :: _fetchData_getNewTokenFromApi :: this.props.currentUser.refreshToken :: " + this.props.currentUser.refreshToken)

        if(responseJson.access_token) { //Success  

          //old global save
          console.log("YoutubeSubscribeButton :: _fetchData_getNewTokenFromApi :: responseJson :: this.props.currentUser.accessToken :: OLD :: " + this.props.currentUser.accessToken)
          const action = { type: "ADD_NEW_ACCESS__ID_TOKEN", value: responseJson }
          this.props.dispatch(action)
          console.log("YoutubeSubscribeButton :: _fetchData_getNewTokenFromApi :: responseJson :: this.props.currentUser.accessToken :: NEW :: " + this.props.currentUser.accessToken)          

          //callback(responseJson.access_token)
          getNewTokenFromApi_Succeed(responseJson.access_token)
          
        } else { //Invalid Grant <> Refresh Token
          console.log("YoutubeSubscribeButton :: _fetchData_getNewTokenFromApi :: L'obtention du newRefreshToken a échoué !!!")
          //Alors on notifie tous ceux qui nous attendaient
          getNewTokenFromApi_Failed()
        }
      }        
    })    
  }*/

  componentDidMount() {
    console.log("YoutubeSubscribeButton :: componentDidMount")
    this._isMounted = true

    getAccessToken().then(accessToken => {
      console.log("YoutubeSubscribeButton :: componentDidMount :: getAccessToken :: accessToken :: " + accessToken)
      this.fetchData_getSubscriptionStatusFromApi(accessToken)
    })
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    return (
      this.state.isLoading
        ? <View style={styles.subscribe_button_container}>
            <ActivityIndicator size="large" color={THEME.PRIMARY.BACKGROUND_COLOR}/>
          </View>  
        : this.state.subscribe                                                                                                                      
          ? <TouchableNativeFeedback 
              background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,false)}                      
              onPress={ () => this.setState( {isLoading: true}, () => getAccessToken().then(accessToken => {
                                                                        this.fetchData_unSubscribeToChannel(accessToken)
                                                                      }))}
            >
              <View style={styles.subscribe_button_container}>
                <Image
                  style={styles.subscribe_button_image}
                  source={require(YOUTUBE_LOGO_OFF)}
                />  
                <Text style={[styles.subscribe_button_text, {color:THEME.SECONDARY.WAVE_COLOR}]}>  DEJA ABONNE A PAKGNE</Text>
              </View>  
            </TouchableNativeFeedback>             

          : <TouchableNativeFeedback 
              background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,false)}
              onPress={ () => this.setState( {isLoading: true}, () => getAccessToken().then(accessToken => {
                                                                        this.fetchData_subscribeToChannel(accessToken)
                                                                      }))}              
              
            >
              <View style={styles.subscribe_button_container}>
                <Image
                  style={styles.subscribe_button_image}
                  source={require(YOUTUBE_LOGO_ON)}
                />  
                <Text style={[styles.subscribe_button_text, {color:'red'}]}>  ABONNEZ-VOUS A PAKGNE</Text>
              </View>
            </TouchableNativeFeedback>           
    )
  }
}

const styles = StyleSheet.create({
  subscribe_button_container: {
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    paddingTop: 25,
    paddingBottom: 25,
  },
  subscribe_button_image: {
    width: 30,
    height: 30,
  },
  subscribe_button_text: {
    fontWeight: 'bold',
    fontSize:15,
  }
})

const mapStateToProps = (state) => {
  return {
    currentUser: state.UserInfoReducer.currentUser
  }
}

export default connect(mapStateToProps)(YoutubeSubscribeButton)