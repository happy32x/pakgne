import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ListView,
  ActivityIndicator,
  RefreshControl,
  Animated,
} from 'react-native'

import CommentReply from './CommentReply'
import CommentReplyHeader from './CommentReplyHeader'
import CommentEmpty from './CommentEmpty'
import { getCommentListReplyFromApi } from '../API/REQUEST'
import THEME from '../INFO/THEME'
import { connect } from 'react-redux'

const AnimatedListView = Animated.createAnimatedComponent(ListView)

class CommentListReply extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: null,
      isEmpty: false,
      isLoading: true,
      isLoadingMore: false,
      isRefreshing: false,
      _data: null,
      _dataAfter: '',
      stopLoadingMore: false,
    }
    this.commentId = this.props.navigation.getParam('commentId', 'NO-DATA')   

    this.fetchData = this._fetchData.bind(this)
    this.fetchMore = this._fetchMore.bind(this)
    this.fetchRefresh = this._fetchRefresh.bind(this)

    this.navigateBack = this._navigateBack.bind(this)
  }

  static navigationOptions = {
    header: null
  };

  _navigateBack() {
    this.props.navigation.goBack()
  }

  _fetchData(callback) {
    const dataAfter = this.state._dataAfter
    const pageToken = dataAfter !== '' ? `&pageToken=${dataAfter}` : ''
    getCommentListReplyFromApi(this.commentId, pageToken).then(callback)
  }

  _fetchMore() {
    this.fetchData(responseJson => {
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
    })
  }

  _fetchRefresh() {
    this.fetchData(responseJson => {
      let ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      })
      const data = responseJson.items;

      responseJson.nextPageToken===undefined 
        ? this.setState({
            dataSource: ds.cloneWithRows(data),
            isLoading: false,
            isLoadingMore: false,
            isRefreshing: false,
            _data: data,
            _dataAfter: responseJson.nextPageToken,
            stopLoadingMore: true,
          })  
        : this.setState({
            dataSource: ds.cloneWithRows(data),
            isLoading: false,
            isLoadingMore: false,
            isRefreshing: false,
            _data: data,
            _dataAfter: responseJson.nextPageToken,
          })  
    })
  }

  componentDidMount() {
    this.fetchData(responseJson => {
      let ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      })
      const data = responseJson.items
      
      //En temps normal, lorsque data.lenght===0, 
      //dans le render() on devrai avoir une autre Listview destiné à acceuillir les commentaires du users 
      //ce qui implique de nouvelles variables, fonction, modification, disposition, bref un gros bordel
      data.length===0
        ? this.setState({ isEmpty: true }) 
        : responseJson.nextPageToken===undefined 
          ? this.setState({
              dataSource: ds.cloneWithRows(data),
              isLoading: false,
              _data: data,
              _dataAfter: responseJson.nextPageToken,
              stopLoadingMore: true,
            })
          : this.setState({
              dataSource: ds.cloneWithRows(data),
              isLoading: false,
              _data: data,
              _dataAfter: responseJson.nextPageToken,
            })
    })
  }

  render() {   
    return (
      <View style={styles.main_container}>

        <CommentReplyHeader           
          navigateBack={this.navigateBack}
        />

        { 
          this.state.isLoading           
            ?   
              <CommentEmpty isEmpty={this.state.isEmpty} />
            :
              <View style={styles.listview_container}>
                <AnimatedListView
                  contentContainerStyle={styles.listview}
                  showsVerticalScrollIndicator={true}
                  dataSource={this.state.dataSource}
                  renderRow={
                    (rowData, sectionId, rowId) => <CommentReply
                      data={rowData}
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
                  onEndReached={ !this.state.isRefreshing && !this.state.stopLoadingMore ? () => this.setState({ isLoadingMore: true }, () => this.fetchMore()) : null }
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

export default CommentListReply