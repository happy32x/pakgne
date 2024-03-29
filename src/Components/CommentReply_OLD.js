import React from 'react'
import {
  View, 
  Text, 
  Image,
  StyleSheet,
} from 'react-native'

import ViewMoreText from 'react-native-view-more-text'

import Autolink from 'react-native-autolink'
import MomentConverter from './MomentConverter'
import likeConverter from '../Helpers/likeConverter'
import { connect } from 'react-redux'
import Rate from './Rate'
import { imageResizer } from '../AI/ImageResizer'
import BounceUpAndDownStatic from '../Animations/BounceUpAndDownStatic'
import THEME from '../INFO/THEME'

import Icon from 'react-native-vector-icons/Ionicons'

const REDVALUE = 50-10
const USER_IMG_SIZE = 100
const DEFAULT_IMG = '../assets/default_100.jpg'

class CommentReply extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingImage: true
    }
    this.element_on = THEME.PRIMARY.BACKGROUND_COLOR
    this.element_off = THEME.TERTIARY.COLOR

    //console.log(JSON.stringify(this.props.data) + "\n\n")

    this.renderViewMore = this._renderViewMore.bind(this)
    this.renderViewLess = this._renderViewLess.bind(this)
  }

  _renderViewMore = (handlePress) => {
    return (
      <Text style={{color: THEME.TERTIARY.COLOR, marginTop: 5}} onPress={handlePress}>
        Read more
      </Text>
    )
  }
  _renderViewLess = (handlePress) => {
    return (
      <Text style={{color: THEME.TERTIARY.COLOR, marginTop: 5}} onPress={handlePress}>
        Show less
      </Text>
    )
  }

  render() {
    return (
      /*
      <View style={styles.comment_container} key={this.props.rowId}>
      */
      <View style={styles.comment_container}>

        <View style={styles.comment_container_left}>
          <BounceUpAndDownStatic 
            scale={.8}
            onPress={() => {
              this.props.navigateTo('ImageViewerDynamic', { 
                title: this.props.data.snippet.authorDisplayName,
                imgURLPreview: imageResizer(this.props.data.snippet.authorProfileImageUrl, USER_IMG_SIZE) ,                
              })
            }}
          >
            <View style={styles.comment_container_left_img_container}>
              <Image
                style={styles.comment_container_left_img_background}
                source = {require(DEFAULT_IMG)}
              />
              <Image
                style={styles.comment_container_left_img}
                source = {{ uri: imageResizer(this.props.data.snippet.authorProfileImageUrl, USER_IMG_SIZE) }}
              />
            </View>
          </BounceUpAndDownStatic>
        </View>

        <View style={styles.comment_container_right}>
          <View style={styles.comment_area}>
            <Text style={styles.comment_area_name}>
              {this.props.data.snippet.authorDisplayName}
            </Text>
            <ViewMoreText
              numberOfLines={3}
              renderViewMore={this.renderViewMore}
              renderViewLess={this.renderViewLess}              
            >
              <Autolink
                style={styles.comment_area_text}
                text={this.props.data.snippet.textOriginal}
                hashtag="instagram"
                mention="twitter" 
              />
            </ViewMoreText>
          </View>

          <View style={styles.design_fix_area}>
            <Icon style={styles.arrow_dropdown_icon} name="md-arrow-dropdown" />
          </View>

          <View style={styles.option_area}>
            <View style={styles.option_area_mini}>
              <Text style={[styles.option_area_text,]}>
                <MomentConverter publishAt={this.props.data.snippet.publishedAt} />
              </Text>
            </View>
            
            {/*<Rate 
              like={this.props.data.like}
              dislike={this.props.data.dislike} 
            />*/}           
          </View>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  comment_container: {
    marginBottom: 15,
    width: '100%',
    height: null,
    flexDirection: 'row',
  },
  comment_container_left: {
    width: REDVALUE,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  comment_container_left_img_container: {
    width: REDVALUE,
    height: REDVALUE,
  },
  comment_container_left_img_background: {
    flex: 1, 
    borderRadius: REDVALUE, 
    height: null, 
    width: null 
  },
  comment_container_left_img: {
    position: "absolute",
    borderRadius: REDVALUE, 
    width: REDVALUE,
    height: REDVALUE,
  },
  comment_container_right: {
    flex: 1,
    alignItems: 'flex-start', 
    justifyContent: 'center',
    marginLeft: 10,
  },
  comment_area: {
    width: null,
    height: null,
    borderRadius: 10,
    backgroundColor: THEME.TERTIARY.SEPARATOR_COLOR,
    padding: 10,
    alignItems: 'flex-start', 
    justifyContent: 'center',
  },
  comment_area_name: {
    lineHeight: 22,
    fontWeight: 'bold',
  },
  comment_area_text: {
    fontSize: 16, 
    lineHeight: 22,
  },
  design_fix_area: {
    position: 'absolute',
    width: 10*2,
    height: 10,
    backgroundColor: 'transparent',
    top: 0,
    left: -10,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  arrow_dropdown_icon: {
    color: THEME.TERTIARY.SEPARATOR_COLOR,
    fontSize: 50
  },
  option_area: {
    width: '100%',
    height: 40,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  option_area_mini: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'flex-start',
    paddingLeft: 10,
  },
  option_area_text: {
    color: THEME.TERTIARY.COLOR, 
    fontSize: 14,
  },
  option_area_icon: {
    color: THEME.TERTIARY.COLOR,
    fontSize:25,
    marginRight: 5
  },
})

export default CommentReply

