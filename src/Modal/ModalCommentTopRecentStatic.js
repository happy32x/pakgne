import React, { Component } from "react"
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
} from "react-native"

import Icon from 'react-native-vector-icons/Ionicons'
import DIMENSION from '../INFO/DIMENSION'
import Modal from "react-native-modal"
import THEME from '../INFO/THEME'

class ModalCommentTopRecentStatic extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Modal    
        style={styles.modal}
        isVisible={this.props.isModalVisible} 
        onBackdropPress={() => this.props.toggleModal()} 
        backdropColor='transparent'
        animationIn='pulse'
        animationInTiming={1}
        animationOut='pulse'
        animationOutTiming={1}
      >
        <View style={styles.modal_option_container}>
          <TouchableNativeFeedback 
            background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,false)}
            onPress={() => this.props.orderComment('relevance')}
          >
            <View style={styles.modal_option}>       
              { this.props.order == 'relevance' ? <Icon style={styles.md_checkmark_icon} name="md-checkmark" /> : null }        
              <Text style={styles.modal_option_text}>  Top commentaires</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback 
            background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,false)}
            onPress={() => this.props.orderComment('time')}
          >
            <View style={styles.modal_option}>      
              { this.props.order == 'time' ? <Icon style={styles.md_checkmark_icon} name="md-checkmark" /> : null }         
              <Text style={styles.modal_option_text}>  Les plus récents</Text>
            </View>
          </TouchableNativeFeedback>            
        </View>  
      </Modal> 
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    margin:0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  /*modal_option_shadow_container: {
    width:null, 
    height:100, 
    borderRadius:5,
    //margin:10,
    overflow:'hidden',
    backgroundColor: 'black',
    opacity: 0.5
  },*/
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
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
    paddingLeft:10,
    paddingRight:10,
    backgroundColor: THEME.PRIMARY.COLOR,	
  },
  modal_option_text: {
    fontSize: 16
  },
  md_checkmarkn_icon: {
    color: THEME.SECONDARY.COLOR,
    fontSize: 20
  },
})

export default ModalCommentTopRecentStatic