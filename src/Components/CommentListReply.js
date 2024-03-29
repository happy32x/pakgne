import React, { Component } from 'react'
import {
  View,
  FlatList,
  Animated,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native'

import firebase from 'firebase'

import CommentReply from './CommentReply'
import MyCommentReply from './MyCommentReply'
import CommentReplyHeader from './CommentReplyHeader'
import CommentLoading from './CommentLoading'
import EmptyComment from './EmptyComment'
import CommentCommentPostYoutube from './CommentCommentPostYoutube'

import { 
  getCommentListReplyFromApi 
} from '../API/REQUEST'

import THEME from '../INFO/THEME'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

class CommentListReply extends Component {
  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {
      data:[],      
      isLoading: true,
      isEmpty: false,
      isLoadingMore: false,
      isRefreshing: false,      
      stopLoadingMore: false,  
      lockLoadingMore: false,  
    }

    this._data = []
    this._dataAfter = ''

    this.commentId = this.props.navigation.getParam('commentId', 'NO-DATA')   

    this.fetchData = this._fetchData.bind(this)
    this.fetchMore = this._fetchMore.bind(this)
    this.fetchRefresh = this._fetchRefresh.bind(this)

    this.navigateTo = this._navigateTo.bind(this)
    this.navigateBack = this._navigateBack.bind(this)

    this.addComment = this._addComment.bind(this)
    this.editComment = this._editComment.bind(this)
    this.deleteComment = this._deleteComment.bind(this)    
  }

  static navigationOptions = {
    header: null
  }

  _addComment(newComment) {
    //await this._data.splice(0, 0, newComment) //or
    //await this._data.unshift(newComment)
    this._data = [newComment, ...this._data]
    this.setState({
      data: this._data,
      isEmpty: false,
    }, () => {
      this.scrollTop()
      console.log('NEW COMMENT ADDED !!!')
    })
  }

  _editComment(oldItem, newItem) {    
    const index = this._data.indexOf(oldItem)

    if (index !== -1) {
      this._data[index] = newItem
      this.setState({data: this._data}, () =>  console.log('commentaire modifié avec succes !'))
    } else {
      console.log('WHATS HAPPENNING ?')
    }    
  }

  async _deleteComment(commentId) {
    this._data = await this._data.filter( item =>                                                                          
                                          item.id !== commentId
                                        )
    this.setState({ 
      data: this._data,
      isEmpty: this._data.length ?false :true
    }, () => console.log('COMMENT DELETED !!!'))        
  }

  scrollTop  = () => {    
    this.scroll.getNode().scrollToOffset({ offset: 0, animated: true });
  }

  _navigateTo(destination, data) {
    this.props.navigation.navigate(destination, data)
  }

  _navigateBack() {
    this.props.navigation.goBack()
  }

  _fetchData(callback) {    
    const pageToken = this._dataAfter !== '' ? `&pageToken=${this._dataAfter}` : ''
    getCommentListReplyFromApi(this.commentId, pageToken).then(callback)
  }

  _fetchMore() {
    this.fetchData(responseJson => {    
      if(this._isMounted) {
        this._data = this._data.concat(responseJson.items)
        this._dataAfter = responseJson.nextPageToken

        this.setState({ 
          data: this._data,
          isLoadingMore: false,
        })

        responseJson.nextPageToken===undefined
          ? this.setState({ stopLoadingMore: true })
          : null
      }
    })
  }

  _fetchRefresh() {
    this.fetchData(responseJson => {
      if(this._isMounted) {

        if( (responseJson.items && responseJson.items===undefined) || 
            (responseJson.items && responseJson.items.length===0) 
          ) { 
          this.setState({ isEmpty: true, isLoading: false, lockLoadingMore: true }) 
        } else {
          this._data = responseJson.items
          this._dataAfter = responseJson.nextPageToken

          this.setState({
            data: this._data,
            isLoading: false,
            isEmpty: false,
            isLoadingMore: false,
            isRefreshing: false,  
            lockLoadingMore: false,          
          })

          responseJson.nextPageToken===undefined 
            ? this.setState({ stopLoadingMore: true })  
            : null 
        }
      }
    })
  }

  componentDidMount() {
    this._isMounted = true
    this.fetchData(responseJson => {     
      if(this._isMounted) {
        console.log("FUCK" + JSON.stringify(responseJson))
        //Le commentaire qui suit est issu d'un problème déjà réglé :)    
        //En temps normal, lorsque responseJson.items.length===0, 
        //dans le render() on devrai avoir une autre AnimatedFlatList destiné à acceuillir les commentaires du users 
        //ce qui implique de nouvelles variables, fonction, modification, disposition, bref un gros bordel
        if( (responseJson.items && responseJson.items===undefined) || 
            (responseJson.items && responseJson.items.length===0) 
          ) {
          this.setState({ isEmpty: true, isLoading: false, lockLoadingMore: true }) 
        } else {
          this._data = responseJson.items
          this._dataAfter = responseJson.nextPageToken
          
          this.setState({
            data: this._data,
            isEmpty: false,
            isLoading: false,
            lockLoadingMore: false,
          })

          responseJson.nextPageToken===undefined
            ? this.setState({ stopLoadingMore: true })
            : null        
        }
      }
    })
  }

  componentWillUnmount(){
    this._isMounted = false
  }

  render() {   
    return (
      <KeyboardAvoidingView style={styles.main_container} behavior="padding" enabled>

        <CommentReplyHeader           
          navigateBack={this.navigateBack}
        />

        {
          this.state.isLoading
            ? <CommentLoading color={THEME.SECONDARY.COLOR} />           
            : this.state.isEmpty
              ? <EmptyComment/> //En temps normal ceci est cencé être une autre AnimatedFlatList destinée à acceuilir les commentaires de l'utilisateur
              : <View style={styles.listview_container}>
                  <AnimatedFlatList //AnimatedFlatList pourra lui aussi acceullir les commentaires de l'utilisateur, mais nous travaillerons dessus plutard
                    ref={(lv) => {this.scroll = lv}}
                    contentContainerStyle={styles.listview}
                    showsVerticalScrollIndicator={true}
                    keyboardShouldPersistTaps='always'
                    data={this.state.data}
                    renderItem={
                      ({item}) => { return (
                        item.kind == "youtube#comment" && item.snippet.authorDisplayName === firebase.auth().currentUser.displayName
                          ? <MyCommentReply
                              data={item}
                              navigateTo={this.navigateTo}
                              editComment={this.editComment}
                              deleteComment={this.deleteComment}                              
                            />
                          : item.kind == "youtube#comment" && item.snippet.authorDisplayName !== firebase.auth().currentUser.displayName
                            ? <CommentReply
                                data={item}
                                navigateTo={this.navigateTo}
                              />
                            : null                      
                      )}
                    }
                    ListFooterComponent={() => {
                      return (
                        this.state.isLoadingMore &&
                        <View style={styles.isloadingmore_container}>
                          <ActivityIndicator size="large" color={THEME.SECONDARY.COLOR} />
                        </View>
                      )
                    }}
                    onEndReached={ !this.state.isRefreshing && !this.state.stopLoadingMore && !this.state.isLoadingMore && !this.state.lockLoadingMore ? () => this.setState({ isLoadingMore: true }, () => this.fetchMore()) : null }
                    refreshControl={ 
                      <RefreshControl 
                        colors={[THEME.SECONDARY.COLOR]} 
                        refreshing={this.state.isRefreshing} 
                        progressViewOffset={-25}                        
                        onRefresh={() => {
                          this._dataAfter = ''
                          this.setState({ isRefreshing: true, isLoading: true, isLoadingMore: false }, () => this.fetchRefresh())
                        }}
                      /> 
                    }
                    keyExtractor={(item,e) => e.toString()}
                    onEndReachedThreshold={.5}
                    {...this.props}
                  />                  
                </View>
        }

        <CommentCommentPostYoutube 
          addComment={this.addComment}                                                
          commentId={this.commentId}
          autoFocus={false}
        />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: THEME.PRIMARY.COLOR,
  },
  listview_container: {
    flex: 1   
  },
  listview: {
    padding: 15,
    backgroundColor: THEME.PRIMARY.COLOR,   
  },
  isloadingmore_container: { 
    flex: 1,
    padding: 10
  }
})

export default CommentListReply