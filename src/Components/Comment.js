import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
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
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'

import ModalSignalComment from '../Modal/ModalSignalComment'

const SCALE = .5
const TENSION = 100

const REDVALUE = 50-10
const USER_IMG_SIZE = 100
const DEFAULT_IMG = '../assets/default_100.jpg'

class Comment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalVisible: false,
    }
    this.element_on = THEME.PRIMARY.BACKGROUND_COLOR
    this.element_off = THEME.TERTIARY.COLOR

    this.renderViewMore = this._renderViewMore.bind(this)
    this.renderViewLess = this._renderViewLess.bind(this)

    this.hideModal = this._hideModal.bind(this)
    this.showModal = this._showModal.bind(this)
  }

  _hideModal() {
    this.setState({isModalVisible: false}, () => console.log('commentaire signalé avec succes !'))
  }

  _showModal() {
    this.setState({isModalVisible: true}, () => console.log('voulez-vous signaler ce commentaire ?'))
  }

  _renderViewMore(handlePress) {
    return (
      <Text style={{color: THEME.TERTIARY.COLOR, marginTop: 5}} onPress={handlePress}>
        Voir plus
      </Text>
    )
  }
  _renderViewLess(handlePress) {
    return (
      <Text style={{color: THEME.TERTIARY.COLOR, marginTop: 5}} onPress={handlePress}>
        Voir moins
      </Text>
    )
  }

  render() {
    return (
      /*
      <View style={styles.comment_container} key={this.props.rowId}>
      */
      <View style={styles.comment_container}>

        <ModalSignalComment
          isModalVisible={this.state.isModalVisible}
          hideModal={this.hideModal}
        />

        <View style={styles.comment_container_left}>
          <BounceUpAndDownStatic
            scale={.8}
            onPress={() => {
              this.props.navigateTo('ImageViewerDynamic', {
                title: this.props.data.snippet.topLevelComment.snippet.authorDisplayName,
                imgURLPreview: imageResizer(this.props.data.snippet.topLevelComment.snippet.authorProfileImageUrl, USER_IMG_SIZE),
              })
            }}
          >
            <View style={styles.comment_container_left_img_container}>              
              <Image
                style={styles.comment_container_left_img}
                defaultSource={require(DEFAULT_IMG)}
                source={{ uri: imageResizer(this.props.data.snippet.topLevelComment.snippet.authorProfileImageUrl, USER_IMG_SIZE) }}
              />
            </View>
          </BounceUpAndDownStatic>
        </View>

        <View style={styles.comment_container_right}>
          <View style={styles.comment_area}>
            <View style={styles.comment_area_name_icon}>
              <View style={{flex:1}}>
                <Text style={styles.comment_area_name}>
                  {this.props.data.snippet.topLevelComment.snippet.authorDisplayName}
                </Text>
              </View>        
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,true)}
                onPress={() => this.showModal()}
              >                
                <View style={{
                  //backgroundColor: 'green',
                  alignItems:'center',
                  justifyContent:'center',
                  width: 24,
                  marginRight: -10,
                }}>
                  <Icon style={styles.comment_area_icon} name="md-more" />
                </View>
              </TouchableNativeFeedback>           
            </View>
            <ViewMoreText
              numberOfLines={10}
              renderViewMore={this.renderViewMore}
              renderViewLess={this.renderViewLess} 
              key={this.props.data.snippet.topLevelComment.snippet.textOriginal.length}              
            >
              <Autolink
                style={styles.comment_area_text}
                text={this.props.data.snippet.topLevelComment.snippet.textOriginal}
                hashtag="instagram"
                mention="twitter"
              />
              {/*<Text>{this.props.data.snippet.topLevelComment.snippet.textOriginal}</Text>*/}            
            </ViewMoreText>
          </View>

          <View style={styles.design_fix_area}>
            <Icon style={styles.arrow_dropdown_icon} name="md-arrow-dropdown" />
          </View>

          <View style={styles.option_area}>
            <View style={styles.option_area_mini}>
              <Text style={[styles.option_area_text,]}>
                <MomentConverter publishAt={this.props.data.snippet.topLevelComment.snippet.publishedAt} />
              </Text>
            </View>
            
            {/*<Rate 
              like={this.props.data.like}
              dislike={this.props.data.dislike} 
            />*/}

            {
              this.props.data.snippet.totalReplyCount===0
                ?
                  <BounceUpAndDownStatic 
                    scale={SCALE} tension={TENSION} style={styles.option_area_mini}
                    onPress={() => {
                      this.props.navigateTo('CommentListReply', { commentId: this.props.data.id })
                    }}
                  >     
                    <IconMaterialIcons style={[styles.option_area_icon, { color: this.element_off } ]} name="insert-comment" />
                    <Text style={[styles.option_area_text, { color: this.element_off } ]}>{this.props.data.snippet.totalReplyCount}</Text>
                  </BounceUpAndDownStatic>

                :
                  <BounceUpAndDownStatic 
                    scale={SCALE} tension={TENSION} style={styles.option_area_mini}
                    onPress={() => {
                      this.props.navigateTo('CommentListReply', { commentId: this.props.data.id })
                    }}
                  >     
                    <IconMaterialIcons style={[styles.option_area_icon, { color: this.element_on } ]} name="insert-comment" />
                    <Text style={[styles.option_area_text, { color: this.element_on } ]}>{this.props.data.snippet.totalReplyCount}</Text>
                  </BounceUpAndDownStatic>
            }
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
    paddingLeft: 15,
    paddingRight: 15,
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
    width: null,
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
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  comment_area_name_icon: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    //backgroundColor: 'red',
  },
  comment_area_name: {
    lineHeight: 22,
    fontWeight: 'bold',
    //backgroundColor: 'blue'
  },
  comment_area_icon: {
    color: 'black',
    fontSize: 24,    
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
    top: 1,
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
    justifyContent: 'center',
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
  
export default Comment