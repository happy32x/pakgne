import React from 'react'
import {
  View, 
  StyleSheet,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import IconFeather from 'react-native-vector-icons/Feather'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import THEME from '../INFO/THEME'

class ArticleLoader extends React.Component {

  render() {
    return (
      <View style={styles.article_container}>

        <View style={styles.info_container}>
          <View style={styles.title_container}>
            <View style={styles.title} />
            <View style={styles.title} />
            <View style={styles.title_last} />
          </View>
          <View style={styles.detail_container}>
            <View style={styles.detail_image_container}>
              <IconFeather style={styles.image_small} name="file" />
            </View>
            <View style={styles.detail_text_container}>
              <View style={styles.detail_text} />
            </View>
          </View>
        </View>

        <View style={styles.image_container}>
          <IconFontAwesome style={styles.image} name="image" />
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  article_container: {
    alignSelf:'stretch',
    height: 125,
    flexDirection:'row',
    backgroundColor: THEME.PRIMARY.COLOR,
    borderBottomWidth: 1,
    borderBottomColor: THEME.ON_LOAD_COLOR
  },
  info_container: {
    flex: 1,
    padding: 15
  },
  title_container: {
    flex: 0.8,
  },
  title: { 
    backgroundColor: THEME.ON_LOAD_COLOR, 
    width: '100%',
    height: 16,
    marginBottom: 8,
  },
  title_last: { 
    backgroundColor: THEME.ON_LOAD_COLOR, 
    width: '60%',
    height: 16, 
  },
  detail_container: {
    flex: 0.2,
    flexDirection:'row',
  },
  detail_image_container: {
    width: 21,
    height: 21,
    alignItems:'center', 
    justifyContent:'center',
  },
  image_small: {
    fontSize: 18,
    color: THEME.ON_LOAD_COLOR
  },
  detail_text_container: {
    flex: 1,
    alignItems:'flex-start', 
    justifyContent:'center',
    paddingLeft: 10
  },
  detail_text: {
    width: '70%',
    height: 12,
    backgroundColor: THEME.ON_LOAD_COLOR
  },
  image_container: {
    width: 125,
    height: 125,
    alignItems:'center', 
    justifyContent:'center',
    backgroundColor: THEME.TERTIARY.COLOR
  },
  image: {
    fontSize: 30,
    color: THEME.PRIMARY.COLOR
  }
})

export default ArticleLoader