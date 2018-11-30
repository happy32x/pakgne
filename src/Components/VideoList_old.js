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

import { Constants } from 'expo'
import Video from './Video'
import ButtonScrollTop from './ButtonScrollTop'
import BounceUpAndDown from '../Animations/BounceUpAndDown'
import { getVideoListFromApi } from '../API/REQUEST'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'

const AnimatedListView = Animated.createAnimatedComponent(ListView);
const HEADER_HEIGHT = 60
const TAB_BAR_HEIGHT = 50
const LEVEL = 100
let OLD_OFFSET = 0

class VideoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: null,
      isLoading: true,
      isLoadingMore: false,
      isRefreshing: false,
      _data: null,
      _dataAfter: '',
      isButtonScrollTopVisible: false,
    }

    this.fetchMore = this._fetchMore.bind(this)
    this.fetchData = this._fetchData.bind(this)
    this.fetchRefresh = this._fetchRefresh.bind(this)

    this.toggleFavorite = this._toggleFavorite.bind(this)
    this.recoverFavorite = this._recoverFavorite.bind(this)
    this.isFavorite = this._isFavorite.bind(this)
    this.navigateTo = this._navigateTo.bind(this)

    this.onScroll = this._onScroll.bind(this)
  }

  _toggleFavorite(firstData, secondData) {
    const action = { type: "TOGGLE_FAVORITE", value: [firstData,secondData] }
    this.props.dispatch(action)
  }

  _recoverFavorite(index) {
    return this.props.favoritesVideo[index][1]
  }

  _isFavorite(firstData) {
    return this.props.favoritesVideo.findIndex(item => item[0].id.videoId === firstData.id.videoId)
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
    this.fetchData(responseJson => {
      const data = this.state._data.concat(responseJson.items)
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
        isLoading: false,
        isLoadingMore: false,
        isRefreshing: false,
        _data: data,
        _dataAfter: responseJson.nextPageToken,
      })
    })
  }

  scrollTop = () => {
    this.scroll.scrollTo({x: 0, animated: false})
  }

  _onScroll(evt) {
    let contentOffset = evt.nativeEvent.contentOffset.y
    contentOffset = contentOffset >= 0 ? contentOffset : 0
    this.props.onFuck(contentOffset)
    let gap = contentOffset - OLD_OFFSET
    console.log('contentOffset : ' + contentOffset)
    if (contentOffset < LEVEL || gap > 0) {
      OLD_OFFSET = contentOffset
      this.setState({ isButtonScrollTopVisible: false })
    } 
    else if (gap < 0) {
      OLD_OFFSET = contentOffset
      this.setState({ isButtonScrollTopVisible: true })
    }
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
          <ActivityIndicator size="large" color="#F57F17"/>
        </View>
      )
    } else {
      return (
        <View style={styles.main_container}>
          <AnimatedListView
            ref={(lv) => {this.scroll = lv}}
            showsVerticalScrollIndicator={false}
            dataSource={this.state.dataSource}
            renderRow={
              (rowData, sectionID, rowID) => <Video 
                firstData={rowData}
                toggleFavorite={this.toggleFavorite} 
                recoverFavorite={this.recoverFavorite}
                isFavorite={this.isFavorite}
                navigateTo={this.navigateTo}
                sectionID={sectionID}
                rowID={rowID}
              /> 
            }
            onEndReached={ !this.state.isRefreshing ? () => this.setState({ isLoadingMore: true }, () => this.fetchMore()) : null }
            renderFooter={() => {
              return (
                this.state.isLoadingMore &&
                <View style={styles.isloadingmore_container}>
                  <ActivityIndicator size="large" color="#F57F17" />
                </View>
              )
            }}
            refreshControl={ 
              <RefreshControl 
                colors={["#F57F17"]} 
                refreshing={this.state.isRefreshing} 
                progressViewOffset={100}
                onRefresh={() => this.setState({ isRefreshing: true, isLoading: true, isLoadingMore: false, dataSource: null, _dataAfter: '' }, () => this.fetchRefresh())}
              /> 
            }
            scrollEventThrottle={16}
            {...this.props}
          />

            <BounceUpAndDown scrollTop={this.scrollTop} isButtonScrollTopVisible={this.state.isButtonScrollTopVisible}>
              <ButtonScrollTop />
            </BounceUpAndDown>

        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  hidden_container: { 
    height: StatusBar.currentHeight+HEADER_HEIGHT+TAB_BAR_HEIGHT,
    width: '100%'
  },
  isloading_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  isloadingmore_container: { 
    flex: 1, 
    padding: 10 
  }
})

const mapStateToProps = (state) => {
  return {
    favoritesVideo: state.toggleFavorite.favoritesVideo
  }
}

export default withNavigation( connect(mapStateToProps)(VideoList) )

