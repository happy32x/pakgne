import React from 'react'
import {
  Platform,
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native'

import BounceUpAndDownStatic from '../Animations/BounceUpAndDownStatic'
import { withNavigation } from 'react-navigation'

import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'
import IconOcticons from 'react-native-vector-icons/Octicons'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import THEME from '../INFO/THEME'
import user_profile_pic from '../assets/actrices-pakgne-pardon-internaute-jewanda.jpg'

import YoutubeSubscribeButton from './YoutubeSubscribeButton'
import firebase from 'firebase'

import { 
  getAccessToken,
  setAccessToken,
} from '../Store/storeData'

const DEFAULT_IMG = '../assets/default_100.jpg'
const REDVALUE = 100
const MESSAGE = 'Option indisponible dans cette version'

class UserProfileList extends React.Component{

  renderSeparator = () => {
    return (
      <View style={styles.render_separator} />
    )
  }

  /*
  componentDidMount() {
  
    getAccessToken().then(accessToken => {
      console.log("UserProfileList :: componentDidMount() :: getAccessToken() :: accessToken :: " + accessToken)       
      setAccessToken(accessToken).then(() => {
        console.log('UserProfileList :: componentDidMount() :: setAccessToken() :: accessToken successful saved !')        
      })
    })  
  
  }
  */

  render() {
    return (
      <ScrollView 
        style={{ 
          backgroundColor: THEME.PRIMARY.COLOR,           
          flex: 1,
        }}
      >          
          <View style={styles.main_container}>
            <BounceUpAndDownStatic
              scale={.8}
              onPress={() => {
                this.props.navigation.navigate('ImageViewer', { 
                  title: firebase.auth().currentUser.displayName,
                  imgURLPreview: firebase.auth().currentUser.photoURL,                
                })
              }}
            >
              <View style={styles.user_pic_container_one}>                
                <Image
                  style={styles.user_pic} 
                  defaultSource={require(DEFAULT_IMG)}
                  source={{uri: firebase.auth().currentUser.photoURL}} 
                />
                <View style={styles.camera_container}>
                  <IconIonicons style={styles.camera_icon} name="md-camera" />
                </View>
              </View>
            </BounceUpAndDownStatic>
          </View>

          <TouchableNativeFeedback 
            background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,false)}
            onPress={() => { 
              this.props.navigation.navigate('ParameterElement', { 
                title: 'Nom',
                type: 'Ionicons',
                icon: 'md-person',
                color: THEME.TERTIARY.COLOR,
                message: MESSAGE,
              }) 
            }}
          >
            <View style={styles.main}>

              <View style={styles.left_container}>
                <IconIonicons style={styles.left_icon} name="md-person" />
              </View>

              <View style={styles.right_container}>      
                <View style={styles.right_container_text}>
                  <View style={styles.right_container_text_one}>
                    <Text style={styles.right_text_one}>Nom</Text>
                  </View>
                  <View style={styles.right_container_text_two}>
                    <Text style={styles.right_text_two}>{firebase.auth().currentUser.displayName}</Text>
                  </View>
                </View>
                <View style={styles.right_container_icon}>
                  <IconMaterialCommunityIcons style={styles.right_icon} name="pencil" />
                </View>
              </View>    

            </View>
          </TouchableNativeFeedback>             

          <TouchableNativeFeedback 
            background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,false)}
            onPress={() => { 
              this.props.navigation.navigate('ParameterElement', { 
                title: 'Email',
                type: 'Ionicons',
                icon: 'md-mail',
                color: THEME.TERTIARY.COLOR,
                message: MESSAGE,
              }) 
            }}
          >
            <View style={styles.main}>

              <View style={styles.left_container}>
                <IconIonicons style={styles.left_icon} name="md-mail" />
              </View>

              <View style={styles.right_container}>      
                <View style={styles.right_container_text}>
                  <View style={styles.right_container_text_one}>
                    <Text style={styles.right_text_one}>Email</Text>
                  </View>
                  <View style={styles.right_container_text_two}>
                    <Text style={styles.right_text_two}>{firebase.auth().currentUser.email}</Text>
                  </View>
                </View>
                <View style={styles.right_container_icon}>
                  <IconMaterialCommunityIcons style={styles.right_icon} name="pencil" />
                </View>
              </View>    

            </View>
          </TouchableNativeFeedback>                                     

          <TouchableNativeFeedback 
            background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,false)}
            onPress={() => { 
              this.props.navigation.navigate('ParameterElement', { 
                title: 'Numero de téléphone',
                type: 'MaterialCommunityIcons',
                icon: 'phone',
                color: THEME.TERTIARY.COLOR,
                message: MESSAGE,
              }) 
            }}
          >
            <View style={styles.main}>

              <View style={styles.left_container}>
                <IconMaterialCommunityIcons style={styles.left_icon} name="phone" />
              </View>

              <View style={styles.right_container_without_borderBottom}>      
                <View style={styles.right_container_text}>
                  <View style={styles.right_container_text_one}>
                    <Text style={styles.right_text_one}>Téléphone</Text>
                  </View>
                  <View style={styles.right_container_text_two}>
                    <Text style={styles.right_text_two}>+237693284232</Text>
                  </View>
                </View>
                <View style={styles.right_container_icon}>
                  <IconMaterialCommunityIcons style={styles.right_icon} name="pencil" />
                </View>
              </View>    

            </View>
          </TouchableNativeFeedback>                                         

          {this.renderSeparator()}

          <YoutubeSubscribeButton />

          {this.renderSeparator()}

          <BounceUpAndDownStatic
            scale={.8}            
            onPress={() => {               
              //this.props.navigation.navigate('Main') 
              firebase.auth().signOut()
            }}
          >
            <View style={styles.logOut_container}>
              <View style={styles.logOut_button}>     
                <IconMaterialCommunityIcons style={styles.logOut_button_icon} name="logout" />         
                <Text style={styles.logOut_button_text}>  Déconnexion</Text>              
              </View>
            </View>
          </BounceUpAndDownStatic>   

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  render_separator: {
    height: 1,
    width: "100%",
    backgroundColor: THEME.TERTIARY.SEPARATOR_COLOR,    
  },

  main_container: {
    alignItems:'center',
    justifyContent:'center',
    paddingTop: 15,
    paddingBottom: 15,
  },
  user_pic_container_one: { 
    height:REDVALUE, 
    width:REDVALUE 
  },
  user_pic_background: {
    flex: 1, 
    borderRadius:REDVALUE, 
    height: null, 
    width: null 
  },
  user_pic: {
    position: "absolute",
    borderRadius: REDVALUE, 
    width: REDVALUE,
    height: REDVALUE,
  },
  camera_container: {
    position: "absolute",
    alignItems:'center', 
    justifyContent:'center', 
    right: 0,
    bottom: 0,
    borderRadius: 40, 
    width: 40,
    height: 40,
    backgroundColor: THEME.PRIMARY.BACKGROUND_COLOR,
  },
  camera_icon: { 
    color: THEME.PRIMARY.COLOR, 
    fontSize:25,
  },


  main: {     
    flexDirection:'row', 
    width: '100%', 
  },
  left_container: { 
    alignItems:'center', 
    justifyContent:'center', 
    flexDirection:'row',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  left_icon: { 
    fontWeight:'bold', 
    fontFamily:'normal', 
    color: THEME.PRIMARY.BACKGROUND_COLOR, 
    fontSize:20,
  },
  right_container: { 
    flex: 1, 
    flexDirection:'row',       
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: THEME.TERTIARY.SEPARATOR_COLOR, 
  },
  right_container_without_borderBottom: { 
    flex: 1, 
    flexDirection:'row',       
    paddingTop: 15,
    paddingBottom: 15,
  },
  right_container_text: {
    flex: 1, 
    flexDirection:'column',   
  },
  right_container_text_one: {
    alignItems:'center',
    justifyContent:'flex-start',
    flexDirection:'row',
    paddingBottom: 3,
  },
  right_container_text_two: {
    alignItems:'center',
    justifyContent:'flex-start',
    flexDirection:'row',
  },
  right_text_one: { 
    color: THEME.SECONDARY.WAVE_COLOR, 
    fontSize: 13,
  }, 
  right_text_two: {
    color: THEME.SECONDARY.COLOR,
    fontSize: 16,
  },
  right_container_icon: {
    alignItems:'center', 
    justifyContent:'center', 
    flexDirection:'row',
    paddingLeft: 15,
    paddingRight: 15,
  },
  right_icon: {
    fontWeight:'bold', 
    fontFamily:'normal', 
    color: THEME.TERTIARY.COLOR, 
    fontSize:20,
  },

  logOut_container:{
    alignItems:'center',
    justifyContent:'center',   
    paddingTop: 25,
    paddingBottom: 25,
  },
  logOut_button: {    
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    borderRadius: 40,
    width: '70%',
    height: 40,
    backgroundColor: 'red',
  },
  logOut_button_text: { 
    color: THEME.PRIMARY.COLOR, 
    fontWeight: 'bold',
    fontSize:15,
  },
  logOut_button_icon: { 
    color: THEME.PRIMARY.COLOR, 
    fontSize:20,
  },
})

export default withNavigation(UserProfileList)