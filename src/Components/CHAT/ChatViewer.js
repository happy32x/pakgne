import React, { Component } from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'

import DiscussionList from './DiscussionList'
import Fire from './Fire'

class ChatViewer extends Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)    
    this.state = {
  
    }   
  }

  render() {
    return (           
      <DiscussionList
        //chatKey={this.props.navigation.state.params.chatKey}
      />
    )
  }
}

const styles = StyleSheet.create({})

export default ChatViewer
