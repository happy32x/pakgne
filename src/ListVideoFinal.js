import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  View,
  ListView,
  ActivityIndicator,
  RefreshControl,
  FlatList,
} from 'react-native'
import { Constants } from 'expo'
import Sample from './Sample'
import Card from './Card'
import ButtonScrollTop from './ButtonScrollTop'
import InfiniteElements from './InfiniteElements'

const apiKey = 'AIzaSyAIhByrz5QzcD0ODHh5g5sOqzBBvLvl5OM'
const channelId = 'UCWitG84eyFDN5xj8oLXwVhA'
const results = 15

export default class ListVideoFinal extends Component {
  constructor(props) {
    super(props)
    this.fetchMore = this._fetchMore.bind(this)
    this.fetchData = this._fetchData.bind(this)
    this.fetchRefresh = this._fetchRefresh.bind(this)
    this.state = {
      dataSource: null,
      isLoading: true,
      isLoadingMore: false,
      isRefreshing: false,
      _data: [1,2],
      _dataAfter: '',
      isButtonScrollTopVisible: false,
    }
  }

  _fetchData(callback) {
    const pageToken = this.state._dataAfter !== ''
      ? `&pageToken=${this.state._dataAfter}`
      : ''
    fetch(`https://www.googleapis.com/youtube/v3/search/?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=relevance&maxResults=${results}${pageToken}`)
    .then(response => response.json())
    .then(callback)
    .catch(error => {
      console.error(error)
    })
  }

  _fetchMore() {
    this.fetchData(responseJson => {
      const data = this.state._data.concat(responseJson.items);
      this.setState({
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
      this.setState({
        dataSource: ds.cloneWithRows(data),
        isLoadingMore: false,
        isRefreshing: false,
        _data: data,
        _dataAfter: responseJson.nextPageToken,
      }, () => {
        this.scrollTop()
      })
    })
  }

  scrollTop = () => {
    this.scroll.scrollToIndex({index:0 , animated: true})
  }

  onScroll = (evt) => {
    let currentOffset = evt.nativeEvent.contentOffset.y
    if (currentOffset > 100) this.setState({ isButtonScrollTopVisible: true })
    else this.setState({ isButtonScrollTopVisible: false })
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
      return (
        <View>
          <FlatList
            ref={(lv) => {this.scroll = lv}}
            data={this.state._data}
            renderItem={({ item }) => (
              <InfiniteElements />
            )}
            keyExtractor={(item,i) => i.toString()}
            onScroll={this.onScroll}
            scrollEventThrottle={1}
          />
          
          <ButtonScrollTop scrollTop={this.scrollTop} isButtonScrollTopVisible={this.state.isButtonScrollTopVisible} />
        </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#d6d7da',
    padding: 6,
  },
  imageWrapper: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    margin: 6,
  },
  subtitle: {
    fontSize: 10,
    textAlign: 'left',
    margin: 6,
  },
})
