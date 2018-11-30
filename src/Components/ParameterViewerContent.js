import React from 'react'
import { 
  Platform, 
  Text, 
  View, 
  Image,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'
import IconOcticons from 'react-native-vector-icons/Octicons'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import user_profile_pic from '../assets/actrices-pakgne-pardon-internaute-jewanda.jpg'

class ParameterViewerContent extends React.Component{
  renderSeparator = () => {
    return (
      <View style={styles.render_separator} />
    )
  }

  render() {
    return (
      <View style={{ paddingTop: Platform.OS !== 'ios' ? this.props.headerMaxHeight : 0, }}>

          <View style={styles.user_info_container}>
            <View style={styles.user_pic_container}>
              <View style={styles.user_pic_container_one}>
                <Image source={user_profile_pic} style={styles.user_pic}/>
              </View>
            </View>
            <View style={styles.user_name_container}>
              <Text style={styles.user_name}>Jane doe</Text>
              <Text style={styles.user_description}>Je suis votre première fan</Text>
            </View>
          </View>

          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#c8c8c8",false)}>
            <View style={styles.band}>
              <View style={styles.icon_container}>
                <Icon style={styles.icon} name="md-key" />
              </View>
              <View style={styles.text_container}>
                <Text style={styles.text}>Compte</Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          {this.renderSeparator()}

          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#c8c8c8",false)}>
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

          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#c8c8c8",false)}>
            <View style={styles.band}>
              <View style={styles.icon_container}>
                <Icon style={styles.icon} name="md-notifications" />
              </View>
              <View style={styles.text_container}>
                <Text style={styles.text}>Notifications</Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          {this.renderSeparator()}

          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#c8c8c8",false)}>
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

          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#c8c8c8",false)}>
            <View style={styles.band}>
              <View style={styles.icon_container}>
                <Icon style={styles.icon} name="md-person-add" />
              </View>
              <View style={styles.text_container}>
                <Text style={styles.text}>Invitez un ou plusieurs amis</Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          {this.renderSeparator()}

          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#c8c8c8",false)}>
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

          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#c8c8c8",false)}>
            <View style={styles.band}>
              <View style={styles.icon_container}>
                <Icon style={styles.icon} name="md-images" />
              </View>
              <View style={styles.text_container}>
                <Text style={styles.text}>Galeries</Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          {this.renderSeparator()}

          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#c8c8c8",false)}>
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

          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#c8c8c8",false)}>
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

          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#c8c8c8",false)}>
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

          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#c8c8c8",false)}>
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

          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#c8c8c8",false)}>
            <View style={styles.band}>
              <View style={styles.icon_container}>
                <Icon style={styles.icon} name="md-lock" />
              </View>
              <View style={styles.text_container}>
                <Text style={styles.text}>Sécurité</Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          {this.renderSeparator()}

          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#c8c8c8",false)}>
            <View style={styles.band}>
              <View style={styles.icon_container}>
                <Icon style={styles.icon} name="md-bookmarks" />
              </View>
              <View style={styles.text_container}>
                <Text style={styles.text}>Conditions d'utilisation</Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          {this.renderSeparator()}

          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#c8c8c8",false)}>
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

          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#c8c8c8",false)}>
            <View style={styles.band}>
              <View style={styles.icon_container}>
                <Icon style={styles.icon} name="md-exit" />
              </View>
              <View style={styles.text_container}>
                <Text style={styles.text}>Déconnexion</Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          {this.renderSeparator()}

          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#c8c8c8",false)}>
            <View style={styles.band}>
              <View style={styles.icon_container}>
                <Icon style={styles.icon} name="md-information-circle" />
              </View>
              <View style={styles.text_container}>
                <Text style={styles.text}>A propos</Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          {this.renderSeparator()}

          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#c8c8c8",false)}>
            <View style={styles.band}>
              <View style={styles.icon_container}>
                <Icon style={styles.icon} name="md-help-circle" />
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
    backgroundColor: "#dbdbdb",
    marginLeft: "20%"
  },
  user_info_container: { 
    flex:1, 
    flexDirection:'row', 
    height:100, 
    borderBottomWidth: 1, 
    borderColor: "#d9d9d9"
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
  user_pic: { 
    flex: 1, 
    borderRadius:60, 
    height: null, 
    width: null 
  },
  user_name_container: { 
    flex:0.7, 
    alignItems:'flex-start', 
    justifyContent:'center', 
    flexDirection:'column', 
    height: '100%' 
  },
  user_name: { 
    color: '#000', 
    fontSize: 20 
  },
  user_description: { 
    color: '#aeaeae', 
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
    color:"#F57F17", 
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
    color: '#000', 
    fontSize: 16 
  }, 
})

export default ParameterViewerContent