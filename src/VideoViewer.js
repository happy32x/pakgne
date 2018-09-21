import React from 'react'
import { 
  ScrollView, 
  View, Text, 
  Platform, 
  StatusBar, 
  Image,
  TouchableNativeFeedback,
} from 'react-native'
import BarStatus from './BarStatus'
import Icon from 'react-native-vector-icons/Ionicons'
import img from './assets/2.jpg'
import YoutubeWebView from './YoutubeWebView'
import YoutubeView from './YoutubeView'

export default class VideoViewer extends React.Component{
  
  static navigationOptions = {
    header: null
  };

  render() {
    const { navigation } = this.props
    const videoId = navigation.getParam('videoId', 'NO-ID')

    return (
      <View style={{ flex:1 }}>
          <View style={{alignSelf:'stretch', height:200, backgroundColor:"#000", marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
            <YoutubeView videoId={videoId} />
            
            <TouchableNativeFeedback 
              background={TouchableNativeFeedback.Ripple("#5e5e5e",true)}
              onPress={() => this.props.navigation.goBack()}
            > 
              <View style={{ 
                position:"absolute", 
                top: 0,
                left: 0,
                width: 40, 
                height: 40,
                alignItems:'center', 
                justifyContent:'center', 
                opacity: 0.3
              }}>
                <Icon style={{           
                  fontWeight:'bold', 
                  color:"#FFF", 
                  fontSize:20,                  
                }} name="md-arrow-back" /> 
              </View>              
            </TouchableNativeFeedback>
          </View>

          <ScrollView style={{ flex:1 }} showsVerticalScrollIndicator={false}>

            <View style={{ alignSelf:"stretch", borderBottomWidth: 1, borderColor: "#d9d9d9" }}>
              <View style={{ alignSelf:"stretch", padding:15 }}>
                <View style={{ alignSelf:"stretch" }} >
                  <Text style={{ fontSize:17 }}>Pakgne Saidon 2 : La sorcière</Text>
                  <Text style={{ fontSize:12, color: '#979797' }}>587 k vues</Text>
                </View>
                <View style={{ alignSelf:"stretch", marginTop:15, flexDirection:'row' }} >
                  <View style={{ flex:1, alignItems:'center', justifyContent:'center'}}>
                    <Icon style={{ color:"#F57F17", fontSize:20 }} name="md-heart" />
                    <Text style={{ fontSize:12, color: '#F57F17' }}>29 k</Text>
                  </View>
                  <View style={{ flex:1, alignItems:'center', justifyContent:'center'}}>
                    <Icon style={{ color:"#979797", fontSize:20 }} name="md-heart-outline" />
                    <Text style={{ fontSize:12, color: '#979797' }}>2,7 k</Text>
                  </View>
                  <View style={{ flex:1, alignItems:'center', justifyContent:'center'}}>
                    <Icon style={{ color:"#979797", fontSize:20 }} name="md-share" />
                    <Text style={{ fontSize:12, color: '#979797' }}>shared</Text>
                  </View>
                  <View style={{ flex:1, alignItems:'center', justifyContent:'center'}}>
                    <Icon style={{ color:"#979797", fontSize:20 }} name="md-download" />
                    <Text style={{ fontSize:12, color: '#979797' }}>download</Text>
                  </View>          
                </View>
              </View>
            </View>

            <View style={{ alignSelf:"stretch" }}>
              <View style={{ alignSelf:"stretch", padding:15, alignItems:'flex-start' }}>
                <Text style={{ fontSize:13, color: '#979797' }}>A suivre</Text>
              </View>
            </View>

            <View style={{ alignSelf:"stretch" }}>
              <View style={{ alignSelf:"stretch", paddingLeft:15, paddingRight:15 }}>
                <View style={{ alignSelf:"stretch", height:90, flexDirection:'row', marginBottom:15 }} >
                  <View style={{ flex:1 }}>
                    <Image source={img} style={{ flex: 1, height: null, width: null }}/>
                    <Text style={{
                                color:"#FFF", 
                                position:"absolute", 
                                backgroundColor:"#000",
                                paddingLeft:6, 
                                paddingRight:6, 
                                right:5,
                                bottom:5,
                                opacity:0.8,
                                fontSize:11,
                            }}>6:54</Text>
                  </View>
                  <View style={{ flex:1, paddingTop:1, paddingBottom:5 , paddingLeft:15 }}>
                    <Text style={{ fontSize:14 }}>GUNDAM SEED DESTINY - LA MONTE EN PUISSANCE DE SCROBIUM</Text>
                    <Text style={{ fontSize:11, color:"#979797", marginTop:1 }}>1,7 vues - il y'a 2 jours</Text>
                  </View>
                </View>
              </View>
            </View>

          </ScrollView>

          { Platform.OS === 'android' ? <BarStatus color="#000" /> : null }
      </View>
    );
  }
}


