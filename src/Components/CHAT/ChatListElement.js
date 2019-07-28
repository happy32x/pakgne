import React from 'react'
import {
  View, 
  Text, 
  Image,
  StyleSheet,
  TouchableNativeFeedback,   
} from 'react-native'

import IconOcticons from 'react-native-vector-icons/Octicons'

import THEME from '../../INFO/THEME'

class ChatListElement extends React.Component{
  _isMounted = false
  
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this._isMounted = true    
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {  
    return (
      <TouchableNativeFeedback 
        background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,false)}
        onPress={() => { 
          this.props.navigation.navigate('ParameterElement', { 
            title: 'Discussions',
            type: 'Octicons',
            icon: 'comment-discussion',
            color: THEME.TERTIARY.COLOR,
            message: MESSAGE,
          }) 
        }}
      >
        <View style={styles.band}>
          <View style={styles.icon_container}>
            <IconOcticons style={styles.icon} name="comment-discussion" />
          </View>
          <View style={styles.text_container}>
            <Text style={styles.text}>Discussions</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    )    
  }
}

const styles = StyleSheet.create({  
  band: { 
    flex:1, 
    flexDirection:'row', 
    height:60, 
  },
  icon_container: { 
    flex:0.2, 
    alignItems:'center', 
    justifyContent:'center', 
    flexDirection:'row'
  },
  icon: { 
    fontWeight:'bold', 
    fontFamily:'normal', 
    color: THEME.PRIMARY.BACKGROUND_COLOR, 
    fontSize:20 
  },
  text_container: { 
    flex:0.8, 
    alignItems:'center', 
    justifyContent:'flex-start', 
    flexDirection:'row', 
    height: '100%', 
  },
  text: { 
    color: THEME.SECONDARY.COLOR, 
    fontSize: 16 
  },
})

export default ChatListElement

