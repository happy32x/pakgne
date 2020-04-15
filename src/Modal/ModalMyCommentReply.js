
import React, { Component } from "react"
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableNativeFeedback,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import IconOcticons from 'react-native-vector-icons/Octicons'
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'

import DIMENSION from '../INFO/DIMENSION'
import Modal from 'react-native-modal'
import THEME from '../INFO/THEME'

import {
  getAccessToken,
} from '../Store/storeData'

class ModalMyCommentReply extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false
    }
  }

  render() {
    return (
      <Modal        
        isVisible={true}
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
        {
          this.state.isLoading
            ? <View style={[styles.modal_container, {paddingVertical:20}]}>
                <ActivityIndicator size="large" color={THEME.SECONDARY.COLOR}/>
              </View>

            : <View style={styles.modal_container}>
                <TouchableNativeFeedback 
                  background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,false)}                     
                  onPress={() => this.props.preEditComment() }         
                >
                  <View style={{width:'100%', alignItems:'center', justifyContent:'center'}}>
                    <View style={[styles.modal_option, {borderTopWidth:0} ]}>                
                      <IconMaterialIcons style={styles.modal_option_icon} name="edit" />
                      <Text style={styles.modal_option_text} numberOfLines={1}>modifier votre commentaire</Text>
                    </View>
                  </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,false)}
                  onPress={() => this.setState({ isLoading: true }, () => {
                                   getAccessToken().then(accessToken => {                                                                    
                                     this.props.fetchData_deleteCommentFromApi(accessToken)
                                   })
                                 })}                   
                >
                  <View style={{width:'100%', alignItems:'center', justifyContent:'center'}}>
                    <View style={styles.modal_option}>                
                      <IconOcticons style={styles.modal_option_icon} name="trashcan" />
                      <Text style={styles.modal_option_text} numberOfLines={1}>supprimer votre commentaire</Text>
                    </View>
                  </View>
                </TouchableNativeFeedback>
              </View>          
        }

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
    borderTopWidth: 1,
    borderTopColor: THEME.ON_LOAD_COLOR,
    paddingRight: 10,    
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

export default ModalMyCommentReply