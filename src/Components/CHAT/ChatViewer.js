import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Fire from './Fire'

import { GiftedChat } from 'react-native-gifted-chat'

const NAME = "Pakgne"

class ChatViewer extends Component {
  /*static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!',
  })*/

  static navigationOptions = {
    header: null
  }

  state = {
    messages: [],
  }

  get user() {
    return {
      name: NAME,   
      _id: Fire.shared.uid,
    }
  }

  componentWillMount() {
    Fire.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message)
      }))
    )
  }

  componentWillUnmount() {
    Fire.shared.off()
  }

  render() {
    return (
      <GiftedChat 
        messages={this.state.messages}
        onSend={Fire.shared.send}
        user={this.user}
      />
    )
  }
}

const styles = StyleSheet.create({})

export default ChatViewer
