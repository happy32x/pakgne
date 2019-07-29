import React from 'react'
import {
  View, 
  Text, 
  Image,
  StyleSheet,
  TouchableNativeFeedback,   
} from 'react-native'

import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import base64Generator from '../../AI/Base64Generator'
import BounceUpAndDownStatic from '../../Animations/BounceUpAndDownStatic'
import THEME from '../../INFO/THEME'

const REDVALUE = 50
const USER_IMG_SIZE = 100

const DEFAULT_IMG = '../../assets/default_100.jpg'
const DEFAULT_GROUP_IMG = '../../assets/default_group_100.jpg'

import DEFAULT_IMG_LARGE from '../../assets/default.jpg'
import DEFAULT_GROUP_IMG_LARGE from '../../assets/default_group.jpg'

class ChatListElement extends React.Component{
  _isMounted = false
  
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this._isMounted = true    
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {  
    return (
      <TouchableNativeFeedback 
        background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,false)}
        onPress={() => { 
          this.props.navigateTo('ChatViewer', { 
            name: this.props.data.nom,    
            type: this.props.data.type,  
          }) 
        }}
      >
        <View style={styles.band}>

          <View style={styles.comment_container_left}>            
            <BounceUpAndDownStatic 
              scale={.8}
              onPress={() => {
                this.props.navigateTo('ImageViewer', { 
                  title: this.props.data.nom,
                  //imgURLPreview: youtubeImageResizer(this.props.data.snippet.topLevelComment.snippet.authorProfileImageUrl, USER_IMG_SIZE) ,                
                  imgURLPreview: this.props.data.type === 'group' ? DEFAULT_GROUP_IMG_LARGE : DEFAULT_IMG_LARGE
                })
              }}
            >
              <View style={styles.comment_container_left_img_container}>
                {this.props.data.type === 'group'
                  ? <View>
                      <Image
                        style={styles.comment_container_left_img_background}
                        source={require(DEFAULT_GROUP_IMG)}
                      />
                      <Image
                        style={styles.comment_container_left_img}                        
                        source={require(DEFAULT_GROUP_IMG)}
                        //source={{ uri: youtubeImageResizer(this.props.data.snippet.topLevelComment.snippet.authorProfileImageUrl, USER_IMG_SIZE) }}
                      />
                    </View>             
                  : <View>
                      <Image
                        style={styles.comment_container_left_img_background}
                        source={require(DEFAULT_IMG)}
                      />
                      <Image
                        style={styles.comment_container_left_img}
                        source={require(DEFAULT_IMG)}
                        //source={{ uri: youtubeImageResizer(this.props.data.snippet.topLevelComment.snippet.authorProfileImageUrl, USER_IMG_SIZE) }}
                      />
                    </View>
                }                
              </View>
            </BounceUpAndDownStatic>
          </View>

          <View style={styles.text_container}>

            <View style={styles.text_container_top}>
              <View style={styles.name_container}>
                <Text style={styles.name} numberOfLines={1}>
                  {this.props.data.nom}
                </Text>
              </View>  
              <View style={styles.date_container}>
                <Text style={styles.date}>07/01/2023</Text>
              </View>                    
            </View>

            <View style={styles.text_container_bottom}>
              <View style={styles.message_status_container}>                
                <IconMaterialCommunityIcons style={styles.message_status} name="check-all" />
              </View>
              <View style={styles.lastcomment_container}>
                <Text style={styles.lastcomment} numberOfLines={1}>
                  {this.props.data.last_comment}dsfsffsffsfsfsfsfsdfdsfsffsffdfsfsdf
                </Text>
              </View>  
              <View style={styles.group_status_container}>                
                <IconIonicons style={styles.group_status} name="md-star-outline" />
              </View>
            </View>
            
          </View>

        </View>
      </TouchableNativeFeedback>
    )    
  }
}

const styles = StyleSheet.create({  
  band: { 
    flex:1, 
    flexDirection:'row', 
    height:80, 
  },
  comment_container_left: { 
    flex:0.25, 
    alignItems:'center', 
    justifyContent:'center', 
    flexDirection:'row'
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
  /*comment_container_left: {
    width: REDVALUE,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },*/  
  text_container: { 
    flex:0.8, 
    flexDirection:'column', 
    height: '100%', 
    borderBottomWidth: 1,
    borderBottomColor: THEME.TERTIARY.SEPARATOR_COLOR,    
  },
  text_container_top: {
    flex: 1,
    alignItems:'center', 
    justifyContent:'center',
    flexDirection:'row', 
    paddingTop: 10,
  },
  text_container_bottom: {
    flex: 1,
    alignItems:'center', 
    justifyContent:'center',
    flexDirection: 'row', 
    paddingBottom: 10,   
  },
  name_container: {
    flex: 1,
    alignItems:'center', 
    justifyContent:'flex-start', 
    flexDirection:'row',
    paddingRight: 10,
  },  
  date_container: {
    alignItems:'center', 
    justifyContent:'center',     
    flexDirection:'row',
    paddingRight: 10,
  },
  name: { 
    color: THEME.SECONDARY.COLOR, 
    fontSize: 16, 
    fontWeight:'bold',
  },
  date: {
    color: THEME.TERTIARY.COLOR, 
    fontSize: 12,     
  },

  lastcomment_container: {
    flex: 1,
    alignItems:'center', 
    justifyContent:'flex-start', 
    flexDirection:'row',
    paddingRight: 10,
  },
  message_status_container: {
    alignItems:'center', 
    justifyContent:'center',     
    flexDirection:'row',
    paddingRight: 5,
  },
  group_status_container: {
    alignItems:'center', 
    justifyContent:'center',     
    flexDirection:'row',
    paddingRight: 10,
  },

  lastcomment: {
    color: THEME.TERTIARY.COLOR,
    fontSize: 16,     
  },  
  message_status: {
    color: THEME.PRIMARY.BACKGROUND_COLOR, 
		fontSize: 16,
  },
  group_status: {
		color: THEME.TERTIARY.COLOR, 
		fontSize: 16,
  },
})

export default ChatListElement

