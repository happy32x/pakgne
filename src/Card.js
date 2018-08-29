import React from 'react'
import { TouchableNativeFeedback, TouchableWithoutFeedback, View, Text, Image } from 'react-native'
import img from './assets/2.jpg'
import Icon from 'react-native-vector-icons/Ionicons'
import { withNavigation } from 'react-navigation'

class Card extends React.Component{
  render() {
    return (
        <View style={{ alignSelf:'stretch', marginBottom:10 }}>

            <View style={{ backgroundColor:"#FFF", alignSelf:'stretch', flexDirection:'row' }}>
                <View style={{ flex: 1, alignItems:'center', justifyContent:'center', paddingTop:10, paddingBottom:10, paddingLeft:10}}>
                    <Icon style={{ fontWeight:'bold', fontFamily:'normal', color:"#000", fontSize:25 }} name="md-film" />
                </View>

                <View style={{ flex: 10, alignItems:'flex-start', justifyContent:'center', paddingTop:10, paddingBottom:10, paddingLeft:10 }}>
                    <Text style={{ color: '#000', fontSize: 16 }}>{this.props.title}</Text>
                    <Text style={{ color: '#A7A7A7', fontSize: 14 }}>Video - il y'a {this.props.datePost} min</Text>
                </View>

                <View style={{ flex: 2 }}>
                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#fabe92",true)}>
                        <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
                            <Icon style={{ fontWeight:'bold', fontFamily:'normal', color:"#F57F17", fontSize:20 }} name="md-star-outline" />
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>

            <View style={{ backgroundColor:"#000", height: 200, alignSelf:'stretch' }}>
                <TouchableWithoutFeedback onPress={() => {
                    this.props.navigation.navigate('ArticleViewer', {
                        itemId: 86,
                        otherParam: 'anything you want here',
                    });
                }}>
                    <View style={{ flex:1 }}>
                        <Image source={img} style={{ flex: 1, height: null, width: null }}/>
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
                        }}>{this.props.duration}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>

            <View style={{ backgroundColor:"#FFF", alignSelf:'stretch', flexDirection:'row', paddingTop:10, paddingBottom:10,  }}>
                <View style={{ flex: 1, alignItems:'center', justifyContent:'center', flexDirection:'row' }}>
                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#fabe92",true)}>
                        <View style={{ width:70, height:30, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                            <View style={{ flex:1, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                                <Icon style={{ fontWeight:'bold', fontFamily:'normal', color:"#F57F17", fontSize:20 }} name="md-heart" />
                            </View>
                            <View style={{ flex:1, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                                <Text style={{ color: '#A7A7A7', fontSize: 14 }}>{this.props.like}</Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                </View>

                <View style={{ flex: 1, alignItems:'center', justifyContent:'center', flexDirection:'row' }}>
                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#fabe92",true)}>
                        <View style={{ width:70, height:30, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                            <View style={{ flex:1, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                                <Icon style={{ fontWeight:'bold', fontFamily:'normal', color:"#F57F17", fontSize:20 }} name="md-chatbubbles" />
                            </View>
                            <View style={{ flex:1, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                                <Text style={{ color: '#A7A7A7', fontSize: 14 }}>{this.props.comment}</Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                </View>

                <View style={{ flex: 1, alignItems:'center', justifyContent:'center', flexDirection:'row' }}>
                    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#fabe92",true)}>
                        <View style={{ width:70, height:30, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                            <View style={{ flex:1, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                                <Icon style={{ fontWeight:'bold', fontFamily:'normal', color:"#F57F17", fontSize:20 }} name="md-share" />
                            </View>
                            <View style={{ flex:1, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                                <Text style={{ color: '#A7A7A7', fontSize: 14 }}>{this.props.share}</Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>

        </View>
    )
  }
}

export default withNavigation(Card)

