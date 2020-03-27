import React from 'react'
import { 
  Platform, 
  Text, 
  View, 
  Image,
  Share,
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

import firebase from 'firebase'
import { imageResizer } from '../AI/ImageResizer'

const DEFAULT_IMG = '../assets/default_100.jpg'
const REDVALUE = 60
const MESSAGE = 'Option indisponible dans cette version'

const USER_IMG_SIZE = 100


class ParameterViewerContent extends React.Component{
  renderSeparator = () => {
    return (
      <View style={styles.render_separator} />
    )
  }

  render() {
    return (
      <View 
        style={{ 
          backgroundColor: THEME.PRIMARY.COLOR, 
          paddingTop: Platform.OS !== 'ios' ? this.props.headerMaxHeight : 0, 
          flex: 1,
        }}
      >
          <TouchableNativeFeedback 
            background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,false)}
            onPress={() => { 
              this.props.navigation.navigate('UserProfile', {}) 
            }}
          >
            <View style={styles.user_info_container}>
              <View style={styles.user_pic_container}>

                <BounceUpAndDownStatic
                  scale={.8}
                  onPress={() => {
                    this.props.navigation.navigate('ImageViewerDynamic', { 
                      title: firebase.auth().currentUser.displayName,                    
                      imgURLPreview: imageResizer(firebase.auth().currentUser.photoURL, USER_IMG_SIZE),               
                    })
                  }}   
                  
                  /*onPress={() => {
                    this.props.navigateTo('ImageViewerDynamic', {
                      title: this.props.data.snippet.topLevelComment.snippet.authorDisplayName,
                      imgURLPreview: imageResizer(this.props.data.snippet.topLevelComment.snippet.authorProfileImageUrl, USER_IMG_SIZE),
                    })
                  }}*/
                >
                  <View style={styles.user_pic_container_one}>                    
                    <Image 
                      style={styles.user_pic}
                      defaultSource={require(DEFAULT_IMG)}
                      source={{uri: firebase.auth().currentUser.photoURL}} />
                  </View>
                </BounceUpAndDownStatic>

              </View>
              <View style={styles.user_name_container}>
                <Text style={styles.user_name}>{firebase.auth().currentUser.displayName}</Text>
                <Text style={styles.user_description}>Appuyer pour plus d'infos</Text>          
              </View>
            </View>
          </TouchableNativeFeedback>           

          <TouchableNativeFeedback 
            background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,false)}
            onPress={() => {
              Share.share({
                message: `Rejoignez la communauté Pakgne \u{1F60E} dès maintenant ! 🌟🌟🌟 \n\n https://www.youtube.com/channel/UCWitG84eyFDN5xj8oLXwVhA`,
                url: `https://www.youtube.com/channel/UCWitG84eyFDN5xj8oLXwVhA`,
                title: `Rejoignez la communauté Pakgne dès maintenant !`,                
              }, {
                dialogTitle: 'Ou se trouve(nt) t-il(s) ?',
                excludedActivityTypes: [
                  'com.apple.UIKit.activity.PostToTwitter'
                ]
              })
            }} 
            /*onPress={() => { 
              this.props.navigation.navigate('ParameterElement', { 
                title: 'Inviter',
                type: 'Ionicons',
                icon: 'md-person-add',
                color: THEME.TERTIARY.COLOR,
                message: MESSAGE,
              }) 
            }}*/            
          >
            <View style={styles.band}>
              <View style={styles.icon_container}>
                <IconIonicons style={styles.icon} name="md-person-add" />
              </View>
              <View style={styles.text_container}>
                <Text style={styles.text}>Invitez un ou plusieurs amis</Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          {this.renderSeparator()}

          <TouchableNativeFeedback 
            background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,false)}
            onPress={() => { 
              this.props.navigation.navigate('ParameterElement', { 
                title: 'Galéries',
                type: 'Ionicons',
                icon: 'md-images',
                color: THEME.TERTIARY.COLOR,
                message: MESSAGE,
              }) 
            }}
          >
            <View style={styles.band}>
              <View style={styles.icon_container}>
                <IconIonicons style={styles.icon} name="md-images" />
              </View>
              <View style={styles.text_container}>
                <Text style={styles.text}>Galeries</Text>
              </View>
            </View>
          </TouchableNativeFeedback>                      

          {this.renderSeparator()}

          <TouchableNativeFeedback 
            background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,false)}
            onPress={() => { 
              this.props.navigation.navigate('ParameterElement', { 
                title: 'Notifications',
                type: 'Ionicons',
                icon: 'md-notifications',
                color: THEME.TERTIARY.COLOR,
                message: MESSAGE,
              }) 
            }}
          >
            <View style={styles.band}>
              <View style={styles.icon_container}>
                <IconIonicons style={styles.icon} name="md-notifications" />
              </View>
              <View style={styles.text_container}>
                <Text style={styles.text}>Notifications</Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          {this.renderSeparator()}

          <TouchableNativeFeedback 
            background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,false)}
            onPress={() => { 
              this.props.navigation.navigate('ParameterElement', { 
                title: 'Langue',
                type: 'MaterialCommunityIcons',
                icon: 'earth',
                color: THEME.TERTIARY.COLOR,
                message: MESSAGE,
              }) 
            }}
          >
            <View style={styles.band}>
              <View style={styles.icon_container}>
                <IconMaterialCommunityIcons style={styles.icon} name="earth" />
              </View>
              <View style={styles.text_container}>
                <Text style={styles.text}>Langue</Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          {this.renderSeparator()}
          
          <TouchableNativeFeedback 
            background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,false)}                      
            onPress={() => { 
              this.props.navigation.navigate('Cgu', {
                title: 'Conditions d\'utilisation' 
              }) 
            }}
          >
            <View style={styles.band}>
              <View style={styles.icon_container}>
                <IconIonicons style={styles.icon} name="md-bookmarks" />
              </View>
              <View style={styles.text_container}>
                <Text style={styles.text}>Conditions d'utilisation</Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          {this.renderSeparator()}

          <TouchableNativeFeedback 
            background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,false)}
            onPress={() => { 
              this.props.navigation.navigate('BugReport', { 
                title: 'Rapporter un bug',            
              }) 
            }}
          >
            <View style={styles.band}>
              <View style={styles.icon_container}>
                <IconMaterialIcons style={styles.icon} name="report-problem" />
              </View>
              <View style={styles.text_container}>
                <Text style={styles.text}>Rapporter un bug</Text>
              </View>
            </View>
          </TouchableNativeFeedback>        

          {this.renderSeparator()}

          <TouchableNativeFeedback 
            background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,false)}
            onPress={() => { 
              this.props.navigation.navigate('About', { 
                title: 'A propos' 
              }) 
            }}
          >            
            <View style={styles.band}>
              <View style={styles.icon_container}>
                <IconIonicons style={styles.icon} name="md-information-circle" />
              </View>
              <View style={styles.text_container}>
                <Text style={styles.text}>A propos</Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          {this.renderSeparator()}

          <TouchableNativeFeedback 
            background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,false)}
            onPress={() => { 
              this.props.navigation.navigate('Faq', { 
                title: 'F.A.Q' 
              }) 
            }}
          >
            <View style={styles.band}>
              <View style={styles.icon_container}>
                <IconIonicons style={styles.icon} name="md-help-circle" />
              </View>
              <View style={styles.text_container}>
                <Text style={styles.text}>F.A.Q</Text>
              </View>
            </View>
          </TouchableNativeFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  render_separator: {
    height: 1,
    width: "80%",
    backgroundColor: THEME.TERTIARY.SEPARATOR_COLOR,
    marginLeft: "20%"
  },
  user_info_container: { 
    flex:1,
    flexDirection:'row',
    height:100, 
    borderBottomWidth: 1, 
    borderColor: THEME.TERTIARY.SEPARATOR_COLOR
  },
  user_pic_container: { 
    flex:0.3, 
    alignItems:'center', 
    justifyContent:'center', 
    flexDirection:'row'
  },
  user_pic_container_one: { 
    height:60, 
    width:60 
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
  user_name_container: { 
    flex:0.7, 
    alignItems:'flex-start', 
    justifyContent:'center', 
    flexDirection:'column', 
    height: '100%' 
  },
  user_name: { 
    color: THEME.SECONDARY.COLOR, 
    fontSize: 20 
  },
  user_description: { 
    color: THEME.TERTIARY.COLOR, 
    fontSize: 16 
  },
  band: { 
    flex:1, 
    flexDirection:'row', 
    height:60, 
  },
  icon_container: { 
    flex:0.2, 
    alignItems:'center', 
    justifyContent:'center', 
    flexDirection:'row'
  },
  icon: { 
    fontWeight:'bold', 
    fontFamily:'normal', 
    color: THEME.PRIMARY.BACKGROUND_COLOR, 
    fontSize:20 
  },
  text_container: { 
    flex:0.8, 
    alignItems:'center', 
    justifyContent:'flex-start', 
    flexDirection:'row', 
    height: '100%', 
  },
  text: { 
    color: THEME.SECONDARY.COLOR, 
    fontSize: 16 
  },   
})

export default withNavigation(ParameterViewerContent)