import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  View,
  ListView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native'
import { Constants } from 'expo'
import Sample from './Sample'
import Card from './Card'
import ButtonScrollTop from './ButtonScrollTop'

const apiKey = 'AIzaSyAIhByrz5QzcD0ODHh5g5sOqzBBvLvl5OM'
const channelId = 'UCWitG84eyFDN5xj8oLXwVhA'
const results = 15

export default class SandBox extends Component {
  constructor(props) {
    super(props)
    this.fetchMore = this._fetchMore.bind(this)
    this.fetchData = this._fetchData.bind(this)
    this.fetchRefresh = this._fetchRefresh.bind(this)
    this.scrollTop = this._scrollTop.bind(this)
    this.state = {
      dataSource: null,
      isLoading: true,
      isLoadingMore: false,
      isRefreshing: false,
      _data: null,
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

  _scrollTop() {
    this.scroll.scrollTo({x: 0, y: 0, animated: true})
    this.setState({ isButtonScrollTopVisible: false })
  }

  onScroll(evt) {
    const currentOffset = evt.nativeEvent.contentOffset.y
    if (currentOffset > 100)  this.setState({ isButtonScrollTopVisible: true }) 
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
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#F57F17"/>
        </View>
      )
    } else {
      return (
        <View>
          <ListView
            ref={(lv) => {this.scroll = lv}}
            showsVerticalScrollIndicator={false}
            dataSource={this.state.dataSource}
            renderRow={rowData => <Card {...rowData} /> }
            onEndReached={ !this.state.isRefreshing ? () => this.setState({ isLoadingMore: true }, () => this.fetchMore()) : null }
            renderFooter={() => {
              return (
                this.state.isLoadingMore &&
                <View style={{ flex: 1, padding: 10 }}>
                  <ActivityIndicator size="large" color="#F57F17" />
                </View>
              );
            }}
            refreshControl={ 
              <RefreshControl 
                colors={["#F57F17"]} 
                refreshing={this.state.isRefreshing} 
                onRefresh={() => this.setState({ isRefreshing: true, isLoadingMore: false, _dataAfter: '' }, () => this.fetchRefresh())}
              /> 
            }
            onScroll={this.onScroll}
            scrollEventThrottle={1}
          />
          
          {this.state.isButtonScrollTopVisible ? <ButtonScrollTop scrollTop={this.scrollTop}/> : null}
        </View>
      )
    }
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
