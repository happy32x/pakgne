
import React, { Component } from "react"
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
} from "react-native"

import Icon from 'react-native-vector-icons/Ionicons'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import DIMENSION from '../INFO/DIMENSION'
import Modal from "react-native-modal"
import THEME from '../INFO/THEME'

class ModalSignalComment extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Modal        
        isVisible={this.props.isModalVisible}
        onBackdropPress={() => this.props.hideModal()}      
        onSwipeComplete={() => this.props.hideModal()}
        swipeDirection={['left', 'right']}  
        backdropColor='black'                  
        swipeThreshold={Dimensions.get("window").width/2}
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          margin: 0,
        }}
      >

        <View style={styles.modal_container}>          
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,false)}
            onPress={() => this.props.hideModal()}
          >
            <View style={{width:'100%', alignItems:'center', justifyContent:'center'}}>
              <View style={[styles.modal_option, {borderTopWidth:0} ]}>                
                <IconMaterialCommunityIcons style={styles.modal_option_icon} name="alert-outline" />
                <Text style={styles.modal_option_text} numberOfLines={1}>Signaler ce commentaire</Text>
              </View>
            </View>
          </TouchableNativeFeedback>
        </View>  

      </Modal> 
    )
  }
}

const styles = StyleSheet.create({
  modal_container: {    
    width: Dimensions.get("window").width,
    height: null,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',    
    backgroundColor: THEME.PRIMARY.COLOR,
    borderTopWidth: 1,
    borderTopColor: THEME.ON_LOAD_COLOR,
  },
  modal_option: {
    width: '90%',
    height: Dimensions.get("window").height/10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',    
    paddingRight: 10,    
    borderTopWidth: 1,
    borderTopColor: THEME.ON_LOAD_COLOR,
  },
  modal_option_icon: {
    color: 'black',
    fontSize: 24,
    marginLeft: 10,
    marginRight: 20,
    paddingVertical: 20,
  },
  modal_option_text: {
    color: 'black',
    fontSize: 16,
    paddingVertical: 20,
    flexShrink: 1,
  }
})

export default ModalSignalComment