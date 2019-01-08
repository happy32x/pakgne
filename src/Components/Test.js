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
import { getCommentListReplyFromApi } from '../API/REQUEST'
import { withNavigation } from 'react-navigation'
import DIMENSION from '../INFO/DIMENSION'
import THEME from '../INFO/THEME'
import { connect } from 'react-redux'

const AnimatedListView = Animated.createAnimatedComponent(ListView)

class CommentListReply extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: null,
      isLoading: true,
      isLoadingMore: false,
      isRefreshing: false,
      _data: null,
      _dataAfter: '',
    }

    this.fetchMore = this._fetchMore.bind(this)
    this.fetchData = this._fetchData.bind(this)
    this.fetchRefresh = this._fetchRefresh.bind(this)

    this.navigateTo = this._navigateTo.bind(this)
  }

  _navigateTo(destination, data) {
    this.props.navigation.navigate(destination, data)
  }

  _fetchData(callback) {
    const dataAfter = this.state._dataAfter
    const pageToken = dataAfter !== '' ? `&pageToken=${dataAfter}` : ''
    getCommentListReplyFromApi(this.props.commentId, pageToken).then(callback)
  }

  _fetchMore() {
    this.fetchData(responseJson => {
      const data = this.state._data.concat(responseJson.items)
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data),
        isLoadingMore: false,
        _data: data,
        _dataAfter: responseJson.nextPageToken,
      })
      console.log(this.state._dataAfter)
    })
  }

  _fetchRefresh() {
    this.fetchData(responseJson => {
      let ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      })
      const data = responseJson.items;
      this.setState({
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
      this.setState({
        dataSource: ds.cloneWithRows(data),
        isLoading: false,
        _data: data,
        _dataAfter: responseJson.nextPageToken,
      })
    })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.isloading_container}>
          <ActivityIndicator style={styles.isloading} size="large" color={THEME.SECONDARY.COLOR}/>
        </View>
      )
    } else {
      return (
        <View style={styles.main_container}>
          <AnimatedListView
            contentContainerStyle={styles.sub_container}
            showsVerticalScrollIndicator={true}
            dataSource={this.state.dataSource}
            renderRow={
              (rowData, sectionId, rowId) => <CommentReply
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
            onEndReached={ !this.state.isRefreshing && this.state._dataAfter!==undefined ? () => this.setState({ isLoadingMore: true }, () => this.fetchMore()) : null }
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
      )
    }
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  sub_container: {
    backgroundColor: THEME.PRIMARY.COLOR,
    padding: 15,
  },
  isloading_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.PRIMARY.COLOR,
  },
  isloading: {
    transform: [{ translateY: -DIMENSION.STATUSBAR_HEIGHT }],
  },
  isloadingmore_container: { 
    flex: 1, 
    padding: 10 
  }
})

export default withNavigation( CommentListReply )

