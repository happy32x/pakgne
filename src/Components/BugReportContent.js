import React, { Component } from 'react'
import { 
  View, 
  Text,  
  TextInput,
  StyleSheet,  
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native'

import { sendEmail } from '../API/send-email';
import DIMENSION from '../INFO/DIMENSION'
import THEME from '../INFO/THEME';

import BounceUpAndDownStatic from '../Animations/BounceUpAndDownStatic'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

function BugReportContent(props) {  

  return (
    <KeyboardAvoidingView style={styles.main_container} behavior="padding" keyboardVerticalOffset={90} enabled>      

      <TextInput
        ref={x => this.text_input = x}
        style={styles.text_input}
        placeholder="Veuillez nous expliquer ce qui n'a pas marché"
        selectionColor={THEME.PRIMARY.BACKGROUND_COLOR}
        autoFocus={true}
        underlineColorAndroid="transparent"
        autoCorrect={true}
        autoCapitalize={'none'}
        keyboardType={'web-search'}
        showsVerticalScrollIndicator={true}
        multiline={true}
        scrollEnabled={true}      
        onChangeText={ (text) => {this.text = text; console.log(this.text)} }   
      />

      <View style={styles.logOut_container}>
        <BounceUpAndDownStatic
          style={styles.logOut_button}
          scale={.8}            
          onPress={() => {               
            sendEmail(
              'devsarcasm@gmail.com',
              'Pakgne App Bug Report !',
              this.text
              //this.text_input._lastNativeText
            ).then(() => {
              console.log('Our email successful provided to device mail');
            });
          }}
        >            
          <IconMaterialCommunityIcons style={styles.logOut_button_icon} name="email-outline" />         
          <Text style={styles.logOut_button_text}>  Envoyer</Text>                          
        </BounceUpAndDownStatic>  
      </View>

    </KeyboardAvoidingView>    
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "gray"
  },
  main_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 20,
    marginBottom: 0,
  },
  txt_content: {
    marginTop: 40,
  },
  text_input: {
    height: null,
    maxHeight: Dimensions.get('window').height - 90 - 20 - DIMENSION.MAX_HEADER_HEIGHT,
    width: '100%',
    fontSize: 18,
    padding: 10,
    borderColor: THEME.PRIMARY.BACKGROUND_COLOR,
    borderRadius: 5,
    borderWidth: 2,    
  },

  logOut_container:{
    alignItems:'center',
    justifyContent:'center', 
    width: '100%',  
    paddingTop: 25,
    paddingBottom: 25,    
  },
  logOut_button: {    
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    borderRadius: 40,
    width: '70%',
    height: 40,
    backgroundColor: THEME.PRIMARY.BACKGROUND_COLOR,    
  },
  logOut_button_text: { 
    color: THEME.PRIMARY.COLOR,
    fontWeight: 'bold',
    fontSize:15,
  },
  logOut_button_icon: { 
    color: THEME.PRIMARY.COLOR, 
    fontSize:20,
  },
})

export default BugReportContent