import React, { Component } from 'react'
import {  
  View,
  ListView,
  Animated,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from 'react-native'

import uuidv1 from 'uuid/v1'

import Comment from './Comment'
import CommentHeader from './CommentHeader'
import CommentLoading from './CommentLoading'
import CommentEmpty from './CommentEmpty'
import { getCommentListFromApi,getVideoInfoFromApi } from '../API/REQUEST'
import THEME from '../INFO/THEME'
import ModalCommentTopRecent from '../Modal/ModalCommentTopRecent'
import { connect } from 'react-redux'

const AnimatedListView = Animated.createAnimatedComponent(ListView)

class CommentList_INTERMEDIARY extends Component {
  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {
      isEmpty: true,
      isLoading: true,
      isLoadingMore: false,
      isRefreshing: false,
      stopLoadingMore: false,

      isModalVisible: false,
      order: 'relevance',
      canWeHandleOrder: false,

      commentCount: this.props.navigation.getParam('commentCount', 'NO-DATA')   
    }

    this._dataSource = null,
    this._data = null
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
  }

  static navigationOptions = {
    header: null
  }

  _toggleModal() {
    this.setState({ isModalVisible: !this.state.isModalVisible })
  }

  //On choisi d'afficher les commentaires "recents" ou "populaires"
  _orderComment(order) {    
    this.toggleModal()
    if(this.state.order !== order) {
      if(this.state.canWeHandleOrder){  
        this._dataSource = null      
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
        this._dataSource = this._dataSource.cloneWithRows(this._data),
        this._dataAfter = responseJson.nextPageToken

        this.setState({ isLoadingMore: false })

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
      this.fetchDataCommentCount(responseJsonCommentCount => {
        if(this._isMounted && this.requestId === requestId) { 
          let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
          })
          
          this._data = responseJson.items  
          this._dataSource = ds.cloneWithRows(this._data)        
          this._dataAfter = responseJson.nextPageToken
          const commentCount = responseJsonCommentCount.items[0].statistics.commentCount

          this.setState({
            isLoading: false,
            isLoadingMore: false,
            isRefreshing: false,              
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
    })
  }

  _componentDidMountClone() {    
    this._dataAfter = ''
    const requestId = this.requestId = uuidv1()

    this.fetchData(responseJson => {  
      if(this._isMounted && this.requestId === requestId) {             
        
        //En temps normal, lorsque responseJson.items.lenght===0, 
        //dans le render() on devrai avoir une autre AnimatedFlatList destiné à acceuillir les commentaires du users
        //ce qui implique de nouvelles variables, fonction, modification, disposition, bref un gros bordel
        if(responseJson.items.length===0) {
          this.setState({ isEmpty: true, isLoading: false, canWeHandleOrder: false }) 
        } else {        
          this.fetchDataCommentCount(responseJsonCommentCount => {
            if(this._isMounted && this.requestId === requestId) { 
              let ds = new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
              })

              this._data = responseJson.items    
              this._dataSource = ds.cloneWithRows(this._data)             
              this._dataAfter = responseJson.nextPageToken
              const commentCount = responseJsonCommentCount.items[0].statistics.commentCount

              this.setState({
                isEmpty: false,
                isLoading: false,    
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
      <View style={styles.main_container}>

        <CommentHeader 
          toggleModal={this.toggleModal}
          commentCount={this.state.commentCount}                
          navigateBack={this.navigateBack}
          isLoading={this.state.isLoading}
        />

        <ModalCommentTopRecent
          toggleModal={this.toggleModal}
          orderComment={this.orderComment}
          isModalVisible={this.state.isModalVisible}
        />

        { 
          this.state.isLoading           
            ? <CommentLoading color={THEME.SECONDARY.COLOR}/>
            : this.state.isEmpty
              ? <CommentEmpty/> //En temps normal ceci est cencé être une autre AnimatedFlatList destinée à acceuilir les commentaires de l'utilisateur            
              : <View style={styles.listview_container}>
                  <AnimatedListView //AnimatedFlatList pourra lui aussi acceullir les commentaires de l'utilisateur, mais nous travaillerons dessus plutard
                    contentContainerStyle={styles.listview}
                    showsVerticalScrollIndicator={true}                  
                    dataSource={this._dataSource}
                    renderRow={
                      (rowData, sectionId, rowId) => <Comment
                        data={rowData}
                        navigateTo={this.navigateTo}
                        rowId={rowId}
                      />
                    }
                    renderFooter={() => {
                      return (
                        this.state.isLoadingMore &&
                        <View style={styles.isloadingmore_container}>
                          <ActivityIndicator size="large" color={THEME.SECONDARY.COLOR} />
                        </View>
                      )
                    }}
                    onEndReached={ !this.state.isRefreshing && !this.state.stopLoadingMore && !this.state.isLoadingMore ? () => this.setState({ isLoadingMore: true }, () => this.fetchMore()) : null }                    
                    refreshControl={ 
                      <RefreshControl 
                        colors={[THEME.SECONDARY.COLOR]} 
                        refreshing={this.state.isRefreshing} 
                        progressViewOffset={-25}
                        onRefresh={() => {
                          this._dataSource = null
                          this._dataAfter = ''
                          this.setState({ isRefreshing: true, isLoading: true, isLoadingMore: false }, () => this.fetchRefresh())
                        }}                        
                      /> 
                    }
                    scrollEventThrottle={16}
                    {...this.props}
                  />                  
                </View>

        }

      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: THEME.PRIMARY.COLOR,    
  },
  listview_container: {
    flex: 1,    
  },
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

export default CommentList_INTERMEDIARY

