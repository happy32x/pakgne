import React from 'react'
import {
  ScrollView,
  View,
  Text,
  Platform,
  StatusBar,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native'

import BarStatus from './BarStatus'
import Icon from 'react-native-vector-icons/Ionicons'
import img from '../assets/2.jpg'
import YoutubeView from './YoutubeView'
import likeConverter from '../Helpers/likeConverter'

class VideoViewer extends React.Component{

  static navigationOptions = {
    header: null
  }

  render() {
    const { navigation } = this.props
    const video = navigation.getParam('video', 'NO-DATA')

    return (
      <View style={styles.main_container}>
          <View style={styles.video_container}>
            <YoutubeView videoId={video[0].id.videoId} />
            
            <TouchableNativeFeedback 
              background={TouchableNativeFeedback.Ripple("#5e5e5e",true)}
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
                  <View style={styles.same_element_one}>
                    <Icon style={styles.like_icon} name="md-heart" />
                    <Text style={styles.like_text}>{likeConverter(video[1].statistics.likeCount)}</Text>
                  </View>
                  <View style={styles.same_element_one}>
                    <Icon style={styles.same_element_two} name="md-heart-outline" />
                    <Text style={styles.same_element}>{likeConverter(video[1].statistics.dislikeCount)}</Text>
                  </View>
                  <View style={styles.same_element_one}>
                    <Icon style={styles.same_element_two} name="md-share" />
                    <Text style={styles.same_element}>partager</Text>
                  </View>
                  <View style={styles.same_element_one}>
                    <Icon style={styles.same_element_two} name="md-download" />
                    <Text style={styles.same_element}>télécharger</Text>
                  </View>          
                </View>
              </View>
            </View>

            <View style={styles.continued_container}>
              <View style={styles.continued_container_one}>
                <Text style={styles.continued}>A suivre</Text>
              </View>
            </View>

            <View style={styles.related_video_container}>
              <View style={styles.related_video_container_one}>
                <View style={styles.related_video_container_two} >
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

          { Platform.OS === 'android' ? <BarStatus color="#000" /> : null }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: { 
    flex:1 
  },
  main_container_one: { 
    flex: 1, 
    height: null, 
    width: null 
  },
  video_container: {
    alignSelf:'stretch', 
    height:200, 
    backgroundColor:"#000",
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
    color:"#FFF", 
    fontSize:20,                  
  },
  bottom_info_container: { 
    alignSelf:"stretch", 
    borderBottomWidth: 1, 
    borderColor: "#d9d9d9" 
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
    color: '#979797' 
  },
  like_text: { 
    fontSize:12, 
    color: '#F57F17' 
  },
  like_icon: { 
    color:"#F57F17", 
    fontSize:20 
  },
  same_element_one: { 
    flex:1, 
    alignItems:'center', 
    justifyContent:'center'
  },
  same_element_two: { 
    color:"#979797", 
    fontSize:20 
  },
  continued_container: { 
    alignSelf:"stretch" 
  },
  continued_container_one: { 
    alignSelf:"stretch", 
    padding:15, 
    alignItems:'flex-start' 
  },
  continued: { 
    fontSize:13, 
    color: '#979797' 
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
    color:"#FFF", 
    position:"absolute", 
    backgroundColor:"#000",
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
    color:"#979797", 
    marginTop:1 
  },
})

export default VideoViewer
