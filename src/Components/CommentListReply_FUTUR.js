import React, { Component } from 'react'
import {  
  View,
  FlatList,
  Animated,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,  
} from 'react-native'

import CommentReply from './CommentReply'
import CommentReplyHeader from './CommentReplyHeader'
import CommentLoading from './CommentLoading'
import CommentEmpty from './CommentEmpty'
import { getCommentListReplyFromApi } from '../API/REQUEST'
import THEME from '../INFO/THEME'
import { connect } from 'react-redux'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

class CommentListReply extends Component {
  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {
      isEmpty: true,
      isLoading: true,
      isLoadingMore: false,
      isRefreshing: false,      
      stopLoadingMore: false,
    }

    this._data = null
    this._dataAfter = ''

    this.commentId = this.props.navigation.getParam('commentId', 'NO-DATA')   

    this.fetchData = this._fetchData.bind(this)
    this.fetchMore = this._fetchMore.bind(this)
    this.fetchRefresh = this._fetchRefresh.bind(this)

    this.navigateTo = this._navigateTo.bind(this)
    this.navigateBack = this._navigateBack.bind(this)
  }

  static navigationOptions = {
    header: null
  };

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

        this.setState({ isLoadingMore: false })

        responseJson.nextPageToken===undefined
          ? this.setState({ stopLoadingMore: true })
          : null
      }
    })
  }

  _fetchRefresh() {
    this.fetchData(responseJson => {
      if(this._isMounted) {
        this._data = responseJson.items
        this._dataAfter = responseJson.nextPageToken

        this.setState({
          isLoading: false,
          isLoadingMore: false,
          isRefreshing: false,            
        })

        responseJson.nextPageToken===undefined 
          ? this.setState({ stopLoadingMore: true })  
          : null 
      }
    })
  }

  componentDidMount() {
    this._isMounted = true
    this.fetchData(responseJson => {     
      if(this._isMounted) {
        //En temps normal, lorsque responseJson.items.lenght===0, 
        //dans le render() on devrai avoir une autre AnimatedFlatList destiné à acceuillir les commentaires du users 
        //ce qui implique de nouvelles variables, fonction, modification, disposition, bref un gros bordel
        if(responseJson.items.length===0) {
          this.setState({ isEmpty: true, isLoading: false }) 
        } else {

          this._data = responseJson.items
          this._dataAfter = responseJson.nextPageToken
          
          this.setState({
            isEmpty: false,
            isLoading: false,
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
      <View style={styles.main_container}>

        <CommentReplyHeader           
          navigateBack={this.navigateBack}
        />

        { 
          this.state.isLoading           
            ? <CommentLoading/>           
            : this.state.isEmpty
              ? <CommentEmpty/> //En temps normal ceci est cencé être une autre AnimatedFlatList destinée à acceuilir les commentaires de l'utilisateur
              : <View style={styles.listview_container}>
                  <AnimatedFlatList //AnimatedFlatList pourra lui aussi acceullir les commentaires de l'utilisateur, mais nous travaillerons dessus plutard
                    contentContainerStyle={styles.listview}
                    showsVerticalScrollIndicator={true}
                    data={this._data}
                    renderItem={
                      ({item}) => <CommentReply
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
                    onEndReached={ !this.state.isRefreshing && !this.state.stopLoadingMore && !this.state.isLoadingMore ? () => this.setState({ isLoadingMore: true }, () => this.fetchMore()) : null }
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
                    onEndReachedThreshold={.1}
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

export default CommentListReply