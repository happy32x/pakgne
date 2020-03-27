import React, { Component } from 'react'
import { 
  View, 
  Text,
  Dimensions,
  StyleSheet,  
} from 'react-native'

import IconIonicons from 'react-native-vector-icons/Ionicons'

const SCREEN_WIDTH = Dimensions.get("window").width

function DiscussionMessage_PeerToPeer(props) {
  return (
    <View style={{
      backgroundColor: '#f9bf8c',
      maxWidth: SCREEN_WIDTH-50,
      padding: 5,
      paddingHorizontal: 15,
      elevation: 1,
      alignSelf: 'center',
      borderRadius: 10,
      marginTop: 25,
      marginBottom: 25,
    }}>                                  
      <Text style={{color: 'gray', }}>
        <IconIonicons
          name="md-lock"
          style={{
            fontSize: 16,
            marginRight: 10,
          }}
        />  Ceci est un espace de discussion.
        Les messages échangés dans cet espace
        de discussion sont privés et protégés par 
        la stratégie "peer-to-peer". 

        Cela signifie que seul vous et les
        membres de l'espace peuvent voir le
        contenu de vos messages.                                     
      </Text>
    </View>     
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,    
  },  
})

export default DiscussionMessage_PeerToPeer