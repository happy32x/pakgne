import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Platform,
  TextInput,
  StyleSheet,
  Dimensions,
  BackHandler,
  ActivityIndicator,
  TouchableNativeFeedback,
} from 'react-native'

import firebase from 'firebase'

import Modal from "react-native-modal"
import Icon from 'react-native-vector-icons/Ionicons'
import DIMENSION from '../INFO/DIMENSION'
import THEME from '../INFO/THEME'
import BounceUpAndDownStatic from '../Animations/BounceUpAndDownStatic'
import { withNavigation } from 'react-navigation'

import { 
  getAccessToken,
} from '../Store/storeData'

import {
  commentVideo,
  getNewTokenFromApi_Filter,
} from '../API/REQUEST'
import uuidv1 from 'uuid/v1'

const REDVALUE = 50-10
const USER_IMG_SIZE = 100
const DEFAULT_IMG = '../assets/default_100.jpg'

class ModalCommentPostYoutube extends Component {
  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {
      text: '',
      isLoading: false,
    }    
    
    this.requestId = null
    this.accessToken = null

    this.updateAccessToken = this._updateAccessToken.bind(this)    
    this.fetchData_commentVideo = this._fetchData_commentVideo.bind(this) 
  }

  _updateAccessToken(accessToken) {
    this.accessToken = accessToken
  }

  _fetchData_commentVideo(accessToken) {   
    this.updateAccessToken(accessToken)  
    const requestId = this.requestId = uuidv1()

    commentVideo(accessToken, this.props.videoId, this.state.text).then( responseJson => {
      if(this._isMounted && this.requestId === requestId) {                
        console.log("Video :: _fetchData_commentVideo :: responseJson :: " + JSON.stringify(responseJson))

        if(responseJson.error && responseJson.error.code === 401) { //Invalid Credentials <> Access Token     
          getNewTokenFromApi_Filter(this.fetchData_commentVideo)                          
        } else { //Success
          console.log(" AMERICAN DREAM !!! ")

          if(responseJson.kind && responseJson.kind === "youtube#commentThread") { //Success              
            //Tout s'est bien passé, on peut désormais:
            //ajouter un commentaire
            this.props.addComment(responseJson)
            //cacher le modal
            this.props.toggleModalCommentPostYoutube_HIDE()
            //Et retour à l'état initial, on peut désormais écrire
            this.setState({ isLoading: false, text: '' })       
          } else {
            console.log(" SORCERY !!! ")
          }
        }       
      }                 
    })
  }  

  changeText = (text) => {        
    this.setState({text}, () => console.log('CommentPostYoutube :: changeText :: text :: ' + this.state.text))
  }

  componentDidMount() {   
    this._isMounted = true       
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    return (
      <Modal
        isVisible={this.props.isModalCommentPostYoutubeVisible}
        backdropColor='black'
        onBackdropPress={() => this.props.toggleModalCommentPostYoutube_HIDE()}        
        onSwipeComplete={() => this.props.toggleModalCommentPostYoutube_HIDE()}
        swipeDirection={['left', 'right']}       
        swipeThreshold={Dimensions.get("window").width/2}
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          margin: 0,
        }}
      >

        <View style={styles.comment_container}>    
          <View style={styles.comment_container_left}>
            <TouchableNativeFeedback
              onPress={() => console.log('my image pressed !')}
            >
              <View style={styles.comment_container_left_img_container}>               
                <Image
                  style={styles.comment_container_left_img}
                  defaultSource={require(DEFAULT_IMG)}
                  source={{ uri: firebase.auth().currentUser.photoURL }}
                />
              </View>
            </TouchableNativeFeedback>
          </View>

          <View style={styles.comment_container_right}>
            <View                             
              style={[styles.comment_area, {                   
                width: '100%',
                borderWidth: 1,
                borderRadius: REDVALUE-30,
                borderColor: THEME.TERTIARY.WAVE_COLOR
              }]}             
            >        
              <TextInput
                ref={x => this.text_input = x}
                style={{           
                  width: '100%',                   
                  fontWeight: 'normal',
                  fontSize: 16,      
                  color: this.state.isLoading ? THEME.TERTIARY.WAVE_COLOR : 'black'       
                }}
                placeholder="commenter ..."
                selectionColor={THEME.PRIMARY.BACKGROUND_COLOR}
                autoFocus={true}
                underlineColorAndroid="transparent"
                autoCorrect={true}
                autoCapitalize={'none'}
                keyboardType={'default'}              
                onChangeText={this.changeText}                
                value={this.state.text}
                multiline={true}
                textAlignVertical={'top'}
                editable={this.state.isLoading ? false : true}
                //onSubmitEditing={() => this.launchResearh()}
                //returnKeyType={'search'}                
                /*onFocus={() => this.setState({SearchViewerListIsDisplaying: true, 
                                              cross_display: true, 
                                              flex_text_input: FLEX_TEXT_INPUT_FILLED
                                            })}*/
              />
            </View>

            <View style={styles.submit_button_container}>
              <BounceUpAndDownStatic
                scale={.8}
                onPress={() => {
                  if(this.state.text !== '' || !this.state.isLoading){
                    console.log('submit button pressed !')                    
                    this.setState({isLoading: true}, () => getAccessToken().then(accessToken => {
                                                             this.fetchData_commentVideo(accessToken)
                                                           })) 
                  }
                }}
              >
                {
                  this.state.text !== '' && !this.state.isLoading
                    ? <Icon style={styles.submit_button_icon} name="md-send" />
                      : this.state.isLoading
                        ? <ActivityIndicator size="small" color={THEME.PRIMARY.BACKGROUND_COLOR}/>                                            
                        : null
                }                
              </BounceUpAndDownStatic>
            </View> 
          </View>  
        </View>

      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  comment_container: {    
    width: Dimensions.get("window").width,
    maxHeight: Dimensions.get("window").height/3,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: THEME.ON_LOAD_COLOR,
    padding: 15,
    paddingLeft: 10,
    paddingRight: 5,
    marginBottom: 0,
    backgroundColor: THEME.PRIMARY.COLOR,
  },
  comment_container_left: {
    width: REDVALUE-20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  comment_container_left_img_container: {
    width: REDVALUE-20,
    height: REDVALUE-20,
  },
  comment_container_left_img_background: {
    flex: 1, 
    borderRadius: REDVALUE-20, 
    height: null, 
    width: null,
  },
  comment_container_left_img: {
    position: "absolute",
    borderRadius: REDVALUE-20,
    width: REDVALUE-20,
    height: REDVALUE-20,
  },
  comment_container_right: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: 10,
  },
  comment_area: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: THEME.TERTIARY.SEPARATOR_COLOR,
    padding: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  submit_button_container: {
    width: REDVALUE - 10,
    //maxHeight: Dimensions.get("window").height/3 -15 -15,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: 10,
  },
  submit_button_icon: {
    color: THEME.PRIMARY.BACKGROUND_COLOR,
    fontSize: 30,
  },
})

export default withNavigation(ModalCommentPostYoutube)

