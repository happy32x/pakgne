import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ListView,
  ActivityIndicator,
  RefreshControl,
  Animated,
  StatusBar,
} from 'react-native'

import Article from './Article'
import firstDataGlobal from './firstDataGlobal';
import { getVideoListFromApi } from '../API/REQUEST'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import { DIMENSION } from '../INFO/DIMENSION'
import ContentIndicator from './ContentIndicator'

const STATUSBAR_HEIGHT = StatusBar.currentHeight
const MIN_HEADER_HEIGHT = 60 
const MAX_HEADER_HEIGHT = STATUSBAR_HEIGHT + MIN_HEADER_HEIGHT
const NAVBAR_HEIGHT = 50
const TOTAL_HEADER_HEIGHT = MAX_HEADER_HEIGHT + NAVBAR_HEIGHT

const AnimatedListView = Animated.createAnimatedComponent(ListView);

class ArticleList extends Component {
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
    getVideoListFromApi(pageToken).then(callback)
  }

  _fetchMore() {
    const data = this.state._data.concat(firstDataGlobal)
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data),
      isLoadingMore: false,
      _data: data,
    })
  }

  _fetchRefresh() {
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    })
    const data = firstDataGlobal;
    this.setState({
      dataSource: ds.cloneWithRows(data),
      isLoading: false,
      isLoadingMore: false,
      isRefreshing: false,
      _data: data,
    })
  }

  scrollTop = () => {
    this.scroll.scrollTo({x: 0, animated: false})
  }

  componentDidMount() {
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    })
    const data = firstDataGlobal;
    this.setState({
      dataSource: ds.cloneWithRows(data),
      isLoading: false,
      _data: data,
    })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.isloading_container}>
          <ActivityIndicator size="large" color="#F57F17"/>
        </View>
      )
    } else {
      return (
        <View style={styles.main_container}>
          <AnimatedListView
            ref={(lv) => {this.scroll = lv}}
            contentContainerStyle={styles.content_container}
            showsVerticalScrollIndicator={false}
            dataSource={this.state.dataSource}
            renderHeader={() => <ContentIndicator type="Feather" icon="file-text" color="#F57F17" backgroundColor="#FFF" />}
            renderRow={
              (rowData, sectionId, rowId) => <Article
                firstData={rowData}
                navigateTo={this.navigateTo}
                rowId={rowId}
              />
            }
            renderFooter={() => {
              return (
                this.state.isLoadingMore &&
                <View style={styles.isloadingmore_container}>
                  <ActivityIndicator size="large" color="#F57F17" />
                </View>
              )
            }}
            onEndReached={ !this.state.isRefreshing ? () => this.setState({ isLoadingMore: true }, () => this.fetchMore()) : null }
            refreshControl={ 
              <RefreshControl 
                colors={["#F57F17"]} 
                refreshing={this.state.isRefreshing} 
                progressViewOffset={50}
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
    paddingTop: NAVBAR_HEIGHT+STATUSBAR_HEIGHT
  },
  content_container: {
    marginTop: 0
  },
  isloading_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: STATUSBAR_HEIGHT,
    backgroundColor: '#ecf0f1',
  },
  isloadingmore_container: { 
    flex: 1, 
    padding: 10 
  }
})

export default withNavigation( ArticleList )

