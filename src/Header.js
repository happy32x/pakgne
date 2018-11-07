import React from 'react'
import { TouchableNativeFeedback, View, Text, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import AppName from './AppName'
import { withNavigation } from 'react-navigation'

class Header extends React.Component{
  render() {
    return (
        <View style={{
          backgroundColor:"#F57F17",
          height:StatusBar.currentHeight+60,
          flexDirection:'row',
          paddingTop: StatusBar.currentHeight,
          marginTop:0,
        }}>
           <View style={{ flex:1, alignItems:'center', justifyContent:'flex-start', flexDirection:'row'}}>
               <Text style={{fontWeight:'bold', fontFamily:'normal', color:"#FFF", fontSize:18, paddingLeft:20 }}>{AppName}</Text>
           </View>
           <View style={{ flex:1, alignItems:'center', justifyContent:'flex-end', flexDirection:'row' }}>
           
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple("#ffc287",true)}
                    onPress={() => {
                        this.props.navigation.navigate('SearchViewer', {
                            searchId: null,
                        })
                    }}
                >
                    <View style={{width: 45, height: 60, alignItems:'center', justifyContent:'center', flexDirection:'row'}} >
                        <Icon style={{fontWeight:'bold', fontFamily:'normal', color:"#FFF", fontSize:25 }} name="md-search" />
                    </View>
                </TouchableNativeFeedback>

                <TouchableNativeFeedback 
                    background={TouchableNativeFeedback.Ripple("#ffc287",true)}
                    onPress={() => {
                        this.props.navigation.navigate('ParameterViewer', {
                            parameterId: null,
                        })
                    }}
                >
                    <View style={{width: 45, height: 60, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                        <Icon style={{fontWeight:'bold', fontFamily:'normal', color:"#FFF", fontSize:25 }} name="md-more" />
                    </View>
                </TouchableNativeFeedback>

            </View>
        </View>
    )
  }
}

export default withNavigation(Header)







