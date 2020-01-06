import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableNativeFeedback,
} from 'react-native'

import {
  getChatFromApi,
} from './API/REQUEST'

import { imageResizer } from '../../AI/ImageResizer'
import MomentConverter from '../MomentConverter'

import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import base64Generator from '../../AI/Base64Generator'
import BounceUpAndDownStatic from '../../Animations/BounceUpAndDownStatic'
import THEME from '../../INFO/THEME'

import DEFAULT_IMG_LARGE from '../../assets/default.jpg'
import DEFAULT_GROUP_IMG_LARGE from '../../assets/default_group.jpg'

const REDVALUE = 50
const miniREDVALUE = 10
const USER_IMG_SIZE = 100

const DEFAULT_IMG = '../../assets/default_100.jpg'
const DEFAULT_GROUP_IMG = '../../assets/default_group_100.jpg'

class ChatListElement extends React.Component{
  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {
      data: null,
      isLoading: true,
      insideDiscussion: false,
    }

    this.refreshData = this._refreshData.bind(this)
    this.fetchData = this._fetchData.bind(this)
  }

  _refreshData(snapshot) {
    if(this._isMounted) {
      console.log("snapshot.key :: " + snapshot.key)
      this.setState({
        data: snapshot,
        isLoading: false,
      })
    }
  }

  _fetchData() {
    console.log("ChatListElement :: this.props.data.key :: ", this.props.data.key)
    getChatFromApi(this.props.data.key, this.refreshData)
  }

  componentDidMount() {
    this._isMounted = true

    this.setState({isLoading: false,})

    //this.fetchData()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.isloading_container}> 
          <ActivityIndicator size="small" color={THEME.PRIMARY.BACKGROUND_COLOR}/>
        </View>
      )
    } else {
      return (
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,false)}
          onPress={() => {
            this.props.navigateTo('ChatViewer', {
              //chatKey: this.state.data.key,
              //name: this.state.data.val().title,
              //type: this.state.data.val().type,
              //pic: this.state.data.val().pic,
            }) 
          }}
        >
          <View style={styles.band}>

            <View style={styles.comment_container_left}>            
              <BounceUpAndDownStatic
                scale={.8}
                onPress={() => {
                  this.props.navigateTo('ImageViewerDynamic', {
                    //title: this.state.data.val().title,
                    //imgURLPreview: imageResizer(this.state.data.val().pic, USER_IMG_SIZE),
                  })
                }}
              >
                <View style={styles.comment_container_left_img_container}>
                  {'group'=== 'group'//this.state.data.val().type === 'group'
                    ? <View style={{flex:1}}>
                        <Image
                          style={styles.comment_container_left_img_background}
                          source={require(DEFAULT_GROUP_IMG)}
                        />
                        {/*<Image
                          style={styles.comment_container_left_img}                        
                          source={{ uri: imageResizer(this.state.data.val().pic, USER_IMG_SIZE) }}                        
                        />*/}
                      </View>             
                    : <View style={{flex:1}}>
                        <Image
                          style={styles.comment_container_left_img_background}
                          source={require(DEFAULT_IMG)}
                        />
                        {/*<Image
                          style={styles.comment_container_left_img}                        
                          source={{ uri: imageResizer(this.state.data.val().pic, USER_IMG_SIZE) }}                        
                        />*/}
                      </View>
                  }
                </View>
              </BounceUpAndDownStatic>
            </View>

            <View style={styles.text_container}>

              <View style={styles.text_container_top}>
                <View style={styles.name_container}>
                  <Text style={styles.name} numberOfLines={1}>
                    {/*this.state.data.val().title*/}
                  </Text>
                </View>
                <View style={styles.date_container}>
                  <Text style={[styles.date, {color: THEME.TERTIARY.COLOR} ]}>
                    {/*<MomentConverter publishAt={this.state.data.val().lastMessageTimeStamp} />*/}               
                  </Text>
                </View>
              </View>

              <View style={styles.text_container_bottom}>
                {/*<View style={styles.message_status_container}>                
                  <IconMaterialCommunityIcons style={styles.message_status} name="check-all" />
                </View>*/}
                <View style={styles.message_pic_container}>    
                  <View style={{flex:1}}>
                    <Image
                      style={styles.comment_container_left_img_background}
                      source={require(DEFAULT_IMG)}
                    />
                    {/*<Image
                      style={[styles.comment_container_left_img, {
                        borderRadius: miniREDVALUE,
                        width: miniREDVALUE+10,
                        height: miniREDVALUE+10,
                      }]}
                      source={{ uri: imageResizer(this.state.data.val().lastMessagePic, REDVALUE) }}
                    />*/}
                  </View>
                </View>
                <View style={styles.lastcomment_container}>
                  <Text style={styles.lastcomment} numberOfLines={1}>
                    : {/*this.state.data.val().lastMessage*/}
                  </Text>
                </View>
                {/*
                  <View style={styles.group_status_container}>                
                    <Text style={{color: THEME.PRIMARY.COLOR, marginTop:-1}}>
                      3
                    </Text>
                  </View>        
                */}
              </View>
              
            </View>

          </View>
        </TouchableNativeFeedback>
      )    
    }
  }
}

const styles = StyleSheet.create({  
  isloading_container: {
    flex:1,
    height:80,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
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
  message_pic_container: {
    width: 20,
    height: 20,
    alignItems:'center', 
    justifyContent:'center',
    flexDirection:'row',
    borderRadius: 10,
    marginRight: 5,  
  },
  group_status_container: {   
    width: 26,
    height: 26,
    alignItems:'center', 
    justifyContent:'center',     
    flexDirection:'row',
    marginRight: 10,
    borderRadius: 13,
    backgroundColor: THEME.PRIMARY.BACKGROUND_COLOR,
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

