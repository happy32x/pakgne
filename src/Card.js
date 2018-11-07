import React from 'react'
import {
    TouchableNativeFeedback, 
    TouchableWithoutFeedback, 
    View, 
    Text, 
    Image,
    StyleSheet,
    ActivityIndicator,
    Share
} from 'react-native'
import Constants from 'expo'
import Icon from 'react-native-vector-icons/Ionicons'
import { withNavigation } from 'react-navigation'
import Star from './Star'
import timeConverter from './timeConverter'
import likeConverter from './likeConverter'
import MomentConverter from './MomentConverter'

class Card extends React.Component{
    constructor(props) {
        super(props)
        this.fetchData = this._fetchData.bind(this)
        this.state = {
            isLoading: true,
            _data: null,
        }
    }

    _fetchData(callback) {
        fetch(`https://www.googleapis.com/youtube/v3/videos?part=id,statistics,contentDetails&id=${this.props.id.videoId}&key=${this.props.apikey}`)
        .then(response => response.json())
        .then(callback)
        .catch(error => {
          console.error(error)
        })
    }

    componentDidMount() {
        this.fetchData(responseJson => {
            const data = responseJson.items
            this.setState({
                isLoading: false,
                _data: data,
            })
        })
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#F57F17"/>
                </View>
            )
        } else {
            return (
                <View key={this.props.id.videoId} style={{ alignSelf:'stretch', marginBottom:10 }}>

                    <View style={{ backgroundColor:"#FFF", alignSelf:'stretch', flexDirection:'row' }}>
                        <View style={{ flex: 1, alignItems:'center', justifyContent:'center', paddingTop:10, paddingBottom:10, paddingLeft:10}}>
                            <Icon style={{ fontWeight:'bold', fontFamily:'normal', color:"#000", fontSize:25 }} name="md-film" />
                        </View>

                        <View style={{ flex: 10, alignItems:'flex-start', justifyContent:'center', paddingTop:10, paddingBottom:10, paddingLeft:10 }}>
                            <Text style={{ color: '#000', fontSize: 16 }}>{this.props.snippet.title}</Text>
                            <Text style={{ color: '#A7A7A7', fontSize: 14 }}>
                                <MomentConverter publishAt={this.props.snippet.publishedAt} />
                            </Text>
                        </View>

                        <View style={{ flex: 2 }}>
                            <Star />
                        </View>
                    </View>

                    <View style={{ backgroundColor:"#000", height: 200, alignSelf:'stretch' }}>
                        <TouchableWithoutFeedback onPress={() => {
                            this.props.navigation.navigate('VideoViewer', {
                                videoId: this.props.id.videoId,
                            })
                        }}>
                            <View style={{ flex:1 }}>
                                <Image 
                                    source={{uri: this.props.snippet.thumbnails.medium.url}}
                                    style={{ flex: 1, height: null, width: null }}
                                />
                                <Text style={{
                                    color:"#FFF",
                                    position:"absolute",
                                    backgroundColor:"#000",
                                    paddingLeft:6,
                                    paddingRight:6,
                                    right:10,
                                    bottom:10,
                                    opacity:0.8,
                                    fontSize:13,
                                }}>{timeConverter(this.state._data[0].contentDetails.duration)}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <View style={{ backgroundColor:"#FFF", alignSelf:'stretch', flexDirection:'row', height:45 }}>
                        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#fabe92",true)}>
                            <View style={{ flex:1 , alignItems:'center', justifyContent:'center', flexDirection:'row', }}>
                                <View style={{ flex:1, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                                    <Icon style={{ fontWeight:'bold', fontFamily:'normal', color:"#F57F17", fontSize:20 }} name="md-heart" />
                                </View>
                                <View style={{ flex:1, alignItems:'center', justifyContent:'flex-start', flexDirection:'row'}}>
                                    <Text style={{ color: '#A7A7A7', fontSize: 14 }}>{likeConverter(this.state._data[0].statistics.likeCount)}</Text>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
        
                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.Ripple("#fabe92",true)}                            
                        >
                            <View style={{ flex:1, alignItems:'center', justifyContent:'center', flexDirection:'row', }}>
                                <View style={{ flex:1, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                                    <Icon style={{ fontWeight:'bold', fontFamily:'normal', color:"#F57F17", fontSize:20 }} name="md-chatbubbles" />
                                </View>
                                <View style={{ flex:1, alignItems:'center', justifyContent:'flex-start', flexDirection:'row'}}>
                                    <Text style={{ color: '#A7A7A7', fontSize: 14 }}>{likeConverter(this.state._data[0].statistics.commentCount)}</Text>
                                </View>
                            </View>
                        </TouchableNativeFeedback>

                        <TouchableNativeFeedback 
                            background={TouchableNativeFeedback.Ripple("#fabe92",true)}
                            onPress={() => {
                                Share.share({
                                  message: `https://www.youtube.com/watch?v=${this.props.id.videoId}`,
                                  url: `https://www.youtube.com/watch?v=${this.props.id.videoId}`,
                                  title: `${this.props.snippet.title}`
                                }, {
                                  dialogTitle: 'Partager cette video',
                                  excludedActivityTypes: [
                                    'com.apple.UIKit.activity.PostToTwitter'
                                  ]
                                })
                            }}
                        >
                            <View style={{ flex:1, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                                <View style={{ flex:1, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                                    <Icon style={{ fontWeight:'bold', fontFamily:'normal', color:"#F57F17", fontSize:20 }} name="md-share" />
                                </View>
                                <View style={{ flex:1, alignItems:'center', justifyContent:'flex-start', flexDirection:'row'}}>
                                    <Text style={{ color: '#A7A7A7', fontSize: 14 }}>shared</Text>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
        
                </View>
            )
        }
    }
}

export default withNavigation(Card)

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
    },
})