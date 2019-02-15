import React from 'react'
import {
  View, 
  StyleSheet,
} from 'react-native'

import THEME from '../INFO/THEME'

class VideoMiniLoader extends React.Component {

  render() {
    return (
      <View style={styles.related_video_container_one}>
        <View style={styles.related_video_container_two} >
          <View style={styles.main_container}>
            <View style={styles.main_container_one}/>
          </View>
          <View style={styles.related_video_title_container}>
            <View style={styles.related_video_title} />
            <View style={styles.related_video_title} />
            <View style={styles.related_video_more_info} />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: { 
    flex:1,
    backgroundColor: THEME.PRIMARY.COLOR
  },
  main_container_one: { 
    flex: 1, 
    backgroundColor: THEME.ON_LOAD_COLOR
  },
  related_video_container_one: { 
    alignSelf:"stretch", 
    paddingLeft:15, 
    paddingRight:15,
    borderBottomWidth: 1,
    borderBottomColor: THEME.ON_LOAD_COLOR,
    backgroundColor: THEME.PRIMARY.COLOR,
  },
  related_video_container_two: { 
    alignSelf:"stretch", 
    height:90, 
    flexDirection:'row', 
    marginTop:15,
    marginBottom:15,
  },
  related_video_title_container: { 
    flex:1, 
    paddingTop:1, 
    paddingBottom:5, 
    paddingLeft:15,
  },
  related_video_title: { 
    height: 14,
    width: '100%',
    backgroundColor: THEME.ON_LOAD_COLOR,
    marginBottom: 5
  },
  related_video_more_info: { 
    height: 14,
    width: '40%',
    backgroundColor: THEME.ON_LOAD_COLOR,
    marginBottom: 5
  },
})


export default VideoMiniLoader