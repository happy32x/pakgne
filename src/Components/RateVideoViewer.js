import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  TouchableNativeFeedback,
} from 'react-native'

import { 
  getAccessToken,
} from '../Store/storeData'

import Icon from 'react-native-vector-icons/Ionicons'
import IconFoundation from 'react-native-vector-icons/Foundation'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import likeConverter from '../Helpers/likeConverter'
import THEME from '../INFO/THEME'

import uuidv1 from 'uuid/v1'

import {  
  getNewTokenFromApi_Filter,
  getVideoRateDataFromApi,
  rateVideoFromApi,    
} from '../API/REQUEST'

class RateVideoViewer extends Component {
  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      rate: 'none',
      isRateGot: false,  

      like: false, 
      dislike: false,
      none: false,
    }
    
    this.rate = 'none'
    this.requestId = null

    this.accessToken = null
    this.updateAccessToken = this._updateAccessToken.bind(this)

    this.componentDidMountClone = this._componentDidMountClone.bind(this)
    this.fetchData_rateVideoFromApi = this._fetchData_rateVideoFromApi.bind(this)
    this.fetchData_getVideoRateDataFromApi = this._fetchData_getVideoRateDataFromApi.bind(this) 
  }

  _updateAccessToken(accessToken) {
    this.accessToken = accessToken
  }

  _fetchData_getVideoRateDataFromApi(accessToken) {   
    this.updateAccessToken(accessToken)

    getVideoRateDataFromApi(accessToken, this.props.videoId).then( responseJson => {
      if(this._isMounted) {                
        console.log("RateVideoViewer :: _fetchData_getVideoRateDataFromApi :: responseJson :: " + JSON.stringify(responseJson))

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

    rateVideoFromApi(accessToken, this.props.videoId, this.state.rate).then( responseJson => {
      if(this._isMounted && this.requestId === requestId) {                
        console.log("RateVideoViewer :: _fetchData_rateVideoFromApi :: responseJson :: " + JSON.stringify(responseJson))

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

  _componentDidMountClone() { 
    getAccessToken().then(accessToken => {              
      if(this._isMounted) {            
        this.fetchData_getVideoRateDataFromApi(accessToken)
      }  
    })     
  }

  componentDidMount() {
    this._isMounted = true 
    this.componentDidMountClone()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    return (

      <View style={[ styles.option_area_macro, {opacity: this.state.isLoading ? 0.4 : 1} ]}> 

        <TouchableNativeFeedback 
          background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,true)}                    
          onPress={() => {                 
            this.state.isLoading || !this.state.isRateGot
              ? console.log("RateVideoViewer :: render :: Element not load yet")
              : this.state.rate === 'like'
                ? this.setState({ isLoading: true,  rate: 'none'}, () => getAccessToken().then(accessToken => {
                                                                           this.fetchData_rateVideoFromApi(accessToken)
                                                                         })) 
                : this.setState({ isLoading: true,  rate: 'like'}, () => getAccessToken().then(accessToken => {
                                                                           this.fetchData_rateVideoFromApi(accessToken)
                                                                         }))
          }} 
        >
          <View style={styles.same_element_one}>
            {
              this.state.rate === 'like'
                ? this.state.isLoading                  
                  ? <MaterialCommunityIcons style={[styles.like_icon, {color:THEME.TERTIARY.COLOR} ]} name="heart" />
                  : <MaterialCommunityIcons style={styles.like_icon} name="heart" />
                : this.state.rate === 'like'
                  ? <MaterialCommunityIcons style={styles.like_icon} name="heart" />
                  : <MaterialCommunityIcons style={[styles.like_icon, {color:THEME.TERTIARY.COLOR}]} name="heart-outline" />
            }
            {  
              !this.state.isRateGot
                ? <Text style={[styles.like_text, {color:THEME.TERTIARY.COLOR} ]}>...</Text>  
                : this.state.rate === 'like'               ? this.state.isLoading 
                    ? <Text style={[styles.like_text, {color:THEME.TERTIARY.COLOR} ]}>{likeConverter(this.props.like)}</Text>                    
                    : <Text style={styles.like_text}>{likeConverter(Number(this.props.like)+1)}</Text>
                  : this.state.rate === 'like'
                    ? <Text style={styles.like_text}>{likeConverter(Number(this.props.like)+1)}</Text>
                    : <Text style={[styles.like_text, {color:THEME.TERTIARY.COLOR} ]}>{likeConverter(this.props.like)}</Text>                    
            }                            
          </View>        
        </TouchableNativeFeedback>

        <TouchableNativeFeedback 
          background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,true)}                              
          onPress={() => {                               
            this.state.isLoading || !this.state.isRateGot
              ? console.log("RateVideoViewer :: render :: Element not load yet")
              : this.state.rate === 'dislike'
                ? this.setState({ isLoading: true, rate: 'none' }, () => getAccessToken().then(accessToken => {
                                                                            this.fetchData_rateVideoFromApi(accessToken)
                                                                          })) 
                : this.setState({ isLoading: true, rate: 'dislike' }, () => getAccessToken().then(accessToken => {
                                                                            this.fetchData_rateVideoFromApi(accessToken)
                                                                          })) 
          }} 
        >
          <View style={styles.same_element_one}>
            {
              this.state.rate === 'dislike'                  
                ? this.state.isLoading 
                  ? <MaterialCommunityIcons style={[styles.dislike_icon, {color:THEME.TERTIARY.COLOR}]} name="heart-broken" />           
                  : <MaterialCommunityIcons style={styles.dislike_icon} name="heart-broken" />
                : this.state.rate === 'dislike'
                  ? <MaterialCommunityIcons style={styles.dislike_icon} name="heart-broken" />
                  : <MaterialCommunityIcons style={[styles.dislike_icon, {color:THEME.TERTIARY.COLOR}]} name="heart-broken-outline" /> 
            }              
            { 
              !this.state.isRateGot
                ? <Text style={styles.dislike_text}>...</Text> 
                : this.state.rate === 'dislike'
                  ? this.state.isLoading 
                    ? <Text style={[styles.dislike_text, {color:THEME.TERTIARY.COLOR} ]}>{likeConverter(this.props.dislike)}</Text>
                    : <Text style={styles.dislike_text}>{likeConverter(Number(this.props.dislike)+1)}</Text>
                  : this.state.rate === 'dislike'
                    ? <Text style={styles.dislike_text}>{likeConverter(Number(this.props.dislike)+1)}</Text>
                    : <Text style={[styles.dislike_text, {color:THEME.TERTIARY.COLOR} ]}>{likeConverter(this.props.dislike)}</Text>
            }                
          </View>        
        </TouchableNativeFeedback>

      </View>

    )
  }
}

const styles = StyleSheet.create({
  option_area_macro: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  same_element_one: { 
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  dislike_icon: { 
    color: THEME.PRIMARY.BACKGROUND_COLOR,  
    fontSize:22 
  },
  dislike_text: { 
    fontSize:13, 
    color: THEME.PRIMARY.BACKGROUND_COLOR, 
  },
  like_icon: { 
    color: THEME.PRIMARY.BACKGROUND_COLOR, 
    fontSize:22
  },
  like_text: { 
    fontSize:13, 
    color: THEME.PRIMARY.BACKGROUND_COLOR
  },
})

export default RateVideoViewer