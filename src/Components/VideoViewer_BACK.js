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

class VideoViewer extends React.Component{

  static navigationOptions = {
    header: null
  }

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
    const { navigation } = this.props
    const video = navigation.getParam('video', 'NO-DATA')

    return (
      <View style={styles.main_container}>
          <View style={styles.video_container}>
            {/*<YoutubeView videoId={video[0].id.videoId} />*/}
            
            <TouchableNativeFeedback 
              background={TouchableNativeFeedback.Ripple(THEME.SECONDARY.WAVE_COLOR,true)}
              onPress={() => this.props.navigation.goBack()}
            > 
              <View style={styles.arrow_back_container}>
                <Icon style={styles.arrow_back} name="md-arrow-back" /> 
              </View>              
            </TouchableNativeFeedback>
          </View>

          <ScrollView style={styles.main_container} showsVerticalScrollIndicator={false}>

            <View style={styles.bottom_info_container}>
              <View style={styles.bottom_info}>
                <View style={styles.title_container}>
                  <Text style={styles.title}>{video[0].snippet.title}</Text>
                  <Text style={styles.same_element}>{likeConverter(video[1].statistics.viewCount)} vues</Text>
                </View>
                <View style={styles.bottom_element} >

                  {/*<View style={styles.same_element_one}>
                    <Icon style={styles.like_icon} name="md-heart" />
                    <Text style={styles.like_text}>{likeConverter(video[1].statistics.likeCount)}</Text>
                  </View>                  
                  <View style={styles.same_element_one}>
                    <Icon style={styles.same_element_two} name="md-heart-outline" />
                    <Icon style={styles.same_element_two} name="md-heart-dislike" />
                    <Text style={styles.same_element}>{likeConverter(video[1].statistics.dislikeCount)}</Text>
                  </View>*/}

                  <RateVideoViewer like={video[1].statistics.likeCount} dislike={video[1].statistics.dislikeCount} />

                  <TouchableNativeFeedback 
                    background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,true)}                    
                    onPress={() => {
                      Share.share({
                        message: `https://www.youtube.com/watch?v=${video[0].id.videoId}`,
                        url: `https://www.youtube.com/watch?v=${video[0].id.videoId}`,
                        title: `${video[0].snippet.title}`
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

            <View style={styles.related_video_container}>

              <View style={styles.related_video_container_one}>
                <View style={styles.related_video_container_two}>
                  <View style={styles.main_container}>
                    <Image source={img} style={styles.main_container_one}/>
                    <Text style={styles.related_video_duration}>6:54</Text>
                  </View>
                  <View style={styles.related_video_title_container}>
                    <Text style={styles.related_video_title}>GUNDAM SEED DESTINY - LA MONTE EN PUISSANCE DE SCROBIUM</Text>
                    <Text style={styles.related_video_more_info}>1,7 vues - il y'a 2 jours</Text>
                  </View>
                </View>
              </View>              

            </View>

          </ScrollView>          

          { Platform.OS === 'android' ? <BarStatus color={THEME.SECONDARY.COLOR} /> : null }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: { 
    flex:1,
    backgroundColor: THEME.PRIMARY.COLOR
  },
  main_container_one: { 
    flex: 1, 
    height: null, 
    width: null 
  },
  video_container: {
    alignSelf:'stretch', 
    height:200, 
    backgroundColor: THEME.SECONDARY.COLOR,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  },
  arrow_back_container: { 
    position:"absolute", 
    top: 0,
    left: 0,
    width: 40, 
    height: 40,
    alignItems:'center', 
    justifyContent:'center', 
    opacity: 0.3
  },
  arrow_back: {           
    fontWeight:'bold', 
    color: THEME.PRIMARY.COLOR, 
    fontSize:20,                  
  },
  bottom_info_container: { 
    alignSelf:"stretch", 
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
    flexDirection: 'row',
    borderTopWidth: 1, 
    borderColor: THEME.TERTIARY.SEPARATOR_COLOR
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
  related_video_container: { 
    alignSelf:"stretch" 
  },
  related_video_container_one: { 
    alignSelf:"stretch", 
    paddingLeft:15, 
    paddingRight:15 
  },
  related_video_container_two: { 
    alignSelf:"stretch", 
    height:90, 
    flexDirection:'row', 
    marginBottom:15
  },
  related_video_duration: {
    color: THEME.PRIMARY.COLOR, 
    position:"absolute", 
    backgroundColor: THEME.SECONDARY.COLOR,
    paddingLeft:6, 
    paddingRight:6, 
    right:5,
    bottom:5,
    opacity:0.8,
    fontSize:11,
  },
  related_video_title_container: { 
    flex:1, 
    paddingTop:1, 
    paddingBottom:5, 
    paddingLeft:15 
  },
  related_video_title: { 
    fontSize:14 
  },
  related_video_more_info: { 
    fontSize:11, 
    color: THEME.TERTIARY.COLOR,
    marginTop:1 
  },
})

export default VideoViewer
