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
import uuidv1 from 'uuid/v1'

import Comment from './Comment'
import CommentHeader from './CommentHeader'
import CommentLoading from './CommentLoading'

import EmptyComment from './EmptyComment'
import LockedComment from './LockedComment'

import { 
  getCommentListFromApi,
  getVideoInfoFromApi, 
} from '../API/REQUEST'

import THEME from '../INFO/THEME'

import ModalCommentTopRecentStatic from '../Modal/ModalCommentTopRecentStatic'
import ModalUnableToComment from '../Modal/ModalUnableToComment'

import CommentPostYoutube from './CommentPostYoutube'
import MyComment from './MyComment'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

class CommentList extends Component {
  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      isLoading: true,
      isEmpty: false,
      isLocked: false,      
      isLoadingMore: false,
      isRefreshing: false,
      stopLoadingMore: false,

      isModalVisible: false,
      order: 'relevance',
      canWeHandleOrder: false,
      lockLoadingMore: false,  

      commentCount: this.props.navigation.getParam('commentCount', 'NO-DATA'),    
      isModalUnableToCommentVisible: false,     
    }
    this.autoFocus = this.props.navigation.getParam('autoFocus', 'NO-DATA'),

    this._data = []
    this._dataAfter = ''

    this.requestId = null
    this.videoId = this.props.navigation.getParam('videoId', 'NO-DATA')

    this.fetchData = this._fetchData.bind(this)
    this.fetchDataCommentCount = this._fetchDataCommentCount.bind(this)

    this.fetchMore = this._fetchMore.bind(this)
    this.fetchRefresh = this._fetchRefresh.bind(this)

    this.navigateTo = this._navigateTo.bind(this)
    this.navigateBack = this._navigateBack.bind(this)

    this.toggleModal = this._toggleModal.bind(this)
    this.orderComment = this._orderComment.bind(this)

    this.componentDidMountClone = this._componentDidMountClone.bind(this)
    
    this.addComment = this._addComment.bind(this)
    this.editComment = this._editComment.bind(this)
    this.deleteComment = this._deleteComment.bind(this)

    this.setModalUnableToCommentVisibility = this._setModalUnableToCommentVisibility.bind(this)
  }

  static navigationOptions = {
    header: null
  }

  _setModalUnableToCommentVisibility (value) {
    this.setState({isModalUnableToCommentVisible: value})    
  }

  _addComment(newComment) {
    //await this._data.splice(0, 0, newComment) //or
    //await this._data.unshift(newComment)
    this._data = [newComment, ...this._data]
    this.setState({ 
      data: this._data,
      isLocked: false,
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
                                          item.snippet &&
                                          item.snippet.topLevelComment &&
                                          item.snippet.topLevelComment.id !== commentId
                                        )    
    this.setState({ 
      data: this._data,
      isEmpty: this._data.length ?false :true
    }, () => console.log('COMMENT DELETED !!!'))        
  }

  scrollTop  = () => {    
    this.scroll.getNode().scrollToOffset({ offset: 0, animated: true });
  }  

  _toggleModal() {
    this.setState({ isModalVisible: !this.state.isModalVisible })
  }

  //On choisi d'afficher les commentaires "recents" ou "populaires"
  _orderComment(order) {    
    this.toggleModal()
    if(this.state.order !== order) {
      if(this.state.canWeHandleOrder){        
        this._dataAfter = ''

        this.state.isLoading 
          ? this.fetchRefresh() //Lorqu'une requete est déjà en cours, on ne fait plus de setState mais on execute directement this.fetchRefresh()
          : this.setState({ isRefreshing: true, isLoading: true, isLoadingMore: false, order }, () => this.fetchRefresh())        
      }
      else {
        //Ceci ne se déclenche que lorqu'il n'y aucun element à afficher
        //On annule donc le chargement précédent de la page et on reprend avec la nouvelle requête
        this.setState({ order, isLoading: true }, () => this.componentDidMountClone()) 
      }        
    }      
  }

  _navigateTo(destination, data) {
    this.props.navigation.navigate(destination, data)
  }

  _navigateBack() {
    this.props.navigation.goBack()
  }

  _fetchData(callback) {
    const pageToken = this._dataAfter !== '' ? `&pageToken=${this._dataAfter}` : ''    
    getCommentListFromApi(this.videoId, this.state.order, pageToken).then(callback)
  }

  _fetchDataCommentCount(callback) {
    getVideoInfoFromApi(this.videoId).then(callback)
  }

  _fetchMore() {
    const requestId = this.requestId = uuidv1()

    this.fetchData(responseJson => {
      if(this._isMounted && this.requestId === requestId) {         

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
    this._dataAfter = ''
    const requestId = this.requestId = uuidv1()

    this.fetchData(responseJson => {
      if(responseJson.error && 
         responseJson.error.errors && 
         responseJson.error.errors[0] && 
         responseJson.error.errors[0].reason &&
         responseJson.error.errors[0].reason === "commentsDisabled"
        ) {
        this.setState({ isLocked: true, isLoading: false, canWeHandleOrder: false, lockLoadingMore: true })
      } else if( (responseJson.items && responseJson.items===undefined) || 
                 (responseJson.items && responseJson.items.length===0) 
               ) { 
        this.setState({ isEmpty: true, isLoading: false, canWeHandleOrder: false, lockLoadingMore: true }) 
      } else {    
        this.fetchDataCommentCount(responseJsonCommentCount => {
          if(this._isMounted && this.requestId === requestId) { 

            this._data = responseJson.items          
            this._dataAfter = responseJson.nextPageToken
            const commentCount = responseJsonCommentCount.items[0].statistics.commentCount

            this.setState({
              data: this._data,
              isLoading: false,
              isLocked: false,
              isEmpty: false,            
              isLoadingMore: false,
              isRefreshing: false,      
              lockLoadingMore: false,        
              commentCount,
            })          

            responseJson.nextPageToken===undefined 
            ? this.setState({ stopLoadingMore: true })
            : null

            //On vérifie pour raison de sécurité si this.requestId à été modifié
            /*this.requestId === requestId 
              ? this.setState({ isLoading: false })
              : this.setState({ isLoading: true })*/
          }
        })
      }
    })
  }

  _componentDidMountClone() {    
    this._dataAfter = ''
    const requestId = this.requestId = uuidv1()

    this.fetchData(responseJson => {        
      if(this._isMounted && this.requestId === requestId) {
        console.log("MESSAGE " + JSON.stringify(responseJson))
        //Le commentaire qui suit est issu d'un problème déjà réglé :)
        //En temps normal, lorsque responseJson.items.length===0, 
        //dans le render() on devrai avoir une autre AnimatedFlatList destiné à acceuillir les commentaires du users
        //ce qui implique de nouvelles variables, fonction, modification, disposition, bref un gros bordel
        if(responseJson.error && 
           responseJson.error.errors && 
           responseJson.error.errors[0] && 
           responseJson.error.errors[0].reason &&
           responseJson.error.errors[0].reason === "commentsDisabled"
          ) {
          this.setState({ isLocked: true, isLoading: false, canWeHandleOrder: false, lockLoadingMore: true })
        } else if( (responseJson.items && responseJson.items===undefined) || 
                   (responseJson.items && responseJson.items.length===0) 
                 ) {          
          this.setState({ isEmpty: true, isLoading: false, canWeHandleOrder: false, lockLoadingMore: true })         
        } else {        
          this.fetchDataCommentCount(responseJsonCommentCount => {
            if(this._isMounted && this.requestId === requestId) { 

              this._data = responseJson.items              
              this._dataAfter = responseJson.nextPageToken
              const commentCount = responseJsonCommentCount.items[0].statistics.commentCount

              this.setState({
                data: this._data,
                isLoading: false,
                isLocked: false,
                isEmpty: false,                                
                lockLoadingMore: false,
                commentCount,
                canWeHandleOrder: true,
              })

              responseJson.nextPageToken===undefined
              ? this.setState({ stopLoadingMore: true })
              : null

              //On vérifie pour raison de sécurité si this.requestId à été modifié
              /*this.requestId === requestId
                ? this.setState({ isLoading: false })
                : this.setState({ isLoading: true })*/
            }
          })
        }             
      }
    })
  }

  componentDidMount() {
    this._isMounted = true
    this.componentDidMountClone()
  }

  componentWillUnmount(){
    this._isMounted = false
  }

  render() {   
    return (
      <KeyboardAvoidingView style={styles.main_container} behavior="padding" enabled>

        <CommentHeader 
          toggleModal={this.toggleModal}
          commentCount={this.state.commentCount}                
          navigateBack={this.navigateBack}
          isLoading={this.state.isLoading}
        />

        <ModalCommentTopRecentStatic
          toggleModal={this.toggleModal}
          order={this.state.order}
          orderComment={this.orderComment}
          isModalVisible={this.state.isModalVisible}
        />

        { 
          this.state.isModalUnableToCommentVisible
          ? <ModalUnableToComment 
              setModalUnableToCommentVisibility={this.setModalUnableToCommentVisibility}
            />
          : null 
        }               

        {
          this.state.isLoading           
            ? <CommentLoading color={THEME.SECONDARY.COLOR}/>
            : this.state.isLocked
              ? <LockedComment/> //En temps normal ceci est cencé être une autre AnimatedFlatList destinée à acceuilir les commentaires de l'utilisateur            
              : this.state.isEmpty
                ? <EmptyComment/>
                : <View style={styles.listview_container}>                  
                    <AnimatedFlatList //AnimatedFlatList pourra lui aussi acceullir les commentaires de l'utilisateur, mais nous travaillerons dessus plutard > DEJA FAIT
                      ref={(lv) => {this.scroll = lv}}
                      contentContainerStyle={styles.listview}
                      showsVerticalScrollIndicator={true}      
                      keyboardShouldPersistTaps='always'            
                      data={this.state.data}
                      renderItem={
                        ({item}) => { return ( 
                          item.kind == "youtube#commentThread" && item.snippet.topLevelComment.snippet.authorDisplayName === firebase.auth().currentUser.displayName
                            ? <MyComment
                                data={item}
                                navigateTo={this.navigateTo}  
                                editComment={this.editComment}                                                                                          
                                deleteComment={this.deleteComment}
                              />
                            : item.kind == "youtube#commentThread" && item.snippet.topLevelComment.snippet.authorDisplayName !== firebase.auth().currentUser.displayName
                              ? <Comment
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

        <CommentPostYoutube                                                         
          videoId={this.videoId}
          autoFocus={this.autoFocus}
          addComment={this.addComment}  
          setModalUnableToCommentVisibility={this.setModalUnableToCommentVisibility}
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
  /*listview: {
    padding: 15,
    backgroundColor: THEME.PRIMARY.COLOR,
  },*/
  listview: {
    backgroundColor: THEME.PRIMARY.COLOR,  
    paddingTop: 15,
    paddingBottom: 15, 
  },
  isloadingmore_container: { 
    flex: 1,
    padding: 10
  }
})

export default CommentList

