import React from 'react'
import {
  View, 
  Text, 
  Image,
  StyleSheet,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import Star from './Star'
import timeConverter from '../Helpers/timeConverter'
import likeConverter from '../Helpers/likeConverter'
import MomentConverter from './MomentConverter'
import { getVideoInfoFromApi } from '../API/REQUEST'
import { connect } from 'react-redux'
import ArticleViewer from './ArticleViewer'
import ArticleLoader from './ArticleLoader'
import BounceUpAndDownStatic from '../Animations/BounceUpAndDownStatic'
import THEME from '../INFO/THEME'

const COVER = '../assets/actrices-pakgne-pardon-internaute-jewanda.jpg'
const AUTHOR_PIC = '../assets/cvHappyTof2.jpg'

class Article extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    }
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
    })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <BounceUpAndDownStatic scale={.8}>
          <ArticleLoader />
        </BounceUpAndDownStatic>
      )
    } else {
      return (

        <BounceUpAndDownStatic 
          scale={.9}
          onPress={() => {
            this.props.navigateTo('ArticleViewer', { firstData: this.props.firstData })
          }}
        >
        <View key={this.props.rowId} style={styles.article_container}>

          <View style={styles.info_container}>
            <View style={styles.title_container}>
              <Text style={styles.title} numberOfLines={3}>
                {this.props.firstData.title}
              </Text>
            </View>
            <View style={styles.detail_container}>
              <View style={styles.detail_image_container}>
                <Image source={require(AUTHOR_PIC)} style={styles.image}/>
              </View>
              <View style={styles.detail_text_container}>
                <Text style={styles.detail_text} numberOfLines={1}>
                  {this.props.firstData.author}
                </Text>
                <Text style={styles.detail_text_two} numberOfLines={1}>
                  <Icon style={styles.detail_text_two_icon} name="md-time" /> {this.props.firstData.publihAt}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.image_container}>
            <Image source={require(COVER)} style={styles.image}/>
          </View>

        </View>
        </BounceUpAndDownStatic>

      )
    }
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
    fontSize: 16,
    lineHeight: 22
  },
  detail_container: {
    flex: 0.2,
    flexDirection:'row',
  },
  detail_image_container: {
    width: 21,
    height: 21,
  },
  detail_text_container: {
    flex: 1,
    alignItems:'flex-start', 
    justifyContent:'center',
    paddingLeft: 10,
    paddingTop: 2
  },
  detail_text: {
    fontSize: 12,
    color: THEME.TERTIARY.COLOR,
  },
  detail_text_two: {
    fontSize: 12,
    color: THEME.TERTIARY.COLOR,
  },
  detail_text_two_icon: {
    fontSize: 12,
    color: THEME.TERTIARY.COLOR,
  },
  image_container: {
    width: 125,
    height: 125,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  }
})

export default Article

