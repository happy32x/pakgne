import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native'

import ChatViewerHeader from './ChatViewerHeader'
import TransparentBar from '../TransparentBar'

import Fire from './Fire'
import { GiftedChat } from 'react-native-gifted-chat'

class ChatViewer extends Component {
  /*static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!',
  })*/

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)    
    this.state = {
      messages: [],
    }

    this.navigateBack = this._navigateBack.bind(this)
    this.navigateTo = this._navigateTo.bind(this)
  }

  _navigateBack() {
    this.props.navigation.goBack()
  }

  _navigateTo(destination, data) {
    this.props.navigation.navigate(destination, data)
  }

  get user() {
    return {
      name: this.props.navigation.state.params.name,
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
      <View style={{flex:1}}>
        <ChatViewerHeader 
          title={this.props.navigation.state.params.name} 
          type={this.props.navigation.state.params.type}
          navigateBack={this.navigateBack} 
          navigateTo={this.navigateTo} 
        />
        <View style={{flex:1}}>        
          <GiftedChat
            messages={this.state.messages}
            onSend={Fire.shared.send}
            user={this.user}
          />
          <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={85}/>
        </View> 
        <TransparentBar />
      </View>    
    )
  }
}

const styles = StyleSheet.create({})

export default ChatViewer
