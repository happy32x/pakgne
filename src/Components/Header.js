import React from 'react'
import { 	
	View, 
	Text, 
	StyleSheet,
	TouchableNativeFeedback,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import APPNAME from '../INFO/APPNAME'
import DIMENSION from '../INFO/DIMENSION'
import THEME from '../INFO/THEME'

class Header extends React.Component {

	constructor(props) {
    super(props)  
  }

  render() {
    return (
      <View style={styles.main_container}>

        <View style={styles.appname_container}>
          <Text style={[styles.appname_candice, {fontFamily: this.props.appNamePolice}]}>
						{APPNAME}
					</Text>
        </View>

        <View style={styles.option_container}>
				  <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(THEME.PRIMARY.WAVE_COLOR_PRIMARY,true)}
            onPress={() => {
              this.props.navigateTo('FavoriteViewer', {
								id: 'favorite',								
            	})
            }}
          >
            <View style={styles.favorite_container} >
              <Icon style={styles.favorite} name="md-star" />
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(THEME.PRIMARY.WAVE_COLOR_PRIMARY,true)}
            onPress={() => {
              this.props.navigateTo('SearchViewer', {
              	id: "search",
            	})
            }}
          >
            <View style={styles.search_container} >
              <Icon style={styles.search} name="md-search" />
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback 
            background={TouchableNativeFeedback.Ripple(THEME.PRIMARY.WAVE_COLOR_PRIMARY,true)}
            onPress={() => {
              this.props.navigateTo('ParameterViewer', {
                id: "parameter",
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
		backgroundColor: THEME.PRIMARY.BACKGROUND_COLOR,
		height: DIMENSION.MAX_HEADER_HEIGHT,
		width: '100%',
		flexDirection:'row',
		paddingTop: DIMENSION.STATUSBAR_HEIGHT,
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
	appname_candice: { 		 
		fontSize: 28, 
		color: THEME.PRIMARY.COLOR, 
		textAlign: 'center', 
		paddingLeft: 17, 
	},
	appname: {
		color: THEME.PRIMARY.COLOR, 
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
	favorite_container: {
		width: 45, 
		height: DIMENSION.MIN_HEADER_HEIGHT, 
		alignItems: 'center', 
		justifyContent: 'center', 
		flexDirection: 'row',
		paddingBottom: 2,
	},
	favorite: {
		fontWeight:'bold', 
		fontFamily:'normal', 
		color: THEME.PRIMARY.COLOR, 
		fontSize:25 
	},
	search_container: {
		width: 45, 
		height: DIMENSION.MIN_HEADER_HEIGHT, 
		alignItems: 'center', 
		justifyContent: 'center', 
		flexDirection: 'row'
	},
	search: {
		fontWeight:'bold', 
		fontFamily:'normal', 
		color: THEME.PRIMARY.COLOR, 
		fontSize:25 
	},
	paramater_container: {
		width: 45, 
		height: DIMENSION.MIN_HEADER_HEIGHT, 
		alignItems:'center', 
		justifyContent:'center', 
		flexDirection:'row'
	},
	paramater: {
		fontWeight:'bold', 
		fontFamily:'normal', 
		color: THEME.PRIMARY.COLOR, 
		fontSize:25 
	}
})

export default Header

