import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
} from 'react-native'

import ViewMoreText from 'react-native-view-more-text'
import firebase from 'firebase'

import Autolink from 'react-native-autolink'
import HourConverter from '../HourConverter'
import { imageResizer } from '../../AI/ImageResizer'
import BounceUpAndDownStatic from '../../Animations/BounceUpAndDownStatic'
import THEME from '../../INFO/THEME'

import Icon from 'react-native-vector-icons/Ionicons'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'

const SCALE = .5
const TENSION = 100

const REDVALUE = 50-10
const miniREDVALUE = 10

const USER_IMG_SIZE = 100
const DEFAULT_IMG = '../../assets/default_100.jpg'

class Discussion_OLD extends React.Component {
  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {    
      
    }    

    this.renderViewMore = this._renderViewMore.bind(this)
    this.renderViewLess = this._renderViewLess.bind(this)
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

  componentDidMount() {
    this._isMounted = true    
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    return (
      <View style={styles.comment_container}>      

        <View style={styles.comment_container_right}>
          

          <View style={styles.comment_area}>                
          
            <View style={{   
              position: 'absolute',
              //width: 10*2+5,
              //height: 10,
              backgroundColor: 'transparent',
              top: 1,
              left: -10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Icon style={[styles.arrow_dropdown_icon, {elevation: 1}]} name="md-arrow-dropdown" />
            </View>

            <View style={{
              //maxWidth: Dimensions.get('window').width*80/100-20,
              //width: null,
              //height: null,
              alignSelf: 'stretch',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 0,
              //paddingVertical: 5,
              //paddingHorizontal: 5,
              //backgroundColor: 'red',
              overflow: 'hidden',
              
            }}>   
              <View style={{
                backgroundColor: THEME.TERTIARY.SHARP_COLOR,//'blue',
                alignSelf: 'stretch',                  
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',  
                //borderRadius: 5, 
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,                         
              }}>         
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR, true)}
                  onPress={() => {
                    console.log("author name touch !")
                  }}
                > 
                  <View style={{
                    //backgroundColor: 'yellow',
                    alignSelf: 'stretch',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    paddingLeft: 30,
                    paddingRight: 5,
                    paddingVertical: 5,                  
                    borderRadius: 5,
                  }}>
                    <Image
                      style={[styles.comment_container_left_img, {
                        left:6,
                        borderRadius: miniREDVALUE,
                        width: miniREDVALUE+10,
                        height: miniREDVALUE+10,
                      }]}
                      source={require(DEFAULT_IMG)}
                    />   
                    <Image
                      style={[styles.comment_container_left_img, {
                        left:6,
                        borderRadius: miniREDVALUE,
                        width: miniREDVALUE+10,
                        height: miniREDVALUE+10,
                      }]}
                      source={require(DEFAULT_IMG)}
                    />
                    <Text style={[styles.comment_area_name, {marginTop:-2, color:'#5498c6',alignSelf: 'stretch',} ]} numberOfLines={1}>
                      {this.props.data.val().author_name}
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>

            <View style={{              
              alignSelf: 'stretch',
              backgroundColor: THEME.TERTIARY.SHARP_COLOR_DARK,                    
              margin: 0,
              marginBottom: 5,
              marginHorizontal: 5,
              borderRadius: 5,

              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR, true)}
                onPress={() => {
                  console.log("quote touch !")
                }}
              > 
                <View style={{
                  alignSelf: 'stretch',
                  borderLeftColor: THEME.PRIMARY.BACKGROUND_COLOR,
                  borderLeftWidth: 5,                  
                  padding: 5,
                  
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',  
                }}>
                  <Text
                    numberOfLines={1} 
                    style={{
                      fontWeight: 'bold',
                      color: THEME.PRIMARY.BACKGROUND_COLOR,
                      alignSelf: 'flex-start',
                      fontSize: 10,
                    }}
                  >
                    {this.props.data.val().author_name}
                  </Text>
                  <Text numberOfLines={3} style={{alignSelf: 'flex-start'}}>
                    Et puis quoi !!! {/*this.props.data.val().message*/}
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </View>

            <View style={{paddingHorizontal: 8}}>
              <ViewMoreText              
                numberOfLines={50}
                renderViewMore={this.renderViewMore}
                renderViewLess={this.renderViewLess}
                key={this.props.data.val().message.length}                        
              >
                <Autolink
                  style={styles.comment_area_text}
                  text={this.props.data.val().message}                  
                  hashtag="instagram"
                  mention="twitter"
                />                
              </ViewMoreText>
            </View>            
            
            <View style={styles.option_area_mini}>
              <Text style={[styles.option_area_text,]}>
                10:20
                {/*<HourConverter 
                  publishAt={this.props.data.val().messageTimeStamp} 
                />*/}
              </Text>
            </View>              
                    
          </View>                                    

        </View>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  comment_container: {
    paddingVertical: 5,
    width: null,
    height: null,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 15,
    paddingRight: 15,
    //backgroundColor: 'gray',
  },
  comment_container_right: {
    width: null,
    height: null,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 0,
    borderRadius: 10,    
  },
  comment_area: {
    maxWidth: Dimensions.get('window').width*80/100,
    width: null,
    height: null,
    borderRadius: 10,
    backgroundColor: THEME.TERTIARY.SHARP_COLOR,
    padding: 0,
    paddingTop: 0,
    paddingBottom: 5,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',    
    elevation: 1,
  },
  comment_area_name_icon: {
    width: null,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  comment_area_name: {
    lineHeight: 22,
    fontWeight: 'bold',
  },
  comment_area_icon: {
    color: 'black',
    fontSize: 24,    
  },
  comment_area_text: {
    fontSize: 16,
    lineHeight: 22,
  },
  arrow_dropdown_icon: {    
    color: THEME.TERTIARY.SHARP_COLOR,
    fontSize: 50,  
  },
  option_area_mini: {      
    paddingHorizontal: 8,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  option_area_text: {
    color: THEME.TERTIARY.COLOR,
    fontSize: 12,
  },
  option_area_icon: {
    color: THEME.TERTIARY.COLOR,
    fontSize: 25,
    marginRight: 0,
  },
  message_pic_container: {
    //width: miniREDVALUE+10,
    //height: miniREDVALUE+10,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    //borderRadius: miniREDVALUE,
    marginRight: 5,    
    backgroundColor: 'blue'
  },
  comment_container_left_img_background: { 
    borderRadius: miniREDVALUE, 
    height: miniREDVALUE+10, 
    width: miniREDVALUE+10, 
  },
  comment_container_left_img: {
    position: "absolute",
    borderRadius: miniREDVALUE,
    width: miniREDVALUE+10,
    height: miniREDVALUE+10,
  },
})
  
export default Discussion_OLD