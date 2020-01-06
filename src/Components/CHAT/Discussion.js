import React from 'react'
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  Dimensions,
  PanResponder,
  TouchableNativeFeedback,
} from 'react-native'

import ViewMoreText from 'react-native-view-more-text'
import firebase from 'firebase'

import Autolink from 'react-native-autolink'
import HourConverter from '../HourConverter'
import { imageResizer } from '../../AI/ImageResizer'
import BounceUpAndDownStatic from '../../Animations/BounceUpAndDownStatic'
import THEME from '../../INFO/THEME'

import Icon from 'react-native-vector-icons/Ionicons'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {
  setMessageFromApi,
} from './API/REQUEST'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

const SCALE = .5
const TENSION = 100

const REDVALUE = 50-10
const USER_IMG_SIZE = 100
const DEFAULT_IMG = '../../assets/default_100.jpg'

const SCREEN_WIDTH = Dimensions.get("window").width
const SCREEN_WIDTH_TEN = SCREEN_WIDTH/10
const SCREEN_WIDTH_MID = SCREEN_WIDTH/2
const SCREEN_WIDTH_TIERCE = SCREEN_WIDTH/3
const SCREEN_WIDTH_QUARTER = SCREEN_WIDTH/4

const miniREDVALUE = 10

class Discussion extends React.Component {
  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {
      send: false, //l'icone "clock" sera afiiché par defaut
      discussionXAnim: new Animated.Value(0),
      selected: false,
      discussionType: 'Discussion',
    }
    this._discussionXAnim = 0
    this._newMessageRef = null
    this._alreadySaved = false

    this.renderViewMore = this._renderViewMore.bind(this)
    this.renderViewLess = this._renderViewLess.bind(this)   

    this.setSend = this._setSend.bind(this)
  }

  _renderViewMore(handlePress) {
    return (
      <Text style={{color: THEME.TERTIARY.COLOR, marginTop: 5}} onPress={handlePress}>
        Voir plus
      </Text>
    )
  }
  _renderViewLess(handlePress) {
    return (
      <Text style={{color: THEME.TERTIARY.COLOR, marginTop: 5}} onPress={handlePress}>
        Voir moins
      </Text>
    )
  }

  _setSend(newMessageRef) {
    if(this._isMounted) {
      this._newMessageRef = newMessageRef
      this.setState({ send: true }, () => console.log("MIS A JOUR AVEC SUCCES !"))
    }
  }

  componentDidMount() {
    console.log("NO")
    this._isMounted = true
    /*if(this.props.data.key == 'NEW' && !this._alreadySaved){
      this._alreadySaved = true
      setMessageFromApi(this.props.chatKey, this.props.data, this.setSend)
    }*/
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  componentWillMount() {

    this._panResponder = PanResponder.create({
      //onStartShouldSetPanResponder: () => true,
      //onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {},

      onPanResponderRelease: (e, {vx, vy}) => {
        Animated.timing(this.state.discussionXAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start()
        if(this._discussionXAnim >= 40) {
          //Activation de la citation
          console.log('citation')
          this.props.addQuote('Happy Julien', 'Bonjour le France !')
        } 
        this._discussionXAnim = 0         
      },

      onPanResponderMove: (e, {dx, dy}) => {

        if (dx > 0) {
          if (this._discussionXAnim < SCREEN_WIDTH_TIERCE) {
            this._discussionXAnim = dx/3
            this.state.discussionXAnim.setValue(this._discussionXAnim)
          } else if (this._discussionXAnim >= SCREEN_WIDTH_TIERCE) {
            this._discussionXAnim = SCREEN_WIDTH_TIERCE
            this.state.discussionXAnim.setValue(SCREEN_WIDTH_TIERCE)
          }
        }

      }
    })
  }

  setSelectedMode = (value) => {
    this.setState({selected: value})
  }

  render() {
    //console.log("IN :: " + this.props.data.val().message)
    return (
      <TouchableWithoutFeedback
        onLongPress={() => {
          this.props.onLongPress(this)          
        }}
        onPress={() => {    
          this.props.onPress(this)                
        }}   
      >
        <View style={styles.comment_container}>
          
          <Animated.View
            {...this._panResponder.panHandlers}
            style={[styles.comment_container_right, {
              transform: [{ translateX: this.state.discussionXAnim }],
              //backgroundColor: 'red',
            }]}
          >
            
            <View style={styles.comment_area}>

              <View style={{
                position: 'absolute',
                //width: 10*2+5,
                //height: 10,
                backgroundColor: 'transparent',
                top: 32,
                left: -10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Icon style={[styles.arrow_dropdown_icon, {elevation: 1}]} name="md-arrow-dropdown"/>
              </View> 

              <View style={{
                //maxWidth: Dimensions.get('window').width*80/100-20,
                //width: null,
                //height: null,
                alignSelf: 'stretch',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 0,
                //paddingVertical: 5,
                //paddingHorizontal: 5,
                //backgroundColor: 'red',
                overflow: 'hidden',                
              }}>   
                <View style={{
                  backgroundColor: THEME.TERTIARY.SHARP_COLOR,//'blue',
                  alignSelf: 'stretch',                  
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',  
                  //borderRadius: 5, 
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,                         
                }}>         
                  <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR, true)}
                    onPressIn={() => {
                      console.log("author name touch !")
                    }}
                  > 
                    <View style={{
                      //backgroundColor: 'yellow',
                      alignSelf: 'stretch',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      paddingLeft: 30,
                      paddingRight: 5,
                      paddingVertical: 5,                  
                      borderRadius: 5,
                    }}>
                      <Image
                        style={[styles.comment_container_left_img, {
                          left:6,
                          borderRadius: miniREDVALUE,
                          width: miniREDVALUE+10,
                          height: miniREDVALUE+10,
                        }]}
                        source={require(DEFAULT_IMG)}
                      />   
                      <Image
                        style={[styles.comment_container_left_img, {
                          left:6,
                          borderRadius: miniREDVALUE,
                          width: miniREDVALUE+10,
                          height: miniREDVALUE+10,
                        }]}
                        source={require(DEFAULT_IMG)}
                      />
                      <Text style={[styles.comment_area_name, {marginTop:-2, color:'#5498c6',alignSelf: 'stretch',} ]} numberOfLines={1}>
                        Abbias Tchafang{/*this.props.data.val().author_name*/}
                      </Text>
                    </View>    
                  </TouchableNativeFeedback>
                </View>  
              </View>            

              {/*<View style={styles.comment_area_name_icon}>
                <View style={{flex:1}}>
                  <Text style={styles.comment_area_name}>
                    this.props.data.val().author_name
                  </Text>
                </View>
              </View>*/}

              <View style={{              
                alignSelf: 'stretch',
                backgroundColor: THEME.TERTIARY.SHARP_COLOR_DARK,
                margin: 0,
                marginBottom: 5,
                marginHorizontal: 5,
                borderRadius: 5, 

                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',     
              }}>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR, true)}             
                  onPress={() => {
                    console.log("quote touch !")
                  }}
                > 
                  <View style={{              
                    alignSelf: 'stretch',                  
                    borderLeftColor: THEME.PRIMARY.BACKGROUND_COLOR,
                    borderLeftWidth: 5,                   
                    padding: 5,                  

                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',                                        
                  }}>
                    <Text
                      numberOfLines={1} 
                      style={{
                        fontWeight: 'bold',
                        color: THEME.PRIMARY.BACKGROUND_COLOR,
                        alignSelf: 'flex-start',
                        fontSize: 10,
                      }}
                    >
                      Happy ngounou{/*this.props.data.val().author_name*/}
                    </Text>
                    <Text numberOfLines={3} style={{alignSelf: 'flex-start'}}>
                      Et puis quoi !!! {/*this.props.data.val().message*/}
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              </View>

              {/*<ViewMoreText
                numberOfLines={50}
                renderViewMore={this.renderViewMore}
                renderViewLess={this.renderViewLess}
                //key={this.props.data.val().message.length}
              >
                {/*<Autolink
                  style={styles.comment_area_text}
                  text={this.props.data.val().message}
                  hashtag="instagram"
                  mention="twitter"
                />
              </ViewMoreText>*/}

              <View style={{marginHorizontal: 10,}}>
                <Text>Bonjour le France !
                Bonjour le France !
                Bonjour le France !              
                {/*this.props.data.val().message*/}</Text>
              </View>

              <View style={styles.option_area_mini}>
                {/*<IconMaterialCommunityIcons style={styles.message_status} name="clock-outline" />*/}              
                <IconMaterialCommunityIcons style={styles.message_status} name="check" />
                <Text style={[styles.option_area_text,]}>
                  10:20{/*<HourConverter publishAt={this.props.data.val().messageTimeStamp} />*/}
                </Text>
              </View>      

            </View>                                    
              
          </Animated.View>         

          <Animated.View style={{  
            position: 'absolute',
            left: -35,
            width: 35,
            height: 35,
            //backgroundColor: 'gray' ,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'   ,
            transform: [{ translateX: this.state.discussionXAnim }],
          }}>
            <Animated.View style={{      
              width: 35,
              height: 35,
              backgroundColor: 'gray',
              borderRadius: 18,
              opacity: 0.3,
            }}/>
            <IconMaterialCommunityIcons name="reply" style={{
              position:'absolute',
              color:THEME.PRIMARY.COLOR,
              fontSize:22,
            }}/>
          </Animated.View>

          {
            this.state.selected           
            ? <View style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: '#5da9cd',
                opacity: 0.2,
              }}/>
            : null
          }
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  comment_container: {        
    width: null,
    height: null,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    //backgroundColor: 'red'
  },
  comment_container_right: {
    width: '100%',
    height: null,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 0,
    paddingVertical: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  comment_area: {
    maxWidth: Dimensions.get('window').width*80/100,
    width: null,
    height: null,
    borderRadius: 10,
    backgroundColor: THEME.TERTIARY.SHARP_COLOR,
    padding: 0,//10,  
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    elevation: 1,
    //overflow: 'hidden',
  },
  comment_area_name_icon: {
    width: null,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  comment_area_name: {
    lineHeight: 22,
    fontWeight: 'bold',
  },
  comment_area_icon: {
    color: 'black',
    fontSize: 24,
  },
  comment_area_text: {
    fontSize: 16,
    lineHeight: 22,
  },

  arrow_dropdown_icon: {
    color: THEME.TERTIARY.SHARP_COLOR,
    fontSize: 50,
  },

  option_area_mini: {
    //flex: 1,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: 10,
    marginBottom: 5,
  },
  option_area_text: {
    color: THEME.TERTIARY.COLOR,
    fontSize: 12,
  },
  option_area_icon: {
    color: THEME.TERTIARY.COLOR,
    fontSize: 25,
    marginRight: 0,
  },

  message_status: {
    color: THEME.TERTIARY.COLOR, 
    fontSize: 12,
    marginRight: 2,
  },

  comment_container_left_img: {
    position: "absolute",
    borderRadius: miniREDVALUE,
    width: miniREDVALUE+10,
    height: miniREDVALUE+10,
  },
})
  
export default Discussion