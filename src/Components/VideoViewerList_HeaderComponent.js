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

import VideoViewerList from './VideoViewerList'

import Icon from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import BarStatus from './BarStatus'
import img from '../assets/2.jpg'
import YoutubeView from './YoutubeView'
import RateVideoViewer from './RateVideoViewer'
import likeConverter from '../Helpers/likeConverter'
import THEME from '../INFO/THEME'

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
            <View style={styles.title_container}>
              <Text style={styles.title}>{this.props.video[0].snippet.title}</Text>
              <Text style={styles.same_element}>{likeConverter(this.props.video[1].statistics.viewCount)} vues</Text>
            </View>
            <View style={styles.bottom_element} >

              <RateVideoViewer like={this.props.video[1].statistics.likeCount} dislike={this.props.video[1].statistics.dislikeCount} />

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
                  <Text style={styles.same_element}>partager</Text>
                </View>
              </TouchableNativeFeedback>                                      

              <TouchableNativeFeedback 
                background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,true)}                    
                onPress={() => {
                  ToastAndroid.show('Téléchargement non pris en charge dans cette version', ToastAndroid.SHORT);
                }} 
              >
                <View style={styles.same_element_one}>
                  <Icon style={styles.same_element_two} name="md-download" />
                  <Text style={styles.same_element}>télécharger</Text>
                </View>        
              </TouchableNativeFeedback>

              <TouchableNativeFeedback 
                background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,true)}                    
                onPress={() => {
                  ToastAndroid.show('ajouter aux favoris, non pris en charge dans cette version', ToastAndroid.SHORT);
                }} 
              >
                <View style={styles.same_element_one}>
                  <MaterialCommunityIcons style={styles.same_element_two} name="playlist-plus" />
                  <Text style={styles.same_element}>favori</Text>
                </View>        
              </TouchableNativeFeedback>

            </View>
          </View>
        </View>

        <View style={styles.continued_container}>
          <View style={styles.continued_container_one}>
            <Text style={styles.continued}>A suivre</Text>
          </View>
          <View style={styles.continued_container_two}>
            <Text style={styles.continued}>Lecture automatique</Text>             
          </View>
          <View style={styles.continued_container_three}>                 
            <Switch
              onValueChange = {this.toggleSwitch}
              value = {this.state.switchValue}

              thumbTintColor = {this.state.switchValue ? THEME.PRIMARY.BACKGROUND_COLOR : "#ececec"} //couleur du thumb

              onTintColor = {THEME.PRIMARY.WAVE_COLOR_PRIMARY} //couleur du track activé                                   
              tintColor = {THEME.TERTIARY.COLOR} //couleur du track désactivé           
            />
          </View>
        </View>

      </View>          
    )
  }
}

const styles = StyleSheet.create({
  bottom_info_container: { 
    alignSelf:"stretch", 
    height:125,
  },
  bottom_info: { 
    alignSelf:"stretch", 
    padding:15 
  },
  title_container: { 
    alignSelf:"stretch" 
  },
  title: { 
    fontSize:17 
  },
  bottom_element: { 
    alignSelf:"stretch", 
    marginTop:15, 
    flexDirection:'row' 
  },
  same_element: { 
    fontSize:12, 
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
    fontSize:20 
  },


  continued_container: {     
    alignSelf:"stretch",
    height: 50,
    flexDirection: 'row',
    borderTopWidth: 1, 
    borderColor: THEME.ON_LOAD_COLOR,
    borderBottomWidth: 1,
    borderBottomColor: THEME.ON_LOAD_COLOR,
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
    fontSize:13, 
    color: THEME.TERTIARY.COLOR
  },
})

export default VideoViewerList_HeaderComponent
