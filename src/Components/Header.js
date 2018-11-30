import React from 'react'
import { 
	TouchableNativeFeedback, 
	View, 
	Text, 
	StyleSheet,
	StatusBar
} from 'react-native'

import { Font } from 'expo'

import Icon from 'react-native-vector-icons/Ionicons'
import APPNAME from '../INFO/APPNAME'
import { withNavigation } from 'react-navigation'
import { DIMENSION } from '../INFO/DIMENSION'

const STATUSBAR_HEIGHT = StatusBar.currentHeight
const MIN_HEADER_HEIGHT = 60 
const MAX_HEADER_HEIGHT = STATUSBAR_HEIGHT + MIN_HEADER_HEIGHT

class Header extends React.Component {

	constructor(props) {
    super(props)
    this.state = {
      fontLoaded: false
    }
  }

	async componentDidMount() {
    await Font.loadAsync({
      'candy': require('../assets/fonts/candy.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <View style={styles.main_container}>
        <View style={styles.appname_container}>

					{
            this.state.fontLoaded 
              ? <Text style={{ fontFamily: 'candy', fontSize: 28, color: '#FFF', textAlign: 'center', paddingLeft:17 }}>Pakgne</Text>
                : <Text style={styles.appname}>{APPNAME}</Text>
          }

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
		backgroundColor: "#F57F17",
		height: MAX_HEADER_HEIGHT,
		width: '100%',
		flexDirection:'row',
		paddingTop: STATUSBAR_HEIGHT,
		marginTop:0,
		transform: [{ translateY: 0 }],
		position: 'absolute',
		zIndex: 999
	},
	appname_container: { 
		flex:1, 
		alignItems:'center', 
		justifyContent:'flex-start', 
		flexDirection:'row'
	},
	appname: {
		color:"#FFF", 
		fontSize:20, 
		paddingLeft:20,
		textAlign: 'center'
	},
	option_container: { 
		flex:1,
		alignItems:'center', 
		justifyContent:'flex-end', 
		flexDirection:'row' 
	},
	search_container: {
		width: 45, 
		height: MIN_HEADER_HEIGHT, 
		alignItems: 'center', 
		justifyContent: 'center', 
		flexDirection: 'row'
	},
	search: {
		fontWeight:'bold', 
		fontFamily:'normal', 
		color:"#FFF", 
		fontSize:25 
	},
	paramater_container: {
		width: 45, 
		height: MIN_HEADER_HEIGHT, 
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

