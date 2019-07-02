import React, { Component } from 'react'
import {  
  View,
  FlatList,
  Animated,
  StyleSheet,
  Dimensions,
  RefreshControl,
  ActivityIndicator,
} from 'react-native'

import DATA from '../API/DATA'
import uuidv1 from 'uuid/v1'

import VideoViewerList_HeaderComponent from './VideoViewerList_HeaderComponent'
import VideoViewerList_CommentHeader from './VideoViewerList_CommentHeader'
import VideoViewerList_CommentEmpty from './VideoViewerList_CommentEmpty'
import VideoMini from './VideoMini'
import Comment from './Comment'
import CommentLoading from './CommentLoading'
import { getVideoListMiniRelatedToVideoIdFromApi,getCommentListFromApi,getVideoInfoFromApi } from '../API/REQUEST'
import THEME from '../INFO/THEME'
import ModalCommentTopRecent from '../Modal/ModalCommentTopRecent'
import { connect } from 'react-redux'
import DIMENSION from '../INFO/DIMENSION'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
const channelId = DATA.CHANNEL_ID

class VideoViewerList extends Component {
  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {
      isEmpty: false,
      isFirstLoading: true,
      isLoading: true,
      isLoadingMore: false,
      isRefreshing: false,
      stopLoadingMore: false,

      modalPosition: null,
      isModalVisible: false,
      order: 'relevance',

      canWeHandleOrder: false,
      commentCount: this.props.commentCount,
    }

    this._firstData = []
    this._data = []
    this._dataAfter = ''

    this.requestId = null
    this.videoId = this.props.videoId

    this.fetchData = this._fetchData.bind(this)
    this.fetchFirstData = this._fetchFirstData.bind(this)
    this.fetchDataCommentCount = this._fetchDataCommentCount.bind(this)

    this.fetchMore = this._fetchMore.bind(this)
    this.fetchRefresh = this._fetchRefresh.bind(this)

    this.navigateTo = this._navigateTo.bind(this)
    this.navigateBack = this._navigateBack.bind(this)
    this.navigateBackNavigateTo = this._navigateBackNavigateTo.bind(this)

    this.toggleModal = this._toggleModal.bind(this)
    this.setModalPosition = this._setModalPosition.bind(this)
    this.orderComment = this._orderComment.bind(this)

    this.componentDidMountClone = this._componentDidMountClone.bind(this)
  }

  _toggleModal() {       
    this.setState({ isModalVisible: !this.state.isModalVisible })
  }

  _setModalPosition(e) {
    e.measure((width, height, px, py, fx, fy) => {
      console.log('W-SCREEN : ' + Dimensions.get('window').width)
      console.log('H-SCREEN : ' + Dimensions.get('window').height)
      console.log('width : ' + width)
      console.log('height : ' + height)
      console.log('px : ' + px)
      console.log('py : ' + py)
      console.log('fx : ' + fx)
      console.log('fy : ' + fy)
      console.log('\n')

      fy !== undefined ? this.setState({ modalPosition: fy }, () => this.toggleModal()) : null
    })    
  }

  //On choisi d'afficher les commentaires "recents" ou "populaires"
  /*_orderComment(order) {    
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
  }*/

  //On choisi d'afficher les commentaires "recents" ou "populaires"
  _orderComment(order) {    
    this.toggleModal()

    if(this.state.order !== order) {    
      this._data = this._firstData      
      this.setState({ isLoading: true, isLoadingMore: true, order }, () => this.componentDidMountClone()) 
    }        
  }

  _navigateTo(destination, data) {
    this.props.navigateTo(destination, data)    
  }

  _navigateBack() {
    this.props.navigateBack()
  }

  _navigateBackNavigateTo(destination, data) {
    this.navigateBack()
    this.navigateTo(destination, data)  
  }

  _fetchData(callback) {
    const pageToken = this._dataAfter !== '' ? `&pageToken=${this._dataAfter}` : ''    
    getCommentListFromApi(this.videoId, this.state.order, pageToken).then(callback)
  }

  _fetchFirstData(callback) {  
    getVideoListMiniRelatedToVideoIdFromApi(this.videoId).then(callback)
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

        this.setState({ isLoadingMore: false })

        responseJson.nextPageToken===undefined
          ? this.setState({ stopLoadingMore: true })
          : null
      }
    })
  }

  //USELESS HERE !!!
  _fetchRefresh() {
    this._dataAfter = ''
    const requestId = this.requestId = uuidv1()

    this.fetchData(responseJson => {         
      this.fetchDataCommentCount(responseJsonCommentCount => {
        if(this._isMounted && this.requestId === requestId) {         
          
          this._data = responseJson.items                
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

              this._data = this._firstData.concat(responseJson.items)                         
              this._dataAfter = responseJson.nextPageToken
              const commentCount = responseJsonCommentCount.items[0].statistics.commentCount

              this.setState({
                isEmpty: false,
                isLoading: false,    
                isLoadingMore: false,
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
    this._data = [ {"contentID":"0"} ]

    this.fetchFirstData(responseJson => {  
      if(this._isMounted) {                   
         
        //this._data = this._data.concat(responseJson.items).concat([ {"contentID":"1"} ])
        this._data = this._data.concat(responseJson.items.filter(item => item.snippet.channelId === channelId)).concat([ {"contentID":"1"} ])
        this._firstData = this._data               

        this.setState({
          isFirstLoading: false,
          isLoading: false,                   
        }, () => { 

          //Au cas où la liste des videos relatives serai trop petite pour l'écran (cad empêcherai le déclenchement d'un onEndReached),
          //Alors on charge directement les commentaires en dessous
          
          //******************************************************
          //Algorithme de récupération des differentes dimensions 
          //pour une gestion du chargement des commentaires ou non
          //de manière plus intelligente

          //Dimensions.get('window').height > hauteur totale de l'écran
          //200+DIMENSION.STATUSBAR_HEIGHT  > hauteur de la partie noir (lecteur video + statusbar)

          //125+50 > hauteur de VideoViewerList_HeaderComponent 
          //120 > hauteur de VideoMini
          //DIMENSION.MIN_HEADER_HEIGHT > hauteur de VideoViewerList_CommentHeader          
          //******************************************************          

          Dimensions.get('window').height -200 -DIMENSION.STATUSBAR_HEIGHT > +125 +50 +(120*responseJson.items.length) +DIMENSION.MIN_HEADER_HEIGHT
          && !this.state.isFirstLoading 
          && !this.state.isRefreshing 
          && !this.state.stopLoadingMore 
          && !this.state.isLoadingMore 
            ? this.setState({ isLoadingMore: true }, () => { console.log("MORE 1 !!!"); this.fetchMore() }) 
            : null
        })    
      }
    })
  }

  componentWillUnmount() {
    this._isMounted = false
  }  

  render() {   
    return (
      <View style={styles.main_container}>  
        <ModalCommentTopRecent
          toggleModal={this.toggleModal}
          orderComment={this.orderComment}
          isModalVisible={this.state.isModalVisible}
          modalPosition={this.state.modalPosition}
        />

        { 
          this.state.isFirstLoading           
            ? <CommentLoading color={THEME.PRIMARY.BACKGROUND_COLOR}/>                      
            : <View style={styles.listview_container}>
                <AnimatedFlatList //AnimatedFlatList pourra lui aussi acceullir les commentaires de l'utilisateur, mais nous travaillerons dessus plutard
                  contentContainerStyle={styles.listview}
                  showsVerticalScrollIndicator={true}                  
                  data={this._data}                
                  renderItem={
                    ({item}) => { return (                        
                      item.contentID == 0
                        ? <VideoViewerList_HeaderComponent
                            video={this.props.video}                            
                          />
                        : item.kind == "youtube#searchResult"
                          ? <VideoMini
                              firstData={item}                            
                              navigateTo={this.navigateBackNavigateTo}                                      
                            />
                          : item.contentID == 1
                            ? <VideoViewerList_CommentHeader                              
                                setModalPosition={this.setModalPosition}                                
                                commentCount={this.state.commentCount}                
                                isLoading={this.state.isLoading}                                        
                              />                                
                            : item.kind == "youtube#commentThread"
                              ? <Comment
                                  data={item}
                                  navigateTo={this.navigateTo}                                  
                                />
                              : null
                    )}
                  }
                  ListFooterComponent={() => {
                    return (
                      this.state.isEmpty                  
                        ? <VideoViewerList_CommentEmpty/> //En temps normal ceci est cencé être une autre AnimatedFlatList destinée à acceuilir les commentaires de l'utilisateur 
                        : this.state.isLoadingMore &&
                            <View style={styles.isloadingmore_container}>
                              <ActivityIndicator size="large" color={THEME.SECONDARY.COLOR} />
                            </View>                      
                    )
                  }}
                  onEndReached={ !this.state.isFirstLoading && !this.state.isRefreshing && !this.state.stopLoadingMore && !this.state.isLoadingMore ? () => this.setState({ isLoadingMore: true }, () => { console.log("MORE 2 !!!"); this.fetchMore() }) : null }                    
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
    flex: 1   
  },
  listview: {    
    backgroundColor: THEME.PRIMARY.COLOR,   
    paddingBottom: 15, 
  },
  isloadingmore_container: { 
    flex: 1,
    padding: 10
  }
})

export default VideoViewerList

