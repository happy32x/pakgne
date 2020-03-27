import React, { Component } from 'react'
import { 
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native'

import THEME from '../INFO/THEME'
import DIMENSION from '../INFO/DIMENSION'

import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

class VideoListRefresh extends Component {
  render() {
    return (
      <View style={styles.main_container}>
        <View style={styles.button_container}>        
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#c6c6c6',true)}
            onPress={() => {
              console.log('refresh videoList !')
              this.props.updateForNewVideo()
            }}
          >
            <View style={styles.button}>              
              <IconMaterialCommunityIcons style={{color:THEME.TERTIARY.COLOR, fontSize:50}} name='refresh' />              
            </View>                                 
          </TouchableNativeFeedback>
        </View>

        <View style={styles.text}>
          <Text style={{color:THEME.TERTIARY.COLOR, textAlign:'center'}}>
            Connexion internet introuvable, veuillez actualiser.
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //paddingTop: DIMENSION.STATUSBAR_HEIGHT,
    paddingTop: DIMENSION.MEDIUM_HEADER_HEIGHT+DIMENSION.STATUSBAR_HEIGHT,
  },
  button_container: {
    width: null, 
    height: null,
    borderRadius: 50, 
  },
  button: { 
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: 100,    
  },
  text: { 
    marginTop: 10,
    height: null, 
    width: 200, 
  },
})

export default VideoListRefresh