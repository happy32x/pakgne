import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  Easing,
  Animated,
  Platform,
  Keyboard,
  TextInput,
  StyleSheet,
  Dimensions,
  BackHandler,
  PanResponder,
  ImageBackground,
  ActivityIndicator,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from 'react-native'

import firebase from 'firebase'
import { LinearGradient } from 'expo-linear-gradient'

import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import IconEntypo from 'react-native-vector-icons/Entypo'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'

import DIMENSION from '../../INFO/DIMENSION'
import THEME from '../../INFO/THEME'
import BounceUpAndDownStatic from '../../Animations/BounceUpAndDownStatic'
import BounceUpAndDownVoiceNote from '../../Animations/BounceUpAndDownVoiceNote'
import { withNavigation } from 'react-navigation'

import EmojiInput from 'react-native-emoji-input'

import {
  commentVideo,
  getNewTokenFromApi_Filter,
} from '../../API/REQUEST'

import lockUP from '../../assets/lockUP.png'
import lockDOWN from '../../assets/lockDOWN.png'

import DiscussionEmojiKeyboard from './DiscussionEmojiKeyboard'

const AnimatedIconMaterialCommunityIcons = Animated.createAnimatedComponent(IconMaterialCommunityIcons)
const AnimatedIconEntypo = Animated.createAnimatedComponent(IconEntypo)

const REDVALUE = 50-10
const USER_IMG_SIZE = 100
const DEFAULT_IMG = '../../assets/default_100.jpg'
const SCREEN_WIDTH = Dimensions.get("window").width
const SCREEN_WIDTH_MID = SCREEN_WIDTH/2
const SCREEN_WIDTH_QUARTER = SCREEN_WIDTH/4
const SHINE_ANIM_LIMIT = -(SCREEN_WIDTH - 150)

class DiscussionPost extends Component {
  _isMounted = false  

  constructor(props) {     
    super(props)
    this.state = {
      pan: new Animated.ValueXY(),
      panY: new Animated.Value(0),
      scale: new Animated.Value(1),
      lockBackground: new Animated.Value(0),       
      
      text: '',
      emojiKeyboardActived: true,
      emojiKeyboardVisible: false,

      onVoiceNote: false,
      onVoiceNoteValidated: false,
      timeText: '00:00',

      shineAnim: new Animated.Value(0),
      blinkAnim: new Animated.Value(0),
      timeAnim: new Animated.Value(0),
      radiusAnim: new Animated.Value(40),
      chevronTranslateY: new Animated.Value(0),
    }            
    this.textInputSelection = 0
    this.backHandler = null

    this.canHideEmojiKeyboard = false
    this.autoShowKeyboard = false
    this.quoteAnim = new Animated.Value(0)

    this._quoteAnim = 0
    this._panHandlingGrant = false    
    this._panHandlingRelease = false

    this._onPanResponderGrantMoment = null
    this._onPanResponderReleaseMoment = null

    this.chevronAnimationMoment = null

    this._shineAnimationMoment = null
    this._blinkAnimationMoment = null
    this._timeAnimationMoment = null
    this._radiusAnimationMoment = null

    this._blink = 0
    //this._radius = 40
    this._beginTime = null
    this._durationTime = 0
    this._durationTimeMinutes = 0
    this._durationTimeSeconds = 0

    this._time = null
    this._text = ''

    this.sendData_commentDiscussion = this._sendData_commentDiscussion.bind(this)

    this.blinkAnimation = this._blinkAnimation.bind(this)
    this.timeAnimation = this._timeAnimation.bind(this)
    this.shineAnimation = this._shineAnimation.bind(this)
    this.radiusAnimation = this._radiusAnimation.bind(this)

    this.goBack = this._goBack.bind(this)
    this.keyboardDidShow = this._keyboardDidShow.bind(this)
    this.keyboardDidHide = this._keyboardDidHide.bind(this)
  }

  //FONCTION TRES TRES COMPLEXE SOUS RN UNE GROSSE MERDE !!! SHIIIIT FUCK YOU FUUUCK YOU RN
  //LE FUCKING PROBLEME ICI C'EST QUE LA POSITION DU CURSEUR EST INSTABLE ET IMPREVISIBLE
  //DANS TEXTINPUT
  EmojiSlicer = (text, index, emoji) => {   
    //Pour terminer cette partie il faudra ejecter l'app et utiliser
    //la solution trouvée sur stackOverFlow pour fair persister le focus sur le textinput
    //même lorsque le keyBoard dismiss

    //Il faudra également en amont créer une méthode qui
    //vérifie la difference entre le "index start" et "start end"
    //alors si ce chiffre est != 0, cela signifie qu'un texte est sélectionné
    //il faudra donc crée un "newText" qui ignore cette portion pour
    //simuler une suppretion de texte

    //let newIndex = index + 2 //Le problème ici est de savoir combien de case occupe 
                               //chaque emoji... Pour l'instant nous mettons 2 cases
                               //par emoji contient qu'il y aura des bugs potenciels
    let icon = String.fromCodePoint(parseInt(emoji, 16)) //Il faut essayer de voir si c cette méthode qui
                                                         //fait en sorte que se sont les emoji qui occupent
                                                         //2 cases au lieu de 1 comme avant

                                                         //Le problème peut aussi provenir du
                                                         //sale fucking clavier importé                                                    
    let newText = text.slice(0,index) + icon + text.slice(index,)    
    this.setState({text: newText})

    /*this.text_input.setNativeProps({
      selection: {
        start: newIndex,
        end: newIndex,
      }
    })
          
    this.textInputSelection = newIndex*/

    //Dernière chose, il faut handle la barre de merde par dafault 
    //qui s'affiche lorsqu'on sélectionne un texte. Cela pourri 
    //vraiment le design de l'App, ensuite il faudra créer una barre 
    //perso en remplacement et handle chacune de ses features 
  }

  _shineAnimation(localMoment) {
    this._shineAnimationMoment = localMoment
    this.state.shineAnim.setValue(0)
    Animated.sequence([
      this.state.onVoiceNote && this._shineAnimationMoment === localMoment ? Animated.delay(1000) : null,
      this.state.onVoiceNote && this._shineAnimationMoment === localMoment ? Animated.timing(
        this.state.shineAnim,
        {
          toValue: SHINE_ANIM_LIMIT,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }
      ) : null
    ]).start(() => {
      this.state.onVoiceNote && this._shineAnimationMoment === localMoment ? this.shineAnimation(Date.now()) : null
    })
  }

  _blinkAnimation(localMoment) {  
    this._blinkAnimationMoment = localMoment
    this._blink = this._blink ? 0:1
    Animated.sequence([
      this.state.onVoiceNote && this._blinkAnimationMoment === localMoment ? Animated.delay(500) : null,
      this.state.onVoiceNote && this._blinkAnimationMoment === localMoment ? Animated.timing(
        this.state.blinkAnim,
        {
          toValue: this._blink,
          duration: 0,
        }
      ) : null
    ]).start(() => {
      this.state.onVoiceNote && this._blinkAnimationMoment === localMoment ? this.blinkAnimation(Date.now()) : null
    })
  }

  _timeAnimation(localMoment) {
    this._timeAnimationMoment = localMoment

    this._currentTime = Math.abs(this._beginTime-Date.now())/1000
    this._durationTimeMinutes = Math.trunc( Math.floor(this._currentTime / 60) % 60 )
    if(this._durationTimeMinutes <= 9) {this._durationTimeMinutes = "0"+this._durationTimeMinutes}
    else{this._durationTimeMinutes = JSON.stringify(this._durationTimeMinutes) }
    this._durationTimeSeconds = Math.trunc( this._currentTime % 60 )
    if(this._durationTimeSeconds <= 9) {this._durationTimeSeconds = "0"+this._durationTimeSeconds}
    else{this._durationTimeSeconds = JSON.stringify(this._durationTimeSeconds) }
    this._durationTime = this._durationTimeMinutes+":"+this._durationTimeSeconds

    this.state.onVoiceNote && this._timeAnimationMoment === localMoment
      ? Animated.delay(100)
        .start(() => {
          this._textInputTime && this._timeAnimationMoment === localMoment
            ? this.state.onVoiceNote && this._timeAnimationMoment === localMoment
              ? this._textInputTime.setNativeProps({text: this._durationTime})
              : null
            : null

          this.state.onVoiceNote && this._timeAnimationMoment === localMoment ? this.timeAnimation(Date.now()) : null
        })
      : null
  }

  _radiusAnimation(localMoment, localRadius) {
    this._radiusAnimationMoment = localMoment
    Animated.sequence([
      this._radiusAnimationMoment === localMoment ? Animated.delay(0) : null,
      this._radiusAnimationMoment === localMoment ? Animated.timing(
        this.state.radiusAnim,
        {
          toValue: localRadius,
          duration: 150,
        }
      ) : null
    ]).start()
  }

  _sendData_commentDiscussion() {
    let data = null
    let text = this._text
    let time = this._time
    data = {
      key: 'NEW',
      val: () => {
        return {
          author_id: firebase.auth().currentUser.uid,
          author_pic: firebase.auth().currentUser.photoURL,
          author_name: firebase.auth().currentUser.displayName,
          message: text,
          messageTimeStamp: time,
        }
      }
    }

    this.props.addComment(data)
  }

  voiceNoteOnPressedIn = () => {
    this._beginTime = Date.now()
    //console.log('voiceNoteOnPressedIn')

    this.setState({onVoiceNote: true, timeText: '00:00'}, () => {
      //console.log('voiceNoteOnOn')
      this.state.shineAnim.setValue(0)
      this.state.blinkAnim.setValue(0)
      this.state.timeAnim.setValue(0)
      this.state.radiusAnim.setValue(40)

      this._blink = 0
      //this._radius = 40
      this._durationTime = 0
      this._durationTimeMinutes = 0
      this._durationTimeSeconds = 0

      this.blinkAnimation(Date.now())
      this.timeAnimation(Date.now())
      this.shineAnimation(Date.now())
      this.radiusAnimation(Date.now(), 10)      
    })
  }

  voiceNoteOnPressedOut = () => {
    //console.log('voiceNoteOnPressedOut')

    this.setState({onVoiceNote: false, timeText: '00:00'}, () => {
      this.radiusAnimation(Date.now(), 40)
      //console.log('voiceNoteOnOff')
    })
  }

  chevronAnimation = (d, localMoment) => {
    this.chevronAnimationMoment = localMoment
    let c = d === -2.5 ? 0:-2.5

    this.state.onVoiceNote && this.chevronAnimationMoment === localMoment 
      ? Animated.timing(
          this.state.chevronTranslateY,
          {
            toValue: c,
            duration: 500,
          }
        ).start(() => !this.state.onVoiceNoteValidated && this.state.onVoiceNote && this.chevronAnimationMoment === localMoment 
                      ? this.chevronAnimation(c, Date.now()) 
                      : null)
      : null
  }

  handlePressIn = () => {
    this.voiceNoteOnPressedIn()   

    Animated.parallel([
      Animated.spring(this.state.scale, {
        toValue: 2,
      }),
      Animated.spring(this.state.lockBackground, {
        toValue: -30,
        friction: 3,
        tension: 40,
      }),
    ]).start()

    this.chevronAnimation(0, Date.now())
  }

  handlePressOut = () => {
    this.voiceNoteOnPressedOut()    

    Animated.parallel([
      Animated.spring(this.state.scale, {
        toValue: 1,
        friction: 3,
        tension: 40,
      }),
      Animated.spring(this.state.lockBackground, {
        toValue: 0,
      }),
    ]).start()
  }

  handlePressCancel = () => {
    this.state.pan.setValue({x: 0, y: 0})
    this.state.panY.setValue(0)
    this.state.scale.setValue(1)
    this.state.lockBackground.setValue(0)
    this.setState({onVoiceNote: false, onVoiceNoteValidated: false, timeText: '00:00'}, () => {
      console.log('voiceNoteCancelled')      
    })
  }

  handleOnVoiceNoteValidated = () => {
    this.setState({onVoiceNoteValidated: true}, () => {
      this.radiusAnimation(Date.now(), 40)
      //console.log('voiceNoteOnOff')
    })

    Animated.parallel([
      Animated.spring(this.state.scale, {
        toValue: 1,
        friction: 3,
        tension: 40,
      }),
      Animated.spring(this.state.lockBackground, {
        toValue: 0,
      }),
    ]).start()
  }

  closeQuote = () => {
    Animated.timing(this.quoteAnim, {
      toValue: SCREEN_WIDTH,
      duration: 200,
    }).start(() => { 
      this.quoteAnim = new Animated.Value(0)     
      this.props.delQuote('','')   
    })
  }

  componentWillMount() {
    
    this._panResponderTextInput = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        console.log("ggogoog")
      },

      onPanResponderRelease: (e, {vx, vy}) => {
             
      },
          
    })

    this._panResponderQuote = PanResponder.create({
      //onStartShouldSetPanResponder: () => true,
      //onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {},

      onPanResponderRelease: (e, {vx, vy}) => {
        Math.abs(this._quoteAnim) > SCREEN_WIDTH_QUARTER
        ? Animated.timing(this.quoteAnim, {
            toValue: this._quoteAnim > 0 ? SCREEN_WIDTH : -SCREEN_WIDTH,
            duration:200,            
          }).start(() => {
            this.quoteAnim = new Animated.Value(0)     
            this.props.delQuote('','')
          })
        : Animated.timing(this.quoteAnim, {
            toValue: 0,
            duration: 200,
          }).start()        
      },

      onPanResponderMove: (e, {dx, dy}) => {  
        this._quoteAnim = dx
        this.quoteAnim.setValue(dx)    
      }          
    })

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        let localMoment = Date.now()
        this._onPanResponderGrantMoment = localMoment

        this._panHandlingGrant = false
        this._panHandlingRelease = false

        this._onPanResponderGrantMoment === localMoment
          ? Animated.delay(100)
            .start(() => {
              if(!this._panHandlingRelease && this._onPanResponderGrantMoment === localMoment) {
                this._panHandlingGrant = true
                this.handlePressIn()
                this.state.pan.setValue({x: 0, y: 0})
                //console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLOLLLLLLLLLLLLLLLLLLLLLLLLLLLL')
              }
            })
          : null
      },

      onPanResponderRelease: (e, {vx, vy}) => {
        let localMoment = Date.now()
        this._onPanResponderReleaseMoment = localMoment

        this._onPanResponderReleaseMoment === localMoment ? this._panHandlingRelease = true : null
        if(this._panHandlingGrant && this._onPanResponderReleaseMoment === localMoment) {
          this.handlePressOut()
          this.state.pan.setValue({x: 0, y: 0})
          this.state.panY.setValue(0)
          //this.state.pan.flattenOffset();          
        }        
      },

      onPanResponderMove: (e, {dx, dy}) => {
        //console.log(dy)
        /*Animated.event([
          //null, {dx: this.state.pan.x, dy: this.state.pan.y},
          null, {dx: this.state.pan.x},
        ])*/
        if(this._panHandlingGrant) {
          if(dx >= -100) {
            dx > 0 
              ? this.state.pan.setValue({x: 0, y: 0})           
              : this.state.pan.setValue({x: dx, y: 0})                       
          } else {
            this._panHandlingGrant = false
            this.handlePressOut()
            this.state.pan.setValue({x: 0, y: 0})
            this.state.panY.setValue(0)
          }

          if(dy >= -45) {
            dy > 0
              ? this.state.panY.setValue(0)              
              : this.state.panY.setValue(dy)                          
          } else {
            this._panHandlingGrant = false
            this.handleOnVoiceNoteValidated()
            this.state.pan.setValue({x: 0, y: 0})
            this.state.panY.setValue(0)
          }

        }
      },
    })
  }

  changeText = (text) => {    
    //this.setState({text}, () => console.log('CommentPostYoutube :: changeText :: text :: ' + this.state.text))

    if(this.state.panY !== 0 || this.state.pan.x !== 0 || this.state.scale !== 1) {
      this.state.pan.setValue({x: 0, y: 0})
      this.state.panY.setValue(0)
      this.state.scale.setValue(1)
      this.state.lockBackground.setValue(0)
    }
    
    this.setState({text})
  }

  _keyboardDidShow(e) {
    console.log('Keyboard Shown :: ' + e.endCoordinates.height)  
    this.canHideEmojiKeyboard =true
  }

  _keyboardDidHide() {
    console.log('Keyboard Hidden')
    this.text_input.blur()
    this.canHideEmojiKeyboard ?this.goBack() :null
  }

  componentDidMount() {

    this._isMounted = true

    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow,
    )

    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    )

    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      console.log("fuck you babe !!")
       if(this.state.emojiKeyboardVisible === false) {
        return false
      }

      //works best when the goBack is async
      this.goBack()
      return true
    })
  }

  async _goBack() {
    await this.setState({
      emojiKeyboardActived: true,
      emojiKeyboardVisible: false,
    })
  }

  componentWillUnmount() {
    this._isMounted = false

    this.backHandler.remove()

    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  render() {
    let { pan, panY, scale } = this.state
    let rotate = '0deg'

    let [translateX, translateY] = [pan.x, pan.y]
    let imageStyle = {transform: [{translateX}, {translateY}, {rotate}, {scale}]}
    let marginRightAnim = this.state.pan.x.interpolate({
      inputRange: [-100, 0],
      outputRange: [50, 0]
    })

    let lockBackgroundTranslateY = panY.interpolate({
      inputRange: [-45, 0],
      outputRange: [-45, 0]
    })
    let lockBackgroundHeight = panY.interpolate({
      inputRange: [-45, 0],
      outputRange: [25, 50]
    })
    let chevronOpacity = panY.interpolate({
      inputRange: [-45, 0],
      outputRange: [0, 0.3]
    })

    return (
        <View style={styles.comment_container}>          
        {          
          this.props.quote
          ? <Animated.View style={{
              //alignSelf: 'stretch',
              //backgroundColor: THEME.TERTIARY.SHARP_COLOR_DARK,
              //width: Dimensions.get("window").width,            
              width: null,
              margin: 0,
              marginBottom: 5,
              marginHorizontal: 0,
              borderRadius: 5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              //backgroundColor: 'red',
              transform: [{translateX:this.quoteAnim}],
            }}> 
              <View 
                {...this._panResponderQuote.panHandlers}
                style={{
                  //alignSelf: 'stretch',
                  //width: Dimensions.get("window").width-65,
                  flex: 1,
                  backgroundColor: THEME.TERTIARY.SHARP_COLOR_DARK,
                  margin: 0,
                  marginBottom: 0,
                  marginHorizontal: 0,
                  borderRadius: 5,
                  overflow: 'hidden',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >      
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR, true)}
                  onPress={() => {
                    console.log("quote touch !")
                  }}
                >        
                  <View                 
                    style={{
                      alignSelf: 'stretch',
                      borderLeftColor: THEME.PRIMARY.BACKGROUND_COLOR,
                      borderLeftWidth: 5,
                      padding: 5,
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{
                        fontWeight: 'bold',
                        color: THEME.PRIMARY.BACKGROUND_COLOR,
                        alignSelf: 'flex-start',
                        fontSize: 10,
                      }}
                    >
                      Happy Julien{/*this.props.data.val().author_name*/}
                    </Text>
                    <Text numberOfLines={2} style={{alignSelf: 'flex-start'}}>
                      Et puis quoi !!!{/*this.props.data.val().message*/}
                      Et puis quoi !!!
                      Et puis quoi !!!
                      Et puis quoi !!!
                      Et puis quoi !!!
                      Et puis quoi !!!
                      Et puis quoi !!!
                      Et puis quoi !!!
                      Et puis quoi !!!
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              </View>

              <BounceUpAndDownStatic
                scale={0.8}
                onPress={() => {
                  console.log('close button pressed !')
                  this.closeQuote()
                }}
              >
                <View style={{
                  width: REDVALUE+10,
                  height: REDVALUE+10,
                  //borderRadius: 25,
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 5,
                  marginRight: 1,
                  overflow: 'hidden',
                }}
                >
                  <View style={{
                    width: REDVALUE+10,
                    height: REDVALUE+10,
                    backgroundColor:'gray',
                    opacity:0.4,
                    borderRadius: 25,
                  }}/>
                  <IconMaterialCommunityIcons style={[styles.submit_button_icon, {position: 'absolute'}]} name="close" />
                </View>
              </BounceUpAndDownStatic>

            </Animated.View>
            : null
          }

          <View style={styles.comment_container_right}>                          
            <Animated.View
              style={[styles.comment_area, {
                flex: 1,
                //width: '100%',
                borderWidth: 1,
                borderRadius: 40, //REDVALUE-10
                borderTopRightRadius: this.state.radiusAnim,
                borderBottomRightRadius: this.state.radiusAnim,
                /*borderBottomRightRadius: this.state.radiusAnim.interpolate({
                                          inputRange: [40, 10],
                                          outputRange: [40, 10]
                                        }),*/
                borderColor: THEME.TERTIARY.WAVE_COLOR,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginRight: marginRightAnim,//0 <> 50
              }]}
            > 
              <View style={{
                alignSelf: 'flex-end',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
                opacity: this.state.onVoiceNote ? 0 : 1,
              }}>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR, true)}
                  onPress={() => {
                    console.log("emoji touch !")     
                    //this.EmojiSlicer(this.state.text, this.textInputSelection, "C")        
                    //this.state.emojiKeyboardActived ?Keyboard.dismiss() :null
                    if(this.state.emojiKeyboardActived) {
                      this.canHideEmojiKeyboard = false
                      Keyboard.dismiss()
                      this.setState({
                        emojiKeyboardActived: false,
                        emojiKeyboardVisible: true,
                      })
                    } else {
                      this.text_input.focus()
                      this.setState({
                        emojiKeyboardActived: true,              
                      })
                    }          
                  }}
                >
                  <View style={styles.emoji_button_container}>
                    {
                      this.state.emojiKeyboardActived
                      ? <IconMaterialCommunityIcons style={styles.emoji_button_icon} name="emoticon-outline" /> 
                      : <IconMaterialCommunityIcons style={styles.emoji_button_icon} name="keyboard" />                                            
                    }
                  </View>
                </TouchableNativeFeedback>
              </View>

              <View                 
                style={{
                  flex:1,
                  marginBottom: 0,
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  //backgroundColor: 'red',
                }}
              >
                  <TextInput
                    {...this._panResponderTextInput.panHandlers}
                    ref={x => {this.text_input = x}}
                    style={{
                      width: '100%',
                      maxHeight: Dimensions.get("window").height/4,
                      paddingVertical: 10,
                      paddingRight: 20,
                      fontWeight:'normal',
                      fontSize: 16,
                      color: 'black',
                      opacity: this.state.onVoiceNote ?0:1,
                      //backgroundColor: 'yellow',
                    }}
                    placeholder={this.state.onVoiceNote ?"" :"Discutez ..."}
                    selectionColor={THEME.PRIMARY.BACKGROUND_COLOR}
                    autoFocus={this.props.autoFocus}
                    underlineColorAndroid="transparent"
                    autoCorrect={true}
                    autoCapitalize={'none'}
                    keyboardType={'default'}
                    onChangeText={this.changeText}
                    value={this.state.text}
                    multiline={this.state.onVoiceNote ?false :true}
                    textAlignVertical={'top'}
                    editable={true}
                    showSoftInputOnFocus={false}
                    caretHidden={false}
                    selectionColor={THEME.PRIMARY.BACKGROUND_COLOR}                  
                    onSelectionChange={(e) => {
                      console.log(e.nativeEvent.selection)
                      this.textInputSelection = e.nativeEvent.selection.start                      
                    }}
                    onFocus={() =>
                      this.setState({
                        emojiKeyboardActived: true,
                        emojiKeyboardVisible: true,
                      })
                    }
                  />
              </View>
              {
                this.state.text !== '' || this.state.onVoiceNote || this.state.onVoiceNoteValidated
                //true
                ? null
                : <View style={{
                    alignSelf: 'flex-end',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-end',                   
                  }}>
                    <TouchableNativeFeedback
                      background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR, true)}
                      onPress={() => {
                        console.log("camera touch !")
                      }}
                    >
                      <View style={styles.camera_button_container}>                         
                        <IconMaterialCommunityIcons style={styles.camera_button_icon} name="camera" />                        
                      </View>
                    </TouchableNativeFeedback>
                  </View>
              }
              {
                this.state.onVoiceNoteValidated
                //true
                ? <View style={{
                    alignSelf: 'flex-end',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-end',                                      
                  }}>
                    <TouchableNativeFeedback
                      background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR, true)}
                      onPress={() => {
                        console.log("cancel touch !")
                        this.handlePressCancel()
                      }}
                    >
                      <View style={{
                        height: REDVALUE+10,
                        borderRadius: 0,
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 0,
                        marginRight: 0,
                        paddingLeft: 12,
                        paddingRight: 15,
                        paddingBottom: 3,
                      }}>                         
                        <Text style={{color:'red',fontSize:15}}>annuler</Text>
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                : null
              }          
              {
                this.state.onVoiceNote && !this.state.onVoiceNoteValidated
                ? <View style={{
                    flex: 1,
                    position: 'absolute',
                    right: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    //backgroundColor: 'green',
                  }}>                    
                    <View style={[styles.camera_button_container, {
                      width: null,
                      paddingLeft: 20,
                      paddingRight: 20,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                    }]}>                      
                      <View style={[styles.camera_button_container, {
                        width: null,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                      }]}>
                        <IconSimpleLineIcons name="arrow-left" style={{color: THEME.TERTIARY.COLOR,fontSize: 10,marginRight:5}}/>
                        <Text style={{color:THEME.TERTIARY.COLOR,fontSize:10}}>Glisser pour annuler</Text>
                      </View>                      
                    </View>
                   
                    <Animated.View style={{
                      position: 'absolute',
                      opacity: 0.6,
                      //right: 0,
                      width: 20,
                      height: 25,
                      backgroundColor: 'transparent',
                      transform: [{ translateX: this.state.shineAnim }],
                      /*transform: [
                        {translateX: this.state.shineAnim.interpolate({
                          inputRange: [SHINE_ANIM_LIMIT, 0],
                          outputRange: [SHINE_ANIM_LIMIT, 0]
                        })}
                      ],*/
                    }}>
                      <LinearGradient
                        start={[1, 0]}
                        end={[0, 0]}
                        colors={[THEME.TERTIARY.SHARP_COLOR, 'transparent']} //'rgba(0,0,0,0.5)'
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          height: 25,
                          width: 10,
                        }}
                      />
                      <LinearGradient
                        start={[0, 0]}
                        end={[1, 0]}
                        colors={[THEME.TERTIARY.SHARP_COLOR, 'transparent']} //'rgba(0,0,0,0.5)'
                        style={{
                          position: 'absolute',
                          right: 0,
                          top: 0,
                          height: 25,
                          width: 10,
                        }}
                      />
                    </Animated.View>                    
                  </View>
                : null
              }
              {
                this.state.onVoiceNote
                ? <View style={{
                    position: 'absolute',
                    width: null,//(Dimensions.get("window").width - 70) / 2,//5-50-5-5-5 = 70,
                    marginTop: 1,
                    marginLeft: 1,
                    height: 50-2,
                    alignSelf: 'flex-start',
                    borderTopLeftRadius: REDVALUE,
                    borderBottomLeftRadius: REDVALUE,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    paddingLeft: 10,
                    paddingRight: 1,
                    backgroundColor: THEME.TERTIARY.SHARP_COLOR,//'yellow'
                  }}>
                    <AnimatedIconMaterialCommunityIcons
                      name="microphone"
                      style={{
                        opacity:this.state.blinkAnim,
                        color: 'red',
                        fontSize: 25,
                        marginRight:10,
                    }}/>
                    <TextInput
                      ref={x => this._textInputTime = x}
                      style={{color: 'red',fontSize: 17,backgroundColor: 'transparent', width: 52}}
                      placeholder="00:00"
                      autoFocus={false}
                      underlineColorAndroid="transparent"
                      autoCorrect={false}
                      autoCapitalize={'none'}
                      //onChangeText={this.changeText}
                      value={this.state.timeText}
                      multiline={false}
                      editable={false}
                    />
                    <LinearGradient
                      start={[0, 0]}
                      end={[1, 0]}
                      colors={[THEME.TERTIARY.SHARP_COLOR, 'transparent']} //'rgba(0,0,0,0.5)'
                      style={{
                        position: 'absolute',
                        right: -19,
                        top: 0,
                        height: 50-2,
                        width: 20,
                      }}
                    />
                  </View>
                : null
              }
            </Animated.View>

            {
              this.state.onVoiceNoteValidated || this.state.text !== ''
              ? <BounceUpAndDownStatic
                  scale={0.8}
                  onPress={() => {
                    //this.EmojiSlicer(this.state.text, this.textInputSelection, "A")
                    if(this.state.text !== '') {
                      console.log('submit button pressed !')
                      this._time = Date.now()
                      this._text = this.state.text
                      this.setState({text:''}, () => this.sendData_commentDiscussion())
                    } else {
                      console.log('submit voice button pressed !')
                    }             
                  }}
                >
                  <View style={styles.submit_button_container}>
                    <IconIonicons style={[styles.submit_button_icon, {marginLeft:4,fontSize:23} ]} name="md-send" />
                  </View>
                </BounceUpAndDownStatic>
              : <Animated.View style={[styles.submit_button_container, imageStyle]} {...this._panResponder.panHandlers}>
                  <Animated.View style={{
                    position: 'absolute',
                    backgroundColor: THEME.TERTIARY.SHARP_COLOR,
                    height: lockBackgroundHeight,//50 <> 25
                    width: 25,
                    top: this.state.lockBackground,//0 <> -30 then -30 <> -100
                    borderRadius: 25,
                    borderWidth: 0.3,
                    borderColor: THEME.TERTIARY.WAVE_COLOR,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: [{ translateY: lockBackgroundTranslateY }],                    
                  }}>                    
                    <ImageBackground source={lockDOWN} style={{width: 10, height: 10}} />          
                    <ImageBackground
                      source={lockUP} 
                      style={{
                        width: 10,
                        height: 10,
                        position: 'absolute',
                        top: 4.5,
                        color: THEME.TERTIARY.COLOR,
                        opacity: 1,
                      }}
                    />                  
                    <AnimatedIconEntypo
                      name="chevron-small-up"
                      style={{
                        position: 'absolute',
                        top: 12,//10.5, 
                        color: THEME.TERTIARY.COLOR,
                        opacity: chevronOpacity,
                        transform: [{ translateY: this.state.chevronTranslateY }], 
                      }}  
                    />
                  </Animated.View>
                  <View style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: THEME.PRIMARY.BACKGROUND_COLOR,                                                            
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <IconMaterialCommunityIcons style={styles.submit_button_icon} name="microphone" />
                  </View>                  
                </Animated.View>

                /*<BounceUpAndDownVoiceNote
                  scale={2}
                  voiceNoteOnPressedIn={this.voiceNoteOnPressedIn}
                  voiceNoteOnPressedOut={this.voiceNoteOnPressedOut}             
                >
                  <View style={styles.submit_button_container}>                      
                    <IconMaterialCommunityIcons style={styles.submit_button_icon} name="microphone" />
                  </View>
                </BounceUpAndDownVoiceNote>*/
            }
          </View>  

          {
            this.state.emojiKeyboardVisible
              ? <View style={{                      
                  margin: -5,
                  marginTop: 5,
                  alignSelf: 'stretch',
                  height: 246,
                  backgroundColor: 'gray',
                }}>
                  <EmojiInput
                    onEmojiSelected={(emoji) => {
                      //console.log(emoji)
                      this.EmojiSlicer(this.state.text, this.textInputSelection, emoji.lib.unified)
                    }}
                    enableSearch={false}
                    showCategoryTitleInSearchResult={false}
                    categoryHighlightColor={THEME.PRIMARY.BACKGROUND_COLOR}
                    categoryLabelTextStyle={{fontSize: 15}}                    
                    emojiFontSize={20}                    
                    numColumns={7}
                  />
                </View>
              : null
          }
          
        </View>
    )
  }
}

const styles = StyleSheet.create({
  comment_container: {    
    width: Dimensions.get("window").width,
    height: null,    
    //maxHeight: Dimensions.get("window").height/3,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderTopWidth: 0,
    borderTopColor: THEME.ON_LOAD_COLOR,
    padding: 5,
    marginBottom: 0,
  },
  comment_container_left: {
    width: REDVALUE-20,
    flexDirection: 'column',
    alignItems: 'center' ,
    justifyContent:'flex-start',
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
    //flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: 0,
  },
  comment_area: {    
    //borderRadius: 10,
    backgroundColor: THEME.TERTIARY.SHARP_COLOR,
    padding: 0,
    paddingLeft: 0,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  submit_button_container: {
    width: REDVALUE+10,
    height: REDVALUE+10,
    borderRadius: 25,
    //maxHeight: Dimensions.get("window").height/3 -15 -15,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    marginRight: 1,
    backgroundColor: THEME.PRIMARY.BACKGROUND_COLOR,
  },
  submit_button_icon: {
    color: THEME.PRIMARY.COLOR,
    fontSize: 25
  },

  emoji_button_container: {
    width: REDVALUE+5,
    height: REDVALUE+10,    
    borderRadius: 0,
    //maxHeight: Dimensions.get("window").height/3 -15 -15,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 2,
    //backgroundColor: 'green'
  },
  emoji_button_icon: {
    color: THEME.TERTIARY.COLOR,
    fontSize: 26,
  },

  camera_button_container: {
    width: REDVALUE+20,
    height: REDVALUE+10,    
    borderRadius: 0,
    //maxHeight: Dimensions.get("window").height/3 -15 -15,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 0,
    marginRight: 2,
    paddingLeft: 0,
    //backgroundColor: 'green'
  },
  camera_button_icon: {
    color: THEME.TERTIARY.COLOR,
    fontSize: 26,
  },
})

export default withNavigation(DiscussionPost)

