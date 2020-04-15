
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

class ModalUnableToComment extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Modal        
        isVisible={true}
        onBackdropPress={() => this.props.setModalUnableToCommentVisibility(false)}      
        onSwipeComplete={() => this.props.setModalUnableToCommentVisibility(false)}
        swipeDirection={['left', 'right', 'up', 'down']}  
        backdropColor='black'
        swipeThreshold={Dimensions.get("window").width/2}
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 0,
        }}
      >
        <View style={styles.modal_container}>
          <View style={styles.modal_top}>
            <IconMaterialCommunityIcons style={styles.modal_icon} name="comment-alert-outline" />
            <Text style={styles.modal_txt}>impossible de commenter</Text>     
          </View>
          <TouchableNativeFeedback 
            background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,false)}                     
            onPress={() => this.props.setModalUnableToCommentVisibility(false) }         
          >
            <View style={styles.modal_bottom}>                                            
              <Text style={styles.modal_button} numberOfLines={1}>Okay !</Text>
            </View>
          </TouchableNativeFeedback>
        </View>          
      </Modal> 
    )
  }
}

const styles = StyleSheet.create({
  modal_container: {    
    width: null,
    height: null,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',    
    backgroundColor: THEME.PRIMARY.COLOR, 
    borderRadius: 5, 
    overflow: 'hidden'
  },
  modal_top: {    
    width: null,
    height: null,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',    
    borderBottomWidth: 1,
    borderBottomColor: THEME.ON_LOAD_COLOR,
    padding: 15,
  },
  modal_icon: { 
    fontSize: 70,
    color: THEME.TERTIARY.COLOR,
  },
  modal_txt: {
    color: THEME.TERTIARY.COLOR,    
  },
  modal_bottom: {
    alignSelf: 'stretch', 
    alignItems:'center', 
    justifyContent:'center',    
    paddingVertical: 10,
  },
  modal_button: {
    color: "#24abf2",
    fontSize: 20,
    fontWeight: 'bold',
  }
})

export default ModalUnableToComment