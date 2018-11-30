import React from 'react'
import {
  View, 
  StyleSheet,
  StatusBar,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

const THEME = '#dddddd'
const STATUSBAR_HEIGHT = StatusBar.currentHeight

class VideoLoader extends React.Component {

  render() {
    return (
      <View style={styles.main_container}>

        <View style={styles.top_element_container}>
          <View style={styles.film_logo_container}>
            <View style={styles.film_logo} />
          </View>

          <View style={styles.title_video_container}>
            <View style={styles.title_video} />
            <View style={styles.title_video} />
            <View style={styles.publish_at_video} />
          </View>

          <View style={styles.star_container}>
            <View style={styles.star} />
          </View>
        </View>

        <View style={styles.middle_element_container}>
          <View style={styles.image_container}>
            <View style={styles.image} />
          </View>
        </View>

        <View style={styles.bottom_element_container}>
          <View style={styles.same_element}>
            <View style={styles.same_element}>
              <Icon style={styles.same_element_one} name="md-heart" />
            </View>
          </View>

          <View style={styles.same_element}>
            <View style={styles.same_element}>
              <Icon style={styles.same_element_one} name="md-chatbubbles" />
            </View>
          </View>

          <View style={styles.same_element}>
            <View style={styles.same_element}>
              <Icon style={styles.same_element_one} name="md-share" />
            </View>
          </View>
        </View>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: STATUSBAR_HEIGHT,
    backgroundColor: '#ecf0f1',
  },
  main_container: { 
    alignSelf:'stretch', 
    marginBottom:10 
  },
  top_element_container: { 
    backgroundColor:"#FFF", 
    alignSelf:'stretch', 
    flexDirection:'row' 
  },
  film_logo_container: { 
    flex: 1, 
    alignItems:'center',
    justifyContent:'center', 
    paddingTop:10, 
    paddingBottom:10, 
    paddingLeft:10
  },
  film_logo: { 
    backgroundColor: THEME, 
    width: 25,
    height: 25, 
  },
  title_video_container: { 
    flex: 10, 
    alignItems:'flex-start', 
    justifyContent:'center', 
    paddingTop:10, 
    paddingBottom:10, 
    paddingLeft:10
  },
  title_video: { 
    flex: 1,
    height: 16,
    width: '100%',
    backgroundColor: THEME,
    marginBottom: 5
  },
  publish_at_video: { 
    flex: 1,
    height: 14,
    width: '40%',
    backgroundColor: THEME,
    marginBottom: 5
  },
  star_container: { 
    flex: 2,
    alignItems:'center', 
    justifyContent:'center',
  },
  star: {
    height: 20,
    width: 20,
    backgroundColor: THEME,
  },
  middle_element_container: { 
    backgroundColor:"#000", 
    height: 200, 
    alignSelf:'stretch' 
  },
  image_container: { 
    flex:1 
  },
  image: { 
    flex: 1, 
    height: null, 
    width: null,
    backgroundColor: THEME
  },
  bottom_element_container: { 
    backgroundColor:"#FFF", 
    alignSelf:'stretch', 
    flexDirection:'row', 
    height:45 
  },
  same_element: { 
    flex:1, 
    alignItems:'center', 
    justifyContent:'center', 
    flexDirection:'row'
  },
  same_element_one: { 
    fontWeight:'bold', 
    fontFamily:'normal', 
    color:"#F57F17", 
    fontSize:20 
  },
  same_element_two: { 
    flex:1, 
    alignItems:'center', 
    justifyContent:'flex-start', 
    flexDirection:'row'
  },
  same_element_four: { 
    color: '#A7A7A7', 
    fontSize: 14 
  },
})

export default VideoLoader