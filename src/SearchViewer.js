import React, {Component} from 'react';
import { 
  View, 
  TouchableNativeFeedback, 
  StatusBar, 
  Platform,
  TextInput 
} from 'react-native'
import { SearchBar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import BarStatus from './BarStatus'
import InfiniteScrollView from '../_SandBox/InfiniteScrollView/InfiniteScrollView'

export default class SearchViewer extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View>
        <View style={{ 
          backgroundColor:"#FFF", 
          height:StatusBar.currentHeight+55, 
          flexDirection:'row',
          paddingTop: StatusBar.currentHeight,
          marginTop:0,
        }}>
          <View style={{ flex:0.2, alignItems:'center', justifyContent:'flex-start', flexDirection:'row', }}>
                <TouchableNativeFeedback 
                    background={TouchableNativeFeedback.Ripple("#c2c2c2",true)}
                    onPress={() => {
                      this.props.navigation.goBack()
                    }}
                >
                    <View style={{width: 50, height: 60, alignItems:'center', justifyContent:'center', flexDirection:'row'}} >
                        <Icon style={{fontWeight:'bold', fontFamily:'normal', color:"#F57F17", fontSize:25 }} name="md-arrow-back" />
                    </View>
                </TouchableNativeFeedback>
          </View>

          <View style={{ flex:1, alignItems:'center', justifyContent:'flex-start', flexDirection:'row', }}>
            <TextInput
              style={{height: '100%', width: '85%', fontSize: 18,}}
              placeholder="Search ..."
              selectionColor="#F57F17"
              autoFocus={true}
              underlineColorAndroid="transparent"
              autoCorrect={false}
              autoCapitalize={'none'}
              keyboardType={'web-search'}
              returnKeyType={'search'}
            />
          </View>
        </View>

        <InfiniteScrollView/>

        { Platform.OS === 'android' ? <BarStatus color="#FFF"/> : null }
      </View>
    )
  }
}
