import React, { Component, PureComponent } from "react"
import {
  View,
  FlatList,
  Animated,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'

import uuidv1 from 'uuid/v1'

import ChatListElement from './ChatListElement'
import { 
  getDiscussionListFromApi,
  getUserChatsFromApi,
} from './API/REQUEST'
import { withNavigation } from 'react-navigation'
import DIMENSION from '../../INFO/DIMENSION'
import THEME from '../../INFO/THEME'
import HeaderContentIndicator from '../HeaderContentIndicator'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

class ChatList extends Component {
  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {
      data: [1],//[],
      isEmpty: true,
      isLoading: true,
      isLoadingMore: false,
      stopLoadingMore: false,
    }

    this.requestId = null

    this._update = false
    this._data = [1]//null
    this._dataAfter = ''

    this.navigateTo = this._navigateTo.bind(this)
    this.fetchMore = this._fetchMore.bind(this)
    this.fetchData = this._fetchData.bind(this)
  }

  _navigateTo(destination, data) {
    this.props.navigation.navigate(destination, data)
  }

  _fetchData(callback) {
    const pageToken = this._dataAfter !== '' ? this._dataAfter : ''
    getUserChatsFromApi(pageToken).then(callback)
  }

  _fetchMore() {
    const requestId = this.requestId = uuidv1()

    this.fetchData(responseJson => {
      if(this._isMounted && this.requestId === requestId) {         

        this._data = this._data.concat(responseJson.items)
        this._dataAfter = responseJson.nextPageToken
        this._update = true

        this.setState({ isLoadingMore: false })

        responseJson.nextPageToken===undefined
          ? this.setState({ stopLoadingMore: true })
          : null
      }
    })
  }

  componentDidMount() {
    console.log("ChatList :: componentDidMount")
    this._isMounted = true

    this.setState({ 
      isLoading: false,
      stopLoadingMore: true,
    })

    /*this.fetchData(responseJson => {
      if(this._isMounted && this.state.isLoading) {
        //this._data = responseJson.items.filter(item => item.id.videoId !== undefined)

        this._data = responseJson.items
        this._dataAfter = responseJson.nextPageToken
        this._update = true

        console.log("ChatList :: responseJson.nextPageToken :: " + responseJson.nextPageToken)
        console.log("ChatList :: responseJson.items[0].key :: " + responseJson.items[0].key)
        console.log("ChatList :: responseJson.items.length :: " + responseJson.items.length)

        console.log('EN ATTENTE DE CHARGEMENT DE LA LISTE DES CHATS ...')

        this.setState({ isLoading: false })

        responseJson.nextPageToken===undefined 
          ? this.setState({ stopLoadingMore: true }) //pourquoi ici on n'ajoute pas "this.setState({ isLoading: false })"
          : null
      }           
    })*/
  }

  shouldComponentUpdate(nextProps, nextState) {    
    if(this.state.isLoading /*|| nextState.isLoading*/) return true

    if(this._update){
      this._update = false
      return true
    }

    if(nextProps.scrollTopChatList && nextProps.index == 1 && nextProps.indexOLD == 1) {   
      this.scrollTopChatList = nextProps.scrollTopChatList
      this.scrollTop()
      return false
    }    

    return false
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  //Déclenché depuis l'onglet TALK de RootTab
  scrollTop = () => {
    this.scroll.getNode().scrollToOffset({ offset: 0, animated: true })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.isloading_container}>
          <ActivityIndicator size="large" color={THEME.PRIMARY.BACKGROUND_COLOR}/>
        </View>
      )
    } else {
      return (
        <View style={styles.main_container}>
          <AnimatedFlatList
            ref={(lv) => {this.scroll = lv}}
            contentContainerStyle={styles.content_container}
            showsVerticalScrollIndicator={false}
            data={this._data}
            ListHeaderComponent={() => <HeaderContentIndicator type="Octicons" icon="comment-discussion" color={THEME.PRIMARY.BACKGROUND_COLOR} backgroundColor={THEME.PRIMARY.COLOR} />}            
            renderItem={
              ({item}) => <ChatListElement
                data={item}
                navigateTo={this.navigateTo}
              />
            }
            ListFooterComponent={() => {
              return (
                this.state.isLoadingMore &&
                <View style={styles.isloadingmore_container}>
                  <ActivityIndicator size="large" color={THEME.SECONDARY.COLOR} />
                </View>
              )
            }}
            onEndReached={ !this.state.stopLoadingMore && !this.state.isLoadingMore ? () => this.setState({ isLoadingMore: true }, () => this.fetchMore()) : null }                          
            keyExtractor={(item,e) => e.toString()}    
            onEndReachedThreshold={.5}       
            {...this.props}
          />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    paddingTop: DIMENSION.MEDIUM_HEADER_HEIGHT,
    backgroundColor: "#fcfcfc",
  },
  content_container: {
    marginTop: 0
  },
  isloading_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: DIMENSION.STATUSBAR_HEIGHT,
    backgroundColor: "#fcfcfc",
  },
  isloadingmore_container: { 
    flex: 1,
    padding: 10
  },
})

export default withNavigation( ChatList )