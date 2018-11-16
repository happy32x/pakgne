import React from 'react'
import { 
	TouchableNativeFeedback, 
	View, 
	Text, 
	StatusBar,
	StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import AppName from '../Info/AppName'
import { withNavigation } from 'react-navigation'

class Header extends React.Component{
  render() {
    return (
      <View style={styles.main_container}>
        <View style={styles.appname_container}>
          <Text style={styles.appname}>{AppName}</Text>
        </View>
        <View style={styles.option_container}>   
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("#ffc287",true)}
            onPress={() => {
              this.props.navigation.navigate('SearchViewer', {
              	searchId: null,
            	})
            }}
          >
            <View style={styles.search_container} >
              <Icon style={styles.search} name="md-search" />
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
            <View style={styles.paramater_container}>
              <Icon style={styles.paramater} name="md-more" />
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
		backgroundColor:"#F57F17",
		height:StatusBar.currentHeight+60,
		flexDirection:'row',
		paddingTop: StatusBar.currentHeight,
		marginTop:0,
	},
	appname_container: { 
		flex:1, 
		alignItems:'center', 
		justifyContent:'flex-start', 
		flexDirection:'row'
	},
	appname: {
		fontWeight:'bold', 
		fontFamily:'normal', 
		color:"#FFF", 
		fontSize:18, 
		paddingLeft:20 
	},
	option_container: { 
		flex:1,
		alignItems:'center', 
		justifyContent:'flex-end', 
		flexDirection:'row' 
	},
	search_container: {
		width: 45, 
		height: 60, 
		alignItems:'center', 
		justifyContent:'center', 
		flexDirection:'row'
	},
	search: {
		fontWeight:'bold', 
		fontFamily:'normal', 
		color:"#FFF", 
		fontSize:25 
	},
	paramater_container: {
		width: 45, 
		height: 60, 
		alignItems:'center', 
		justifyContent:'center', 
		flexDirection:'row'
	},
	paramater: {
		fontWeight:'bold', 
		fontFamily:'normal', 
		color:"#FFF", 
		fontSize:25 
	}
})

export default withNavigation(Header)

