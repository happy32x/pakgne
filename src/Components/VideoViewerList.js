import React, { Component } from 'react'
import {
  View,
  ListView,
  Animated,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,    
} from 'react-native'

import Comment from './Comment'
import VideoViewer_CommentHeader from './VideoViewerList_CommentHeader'
import CommentLoading from './CommentLoading'
import CommentEmpty from './CommentEmpty'
import { getCommentListFromApi,getVideoInfoFromApi } from '../API/REQUEST'
import THEME from '../INFO/THEME'
import ModalCommentTopRecent from '../Modal/ModalCommentTopRecent'
import { connect } from 'react-redux'

const AnimatedListView = Animated.createAnimatedComponent(ListView)

class VideoViewerList extends Component {
  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {
      dataSource: null,
      isEmpty: true,
      isLoading: true,
      isLoadingMore: false,
      isRefreshing: false,
      _data: null,
      _dataAfter: '',
      stopLoadingMore: false,

      isModalVisible: false,
      order: 'relevance',
      canWeHandleOrder: false,

      commentCount: this.props.commentCount   
    }
    this.videoId = this.props.videoId

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

  _toggleModal() {
    this.setState({ isModalVisible: !this.state.isModalVisible })
  }

  _orderComment(order) {    
    this.toggleModal()
    this.state.order === order 
      ? null
      : this.state.canWeHandleOrder         
        ? this.setState({ isRefreshing: true, isLoading: true, isLoadingMore: false, dataSource: null, _dataAfter: '', order }, () => this.fetchRefresh())        
        : this.setState({ order, isLoading: true }, () => this.componentDidMountClone()) //En temps normal on annule le chargement de la page et on reprend avec la nouvelle requête
  }

  _navigateTo(destination, data) {
    this.props.navigation.navigate(destination, data)
  }

  _navigateBack() {
    this.props.navigation.goBack()
  }

  _fetchData(callback) {
    const dataAfter = this.state._dataAfter
    const pageToken = dataAfter !== '' ? `&pageToken=${dataAfter}` : ''
    getCommentListFromApi(this.videoId, this.state.order, pageToken).then(callback)
  }

  _fetchDataCommentCount(callback) {
    getVideoInfoFromApi(this.videoId).then(callback)
  }

  _fetchMore() {
    this.fetchData(responseJson => {
      if(this._isMounted) {   
        const data = this.state._data.concat(responseJson.items)      

        responseJson.nextPageToken===undefined
          ? this.setState({
              dataSource: this.state.dataSource.cloneWithRows(data),
              isLoadingMore: false,
              _data: data,
              _dataAfter: responseJson.nextPageToken,
              stopLoadingMore: true,
            })
          : this.setState({
              dataSource: this.state.dataSource.cloneWithRows(data),
              isLoadingMore: false,
              _data: data,
              _dataAfter: responseJson.nextPageToken,
            })
      }
    })
  }

  _fetchRefresh() {
    this.fetchData(responseJson => {
      if(this._isMounted) {   
        let ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2,
        })
        const data = responseJson.items;

        responseJson.nextPageToken===undefined 
          ? this.fetchDataCommentCount(responseJsonCommentCount => {
              if(this._isMounted) {  
                const commentCount = responseJsonCommentCount.items[0].statistics.commentCount
                this.setState({
                  dataSource: ds.cloneWithRows(data),
                  isLoading: false,
                  isLoadingMore: false,
                  isRefreshing: false,
                  _data: data,
                  _dataAfter: responseJson.nextPageToken,
                  commentCount,
                  stopLoadingMore: true
                })
              }
            })
          : this.fetchDataCommentCount(responseJsonCommentCount => {
              if(this._isMounted) {  
                const commentCount = responseJsonCommentCount.items[0].statistics.commentCount
                this.setState({
                  dataSource: ds.cloneWithRows(data),
                  isLoading: false,
                  isLoadingMore: false,
                  isRefreshing: false,
                  _data: data,
                  _dataAfter: responseJson.nextPageToken,
                  commentCount,
                })
              }
            })
      }
    })
  }

  _componentDidMountClone() {    
    this.fetchData(responseJson => {
      if(this._isMounted) {
        let ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2,
        })
        const data = responseJson.items
        
        //En temps normal, lorsque data.lenght===0, 
        //dans le render() on devrai avoir une autre Listview destiné à acceuillir les commentaires du users
        //ce qui implique de nouvelles variables, fonction, modification, disposition, bref un gros bordel
        data.length===0
          ? this.setState({ isEmpty: true, isLoading: false, canWeHandleOrder: false }) 
          : responseJson.nextPageToken===undefined 
            ? this.fetchDataCommentCount(responseJsonCommentCount => {
                if(this._isMounted) {
                  const commentCount = responseJsonCommentCount.items[0].statistics.commentCount
                  this.setState({
                    dataSource: ds.cloneWithRows(data),
                    isEmpty: false,
                    isLoading: false,
                    _data: data,
                    _dataAfter: responseJson.nextPageToken,
                    commentCount,
                    canWeHandleOrder: true,
                    stopLoadingMore: true,
                  })
                }
              })
            : this.fetchDataCommentCount(responseJsonCommentCount => {
                if(this._isMounted) {
                  const commentCount = responseJsonCommentCount.items[0].statistics.commentCount
                  this.setState({
                    dataSource: ds.cloneWithRows(data),
                    isEmpty: false,
                    isLoading: false,
                    _data: data,
                    _dataAfter: responseJson.nextPageToken,
                    commentCount,
                    canWeHandleOrder: true,
                  })
                }
              })
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

        <VideoViewer_CommentHeader 
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
            ? <CommentLoading />
            : this.state.isEmpty
              ? <CommentEmpty/> //En temps normal ceci est cencé être une autre AnimatedListView destinée à acceuilir les commentaires de l'utilisateur            
              : <View style={styles.listview_container}>
                  <AnimatedListView //AnimatedListView pourra lui aussi acceullir les commentaires de l'utilisateur, mais nous travaillerons dessus plutard
                    contentContainerStyle={styles.listview}
                    showsVerticalScrollIndicator={true}
                    dataSource={this.state.dataSource}
                    renderRow={
                      (rowData, sectionId, rowId) => {
                        if(rowData){
                          <Comment
                            data={rowData}
                            navigateTo={this.navigateTo}
                            rowId={rowId}                      
                          />
                        }
                      }
                    }
                    renderFooter={() => {
                      return (
                        this.state.isLoadingMore &&
                        <View style={styles.isloadingmore_container}>
                          <ActivityIndicator size="large" color={THEME.SECONDARY.COLOR} />
                        </View>
                      )
                    }}
                    onEndReached={ !this.state.isRefreshing && !this.state.stopLoadingMore? () => this.setState({ isLoadingMore: true }, () => this.fetchMore()) : null }
                    refreshControl={ 
                      <RefreshControl 
                        colors={[THEME.SECONDARY.COLOR]} 
                        refreshing={this.state.isRefreshing} 
                        progressViewOffset={-25}
                        onRefresh={() => this.setState({ isRefreshing: true, isLoading: true, isLoadingMore: false, dataSource: null, _dataAfter: '' }, () => this.fetchRefresh())}
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

export default VideoViewerList

