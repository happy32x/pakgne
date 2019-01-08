
import React, { Component } from "react"
import { 
  Text, 
  View ,
  StyleSheet,
  TouchableNativeFeedback,
} from "react-native"

import Modal from "react-native-modal"
import THEME from '../INFO/THEME'

function ModalCommentTopRecent(props) {
  return (
    <Modal  
      style={styles.modal}
      isVisible={props.isModalVisible} 
      onBackdropPress={() => props.toggleModal()} 
      backdropColor='transparent'
      animationIn='pulse'
      animationInTiming={1}
      animationOut='pulse'
      animationOutTiming={1}
    >
      <View style={styles.modal_option_container}>
        <TouchableNativeFeedback 
          background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,false)}
          onPress={() => props.orderComment('relevance')}
        >
          <View style={styles.modal_option}>               
            <Text style={styles.modal_option_text}>Top commentaires</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback 
          background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,false)}
          onPress={() => props.orderComment('time')}
        >
          <View style={styles.modal_option}>               
            <Text style={styles.modal_option_text}>Les plus récents</Text>
          </View>
        </TouchableNativeFeedback>            
      </View>  
    </Modal> 
  );
}

const styles = StyleSheet.create({
  modal: {
    margin:0,
    flexDirection: 'row',
    alignItems: 'flex-start', 
		justifyContent: 'flex-end',	
  },
  modal_option_shadow_container: {
    width:null, 
    height:100, 
    borderRadius:5,
    margin:10,
    overflow:'hidden',
    backgroundColor: 'black',
    opacity: 0.5
  },
  modal_option_container: {
    width:null, 
    height:100, 
    borderRadius:3,
    margin:10,
    overflow:'hidden',
    elevation: 10
  },
  modal_option: {
    flex:1,
    alignItems: 'center', 
    justifyContent: 'center',
    paddingLeft:10,
    paddingRight:10,
    backgroundColor: THEME.PRIMARY.COLOR,	
  },
  modal_option_text: {
    fontSize: 16
  },
})

export default ModalCommentTopRecent