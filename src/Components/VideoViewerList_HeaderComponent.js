import React from 'react'
import {
  View,
  Text,
  Image,
  Share,
  Switch,
  Platform,
  StatusBar,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  TouchableNativeFeedback,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import IconAntDesign from 'react-native-vector-icons/AntDesign'

import BarStatus from './BarStatus'
import img from '../assets/2.jpg'
import YoutubeView from './YoutubeView'
import Favori from './Favori'
import RateVideoViewer from './RateVideoViewer'
import likeConverter from '../Helpers/likeConverter'
import THEME from '../INFO/THEME'

import { connect } from 'react-redux'

class VideoViewerList_HeaderComponent extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      switchValue: false,
    }
    
    this.toggleSwitch = this._toggleSwitch.bind(this)   
  }

  _toggleSwitch(value) {
    value ? ToastAndroid.show('Auto', ToastAndroid.SHORT) : ToastAndroid.show('Annulé', ToastAndroid.SHORT)
    this.setState({switchValue: value})
  }

  render() {
    return (
      <View>

        <View style={styles.bottom_info_container}>
          <View style={styles.bottom_info}>

            <TouchableNativeFeedback 
              background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,false)}                    
              onPress={() => {              
                this.props.toggleDescription(true)
              }}
            >
              <View style={styles.title_container}>
                <View style={styles.title_container_text}>
                  <Text style={styles.title} numberOfLines={2}>{this.props.video[0].snippet.title}</Text>
                  <Text style={styles.same_element}>{likeConverter(this.props.video[1].statistics.viewCount)} vues</Text>
                </View>
                <View style={styles.title_container_icon}>                  
                  <IconAntDesign style={styles.icon} name="caretdown" />
                </View>
              </View>
            </TouchableNativeFeedback>

            <View style={styles.bottom_element}>

              <RateVideoViewer 
                videoId={this.props.video[0].id.videoId}
                like={this.props.video[1].statistics.likeCount} 
                dislike={this.props.video[1].statistics.dislikeCount} 
              />

              <TouchableNativeFeedback 
                background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,true)}                    
                onPress={() => {
                  Share.share({
                    message: `https://www.youtube.com/watch?v=${this.props.video[0].id.videoId}`,
                    url: `https://www.youtube.com/watch?v=${this.props.video[0].id.videoId}`,
                    title: `${this.props.video[0].snippet.title}`
                  }, {
                    dialogTitle: 'Partager cette video',
                    excludedActivityTypes: [
                      'com.apple.UIKit.activity.PostToTwitter'
                    ]
                  })
                }} 
              >
                <View style={styles.same_element_one}>
                  <Icon style={styles.same_element_two} name="md-share-alt" />
                  <Text style={styles.same_element} numberOfLines={1}>partager</Text>
                </View>
              </TouchableNativeFeedback>                                      

              {/*<TouchableNativeFeedback 
                background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,true)}                    
                onPress={() => {
                  ToastAndroid.show('Téléchargement non pris en charge dans cette version', ToastAndroid.SHORT);
                }} 
              >
                <View style={styles.same_element_one}>
                  <Icon style={styles.same_element_two} name="md-download" />
                  <Text style={styles.same_element} numberOfLines={1}>télécharger</Text>
                </View>
              </TouchableNativeFeedback>*/}

              <Favori
                shouldShine={
                  this.props.isFavorite() !== -1
                  ? true
                  : false
                }
                toggleFavorite={this.props.toggleFavorite}
              />

            </View>
          </View>
        </View>

        <View style={styles.continued_container}>
          <View style={styles.continued_container_one}>
            <Text style={styles.continued} numberOfLines={1}>A suivre</Text>
          </View>
          {/*<View style={styles.continued_container_two}>
            <Text style={styles.continued} numberOfLines={1}>Lecture automatique</Text>             
          </View>
          <View style={styles.continued_container_three}>                 
            <Switch
              onValueChange = {this.toggleSwitch}
              value = {this.state.switchValue}

              thumbColor = {this.state.switchValue ? THEME.PRIMARY.BACKGROUND_COLOR : "#ececec"} //couleur du thumb

              //onTintColor = {THEME.PRIMARY.WAVE_COLOR_PRIMARY} //couleur du track activé                                   
              //trackColor = {THEME.PRIMARY.WAVE_COLOR_PRIMARY} //couleur du track activé              
              //trackColor = {THEME.TERTIARY.COLOR} //couleur du track désactivé    
              
              // couleur du track
              trackColor = {{
                false: THEME.TERTIARY.COLOR,
                true: THEME.PRIMARY.WAVE_COLOR_PRIMARY
              }}
            />
          </View>*/}
        </View>

      </View>          
    )
  }
}

const styles = StyleSheet.create({
  bottom_info_container: {
    alignSelf:"stretch",
  },
  bottom_info: {
    alignSelf:"stretch",
    height: 150,
    //backgroundColor: THEME.PRIMARY.COLOR,
  },
  title_container: {
    alignSelf:"stretch",
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent:'center',
  },
  title_container_text: {
    flex:1,
    paddingLeft: 15,
    paddingVertical: 7.5,
  },
  title_container_icon: {
    width: 50,
    height: 50,      
    alignItems: 'center',
    justifyContent:'center',
  },
  title: {
    fontSize:17,
  },
  icon: {
    fontSize:12,
  },
  bottom_element: {
    alignSelf:"stretch",
    marginTop:15,
    paddingHorizontal: 15,
    paddingBottom: 15,
    flexDirection:'row',
  },
  same_element: { 
    fontSize:13, 
    color: THEME.TERTIARY.COLOR
  },
  like_text: { 
    fontSize:12, 
    color: THEME.PRIMARY.BACKGROUND_COLOR
  },
  like_icon: { 
    color: THEME.PRIMARY.BACKGROUND_COLOR, 
    fontSize:20 
  },
  same_element_one: { 
    flex:1, 
    alignItems:'center', 
    justifyContent:'center'
  },
  same_element_two: { 
    color: THEME.TERTIARY.COLOR, 
    fontSize:22
  },

  continued_container: {     
    alignSelf:"stretch",
    height: 50,
    flexDirection: 'row',
    borderTopWidth: 1, 
    borderColor: THEME.ON_LOAD_COLOR,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
    //borderBottomColor: THEME.ON_LOAD_COLOR,
  },
  continued_container_one: { 
    flex: 1, 
    padding:15, 
    alignItems:'flex-start',
    justifyContent:'center',
  },
  continued_container_two: { 
    flex: 3,
    padding:15,
    paddingRight:8, 
    alignItems:'flex-end',
    justifyContent:'center',
  },
  continued_container_three: { 
    flex: 1,
    paddingLeft:0,
    paddingRight:15, 
    alignItems:'center',
    justifyContent:'center',
  },
  continued: { 
    fontSize:15, 
    color: THEME.TERTIARY.COLOR
  },
})

const mapStateToProps = (state) => {
  return {
    favoritesVideo: state.toggleFavorite.favoritesVideo,
    currentUser: state.UserInfoReducer.currentUser,
  }
}

export default connect(mapStateToProps)(VideoViewerList_HeaderComponent)
