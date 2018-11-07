import React from 'react'
import { 
  Platform, 
  Text, 
  View, 
  Image,
  TouchableNativeFeedback,
  ScrollView
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'
import IconOcticons from 'react-native-vector-icons/Octicons'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import user_profile_pic from './assets/actrices-pakgne-pardon-internaute-jewanda.jpg'

export default class ParameterViewerContent extends React.Component{
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#dbdbdb",
          marginLeft: "20%"
        }}
      />
    );
  };

  render() {
    return (
      <View style={{ paddingTop: Platform.OS !== 'ios' ? this.props.headerMaxHeight : 0, }}>

          <View style={{ flex:1, flexDirection:'row', height:100, borderBottomWidth: 1, borderColor: "#d9d9d9"}}>
            <View style={{ flex:0.3, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
              <View style={{ height:60, width:60 }}>
                <Image source={user_profile_pic} style={{ flex: 1, borderRadius:60, height: null, width: null }}/>
              </View>
            </View>
            <View style={{ flex:0.7, alignItems:'flex-start', justifyContent:'center', flexDirection:'column', height: '100%', }}>
              <Text style={{ color: '#000', fontSize: 20 }}>User_ae450pu6e</Text>
              <Text style={{ color: '#aeaeae', fontSize: 16 }}>I am your first fan</Text>
            </View>
          </View>

          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#c8c8c8",false)}>
            <View style={{ flex:1, flexDirection:'row', height:60, }}>
              <View style={{ flex:0.2, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                <Icon style={{ fontWeight:'bold', fontFamily:'normal', color:"#F57F17", fontSize:20 }} name="md-key" />
              </View>
              <View style={{ flex:0.8, alignItems:'center', justifyContent:'flex-start', flexDirection:'row', height: '100%', }}>
                <Text style={{ color: '#000', fontSize: 16 }}>Account</Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          {this.renderSeparator()}

          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#c8c8c8",false)}>
            <View style={{ flex:1, flexDirection:'row', height:60, }}>
              <View style={{ flex:0.2, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                <IconOcticons style={{ fontWeight:'bold', fontFamily:'normal', color:"#F57F17", fontSize:20 }} name="comment-discussion" />
              </View>
              <View style={{ flex:0.8, alignItems:'center', justifyContent:'flex-start', flexDirection:'row', height: '100%', }}>
                <Text style={{ color: '#000', fontSize: 16 }}>Discussions</Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          {this.renderSeparator()}

          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#c8c8c8",false)}>
            <View style={{ flex:1, flexDirection:'row', height:60, }}>
              <View style={{ flex:0.2, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                <Icon style={{ fontWeight:'bold', fontFamily:'normal', color:"#F57F17", fontSize:20 }} name="md-notifications" />
              </View>
              <View style={{ flex:0.8, alignItems:'center', justifyContent:'flex-start', flexDirection:'row', height: '100%', }}>
                <Text style={{ color: '#000', fontSize: 16 }}>Notifications</Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          {this.renderSeparator()}

          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#c8c8c8",false)}>
            <View style={{ flex:1, flexDirection:'row', height:60, }}>
              <View style={{ flex:0.2, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                <IconMaterialIcons style={{ fontWeight:'bold', fontFamily:'normal', color:"#F57F17", fontSize:20 }} name="data-usage" />
              </View>
              <View style={{ flex:0.8, alignItems:'center', justifyContent:'flex-start', flexDirection:'row', height: '100%', }}>
                <Text style={{ color: '#000', fontSize: 16 }}>Data usage</Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          {this.renderSeparator()}

          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#c8c8c8",false)}>
            <View style={{ flex:1, flexDirection:'row', height:60, }}>
              <View style={{ flex:0.2, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                <Icon style={{ fontWeight:'bold', fontFamily:'normal', color:"#F57F17", fontSize:20 }} name="md-person-add" />
              </View>
              <View style={{ flex:0.8, alignItems:'center', justifyContent:'flex-start', flexDirection:'row', height: '100%', }}>
                <Text style={{ color: '#000', fontSize: 16 }}>Invite friend(s)</Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          {this.renderSeparator()}

          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#c8c8c8",false)}>
            <View style={{ flex:1, flexDirection:'row', height:60, }}>
              <View style={{ flex:0.2, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                <IconMaterialIcons style={{ fontWeight:'bold', fontFamily:'normal', color:"#F57F17", fontSize:20 }} name="event-note" />
              </View>
              <View style={{ flex:0.8, alignItems:'center', justifyContent:'flex-start', flexDirection:'row', height: '100%', }}>
                <Text style={{ color: '#000', fontSize: 16 }}>Event</Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          {this.renderSeparator()}

          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#c8c8c8",false)}>
            <View style={{ flex:1, flexDirection:'row', height:60, }}>
              <View style={{ flex:0.2, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                <Icon style={{ fontWeight:'bold', fontFamily:'normal', color:"#F57F17", fontSize:20 }} name="md-images" />
              </View>
              <View style={{ flex:0.8, alignItems:'center', justifyContent:'flex-start', flexDirection:'row', height: '100%', }}>
                <Text style={{ color: '#000', fontSize: 16 }}>Gallery</Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          {this.renderSeparator()}

          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#c8c8c8",false)}>
            <View style={{ flex:1, flexDirection:'row', height:60, }}>
              <View style={{ flex:0.2, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                <IconMaterialCommunityIcons style={{ fontWeight:'bold', fontFamily:'normal', color:"#F57F17", fontSize:20 }} name="phone" />
              </View>
              <View style={{ flex:0.8, alignItems:'center', justifyContent:'flex-start', flexDirection:'row', height: '100%', }}>
                <Text style={{ color: '#000', fontSize: 16 }}>Call for support</Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          {this.renderSeparator()}

          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#c8c8c8",false)}>
            <View style={{ flex:1, flexDirection:'row', height:60, }}>
              <View style={{ flex:0.2, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                <IconMaterialCommunityIcons style={{ fontWeight:'bold', fontFamily:'normal', color:"#F57F17", fontSize:20 }} name="qrcode" />
              </View>
              <View style={{ flex:0.8, alignItems:'center', justifyContent:'flex-start', flexDirection:'row', height: '100%', }}>
                <Text style={{ color: '#000', fontSize: 16 }}>Code generator</Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          {this.renderSeparator()}

          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#c8c8c8",false)}>
            <View style={{ flex:1, flexDirection:'row', height:60, }}>
              <View style={{ flex:0.2, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                <IconOcticons style={{ fontWeight:'bold', fontFamily:'normal', color:"#F57F17", fontSize:20 }} name="database" />
              </View>
              <View style={{ flex:0.8, alignItems:'center', justifyContent:'flex-start', flexDirection:'row', height: '100%', }}>
                <Text style={{ color: '#000', fontSize: 16 }}>Data saver</Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          {this.renderSeparator()}

          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#c8c8c8",false)}>
            <View style={{ flex:1, flexDirection:'row', height:60, }}>
              <View style={{ flex:0.2, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                <IconMaterialCommunityIcons style={{ fontWeight:'bold', fontFamily:'normal', color:"#F57F17", fontSize:20 }} name="earth" />
              </View>
              <View style={{ flex:0.8, alignItems:'center', justifyContent:'flex-start', flexDirection:'row', height: '100%', }}>
                <Text style={{ color: '#000', fontSize: 16 }}>Language</Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          {this.renderSeparator()}

          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#c8c8c8",false)}>
            <View style={{ flex:1, flexDirection:'row', height:60, }}>
              <View style={{ flex:0.2, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                <Icon style={{ fontWeight:'bold', fontFamily:'normal', color:"#F57F17", fontSize:20 }} name="md-lock" />
              </View>
              <View style={{ flex:0.8, alignItems:'center', justifyContent:'flex-start', flexDirection:'row', height: '100%', }}>
                <Text style={{ color: '#000', fontSize: 16 }}>Confidentiality</Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          {this.renderSeparator()}

          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#c8c8c8",false)}>
            <View style={{ flex:1, flexDirection:'row', height:60, }}>
              <View style={{ flex:0.2, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                <Icon style={{ fontWeight:'bold', fontFamily:'normal', color:"#F57F17", fontSize:20 }} name="md-bookmarks" />
              </View>
              <View style={{ flex:0.8, alignItems:'center', justifyContent:'flex-start', flexDirection:'row', height: '100%', }}>
                <Text style={{ color: '#000', fontSize: 16 }}>Condition and regulation</Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          {this.renderSeparator()}

          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#c8c8c8",false)}>
            <View style={{ flex:1, flexDirection:'row', height:60, }}>
              <View style={{ flex:0.2, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                <IconMaterialIcons style={{ fontWeight:'bold', fontFamily:'normal', color:"#F57F17", fontSize:20 }} name="report-problem" />
              </View>
              <View style={{ flex:0.8, alignItems:'center', justifyContent:'flex-start', flexDirection:'row', height: '100%', }}>
                <Text style={{ color: '#000', fontSize: 16 }}>Report a problem</Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          {this.renderSeparator()}

          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#c8c8c8",false)}>
            <View style={{ flex:1, flexDirection:'row', height:60, }}>
              <View style={{ flex:0.2, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                <Icon style={{ fontWeight:'bold', fontFamily:'normal', color:"#F57F17", fontSize:20 }} name="md-exit" />
              </View>
              <View style={{ flex:0.8, alignItems:'center', justifyContent:'flex-start', flexDirection:'row', height: '100%', }}>
                <Text style={{ color: '#000', fontSize: 16 }}>Disconnection</Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          {this.renderSeparator()}

          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#c8c8c8",false)}>
            <View style={{ flex:1, flexDirection:'row', height:60, }}>
              <View style={{ flex:0.2, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                <Icon style={{ fontWeight:'bold', fontFamily:'normal', color:"#F57F17", fontSize:20 }} name="md-information-circle" />
              </View>
              <View style={{ flex:0.8, alignItems:'center', justifyContent:'flex-start', flexDirection:'row', height: '100%', }}>
                <Text style={{ color: '#000', fontSize: 16 }}>About</Text>
              </View>
            </View>
          </TouchableNativeFeedback>

          {this.renderSeparator()}

          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#c8c8c8",false)}>
            <View style={{ flex:1, flexDirection:'row', height:60, }}>
              <View style={{ flex:0.2, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                <Icon style={{ fontWeight:'bold', fontFamily:'normal', color:"#F57F17", fontSize:20 }} name="md-help-circle" />
              </View>
              <View style={{ flex:0.8, alignItems:'center', justifyContent:'flex-start', flexDirection:'row', height: '100%', }}>
                <Text style={{ color: '#000', fontSize: 16 }}>Help</Text>
              </View>
            </View>
          </TouchableNativeFeedback>
      </View>
    )
  }
}
