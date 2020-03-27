import React, { Component, PureComponent } from 'react'
import {  
  View,
  Text,
  Animated,
  Dimensions,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native'

import DIMENSION from '../INFO/DIMENSION'
import THEME from '../INFO/THEME'

import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const SCREEN_WIDTH = Dimensions.get('window').width

class NewVideoPopUp extends Component {

  constructor(props) {    
    super(props)  
    this.state = {
      leftAnim: new Animated.Value(-SCREEN_WIDTH), 
    }    
    this.handleCloseNewVideoPopUp = this._handleCloseNewVideoPopUp.bind(this)
  }

  _handleCloseNewVideoPopUp() {
    Animated.spring(this.state.leftAnim, {
      toValue: -SCREEN_WIDTH
    }).start(() => {         
      this.props.closeNewVideoPopUp()
    })
  }

  componentDidMount() {
    Animated.spring(
      this.state.leftAnim, {
      toValue: 0,      
    }).start()
  }

  render() {
    return (
      <Animated.View
        style={[ styles.updateForNewVideobutton_container,
        { transform: [{ translateX: this.state.leftAnim}] }]}
      >
        <View style={styles.updateForNewVideobutton_sub_container}>            
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#3b5c7d',false)}
            onPress={() => {
              console.log('close update !')
              this.handleCloseNewVideoPopUp()
            }}                            
          >
            <View style={styles.updateForNewVideobuttonClose}>                    
              <IconMaterialCommunityIcons style={{color:'#FFF', fontWeight:'bold', fontSize:20}} name='close' />
            </View> 
          </TouchableNativeFeedback> 

          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#3b5c7d',false)}
            onPress={() => {
              console.log('close update !')
              //this.props.updateForNewVideo()
            }}                            
          >                  
            <View style={styles.updateForNewVideobutton}>
              <Text style={{color:'#FFF', fontWeight:'bold'}}>nouvelle video disponible  </Text>
              <IconMaterialCommunityIcons style={{color:'#FFF', fontWeight:'bold', fontSize:20}} name='movie' />
            </View>              
          </TouchableNativeFeedback> 
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  updateForNewVideobutton_container: {
    position: 'absolute',
    backgroundColor: 'transparent',
    width: null, 
    height: null,
    top: DIMENSION.TOTAL_HEADER_HEIGHT,
    paddingTop: 15,
    alignSelf: 'center'
  },
  updateForNewVideobutton_sub_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#769cc2',
    width: null, 
    height: null,
    elevation: 5,
    borderRadius: 50,
    overflow: 'hidden',
  },
  updateForNewVideobutton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',        
    paddingHorizontal: 10,
    paddingRight: 15,
    paddingVertical: 5,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  updateForNewVideobuttonClose: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    paddingLeft: 10,
    paddingVertical: 5,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
  },
})

export default NewVideoPopUp