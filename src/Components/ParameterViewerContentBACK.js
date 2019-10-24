import React from 'react'
import { 
  Platform, 
  Text, 
  View, 
  Image,
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

const DEFAULT_IMG = '../assets/default_100.jpg'
const REDVALUE = 60
const MESSAGE = 'Option indisponible dans cette version'

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
                    this.props.navigation.navigate('ImageViewer', { 
                      title: firebase.auth().currentUser.displayName,
                      imgURLPreview: firebase.auth().currentUser.photoURL,                
                    })
                  }}
                >
                  <View style={styles.user_pic_container_one}>
                    <Image style={styles.user_pic_background} source={require(DEFAULT_IMG)} />
                    <Image style={styles.user_pic} source={{uri: firebase.auth().currentUser.photoURL}} />
                  </View>
                </BounceUpAndDownStatic>

              </View>
              <View style={styles.user_name_container}>
                <Text style={styles.user_name}>{firebase.auth().currentUser.displayName}</Text>
                <Text style={styles.user_description}>Je suis votre fan N°1</Text>          
              </View>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback 
            background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,false)}
            onPress={() => { 
              this.props.navigation.navigate('ParameterElement', { 
                title: 'Compte',
                type: 'Ionicons',
                icon: 'md-key',
                color: THEME.TERTIARY.COLOR,
                message: MESSAGE,
              }) 
            }}
          >
            <View style={styles.band}>
              <View style={styles.icon_container}>
                <IconIonicons style={styles.icon} name="md-key" />
              </View>
              <View style={styles.text_container}>
                <Text style={styles.text}>Compte</Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          {this.renderSeparator()}

          <TouchableNativeFeedback 
            background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,false)}
            onPress={() => { 
              this.props.navigation.navigate('ParameterElement', { 
                title: 'Discussions',
                type: 'Octicons',
                icon: 'comment-discussion',
                color: THEME.TERTIARY.COLOR,
                message: MESSAGE,
              }) 
            }}
          >
            <View style={styles.band}>
              <View style={styles.icon_container}>
                <IconOcticons style={styles.icon} name="comment-discussion" />
              </View>
              <View style={styles.text_container}>
                <Text style={styles.text}>Discussions</Text>
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
                title: 'Usage de données',
                type: 'MaterialIcons',
                icon: 'data-usage',
                color: THEME.TERTIARY.COLOR,
                message: MESSAGE,
              }) 
            }}
          >
            <View style={styles.band}>
              <View style={styles.icon_container}>
                <IconMaterialIcons style={styles.icon} name="data-usage" />
              </View>
              <View style={styles.text_container}>
                <Text style={styles.text}>Usage de données</Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          {this.renderSeparator()}

          <TouchableNativeFeedback 
            background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,false)}
            onPress={() => { 
              this.props.navigation.navigate('ParameterElement', { 
                title: 'Inviter',
                type: 'Ionicons',
                icon: 'md-person-add',
                color: THEME.TERTIARY.COLOR,
                message: MESSAGE,
              }) 
            }}
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
                title: 'Evènement',
                type: 'MaterialIcons',
                icon: 'event-note',
                color: THEME.TERTIARY.COLOR,
                message: MESSAGE,
              }) 
            }}
          >
            <View style={styles.band}>
              <View style={styles.icon_container}>
                <IconMaterialIcons style={styles.icon} name="event-note" />
              </View>
              <View style={styles.text_container}>
                <Text style={styles.text}>Evènement</Text>
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
                title: 'Appel audio',
                type: 'MaterialCommunityIcons',
                icon: 'phone',
                color: THEME.TERTIARY.COLOR,
                message: MESSAGE,
              }) 
            }}
          >
            <View style={styles.band}>
              <View style={styles.icon_container}>
                <IconMaterialCommunityIcons style={styles.icon} name="phone" />
              </View>
              <View style={styles.text_container}>
                <Text style={styles.text}>Appel audio</Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          {this.renderSeparator()}

          <TouchableNativeFeedback 
            background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,false)}
            onPress={() => { 
              this.props.navigation.navigate('ParameterElement', { 
                title: 'Générateur de QR code',
                type: 'MaterialCommunityIcons',
                icon: 'qrcode',
                color: THEME.TERTIARY.COLOR,
                message: MESSAGE,
              }) 
            }}
          >
            <View style={styles.band}>
              <View style={styles.icon_container}>
                <IconMaterialCommunityIcons style={styles.icon} name="qrcode" />
              </View>
              <View style={styles.text_container}>
                <Text style={styles.text}>Générateur de QR code</Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          {this.renderSeparator()}

          <TouchableNativeFeedback 
            background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,false)}
            onPress={() => { 
              this.props.navigation.navigate('ParameterElement', { 
                title: 'Sauvegarde de données',
                type: 'Octicons',
                icon: 'database',
                color: THEME.TERTIARY.COLOR,
                message: MESSAGE,
              }) 
            }}
          >
            <View style={styles.band}>
              <View style={styles.icon_container}>
                <IconOcticons style={styles.icon} name="database" />
              </View>
              <View style={styles.text_container}>
                <Text style={styles.text}>Sauvegarde de données</Text>
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
              this.props.navigation.navigate('ParameterElement', { 
                title: 'Sécurité',
                type: 'Ionicons',
                icon: 'md-lock',
                color: THEME.TERTIARY.COLOR,
                message: MESSAGE,
              }) 
            }}
          >
            <View style={styles.band}>
              <View style={styles.icon_container}>
                <IconIonicons style={styles.icon} name="md-lock" />
              </View>
              <View style={styles.text_container}>
                <Text style={styles.text}>Sécurité</Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          {this.renderSeparator()}

          <TouchableNativeFeedback 
            background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,false)}
            onPress={() => { 
              this.props.navigation.navigate('ParameterElement', { 
                title: 'Conditions d\'utilisation',
                type: 'Ionicons',
                icon: 'md-bookmarks',
                color: THEME.TERTIARY.COLOR,
                message: MESSAGE,
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
              this.props.navigation.navigate('ParameterElement', { 
                title: 'Rapporter un bug',
                type: 'MaterialIcons',
                icon: 'report-problem',
                color: THEME.TERTIARY.COLOR,
                message: MESSAGE,
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
              this.props.navigation.navigate('ParameterElement', { 
                title: 'Déconnexion',
                type: 'Ionicons',
                icon: 'md-exit',
                color: THEME.TERTIARY.COLOR,
                message: MESSAGE,
              }) 
            }}
          >
            <View style={styles.band}>
              <View style={styles.icon_container}>
                <IconIonicons style={styles.icon} name="md-exit" />
              </View>
              <View style={styles.text_container}>
                <Text style={styles.text}>Déconnexion</Text>
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
              this.props.navigation.navigate('ParameterElement', { 
                title: 'F.A.Q',
                type: 'Ionicons',
                icon: 'md-help-circle',
                color: THEME.TERTIARY.COLOR,
                message: MESSAGE,
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