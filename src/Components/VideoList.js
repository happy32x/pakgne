import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ListView,
  ActivityIndicator,
  RefreshControl,
  Animated,
} from 'react-native'

import Video from './Video'
import { shuffleArray } from '../AI/Randomizer'
import { getVideoListFromApi } from '../API/REQUEST'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import DIMENSION from '../INFO/DIMENSION'
import HeaderContentIndicator from './HeaderContentIndicator'
import THEME from '../INFO/THEME'

const AnimatedListView = Animated.createAnimatedComponent(ListView)

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
      stopLoadingMore: false,
    }    

    this.videoInProgress = []
    this.handleVideoInProgress = this._handleVideoInProgress.bind(this)
    this.canWeFetchMore = this._canWeFetchMore.bind(this)    

    this.toggleFavorite = this._toggleFavorite.bind(this)
    this.recoverFavorite = this._recoverFavorite.bind(this)
    this.isFavorite = this._isFavorite.bind(this)
    this.navigateTo = this._navigateTo.bind(this)

    this.videoListOrder = ['date','rating','relevance','title','videoCount','viewCount']
    this._videoListOrder = []
    this.randomVideoListOrder = this._randomVideoListOrder.bind(this)

    this.fetchData = this._fetchData.bind(this)
    this.fetchMore = this._fetchMore.bind(this)    
    this.fetchRefresh = this._fetchRefresh.bind(this)    
  }

  _handleVideoInProgress(bin) {    
    this.state.isRefreshing 
      ? this.videoInProgress = []
      : bin 
        ? this.videoInProgress.push(bin) : this.videoInProgress.pop()
    this.canWeFetchMore()    
    console.log(this.videoInProgress.length)
  }

  _handleVideoInProgress(bin) {    
    if(this.state.isRefreshing) 
      this.videoInProgress = []      
    else {
      if(bin) this.videoInProgress.push(bin)
      else {
        this.videoInProgress.pop()
        this.canWeFetchMore() 
      }
    }
    console.log(this.videoInProgress.length)
  }

  _canWeFetchMore() {
    this.videoInProgress.length === 0 && this.state.isLoadingMore && !this.state.isRefreshing ? this.fetchMore() : null
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

  _randomVideoListOrder() {    
    do { 
      this.videoListOrder = shuffleArray(this.videoListOrder) 
    } while (this.videoListOrder[0] === this._videoListOrder[0])
    this._videoListOrder = this.videoListOrder
  }

  _fetchData(callback) {
    const dataAfter = this.state._dataAfter
    const pageToken = dataAfter !== '' ? `&pageToken=${dataAfter}` : ''
    console.log(this.videoListOrder[0])
    getVideoListFromApi(this.videoListOrder[0], pageToken).then(callback)
  }

  _fetchMore() {
    this.fetchData(responseJson => {

        const data = this.state._data.concat(shuffleArray(responseJson.items.filter(item => item.id.videoId !== undefined)))      
        console.log(data.length)

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
     //this.randomVideoListOrder()
    this.fetchData(responseJson => {
      let ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      })

      const data = shuffleArray(responseJson.items.filter(item => item.id.videoId !== undefined))

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

  scrollTop = () => {
    this.scroll.scrollTo({x: 0, animated: false})
  }  

   componentDidMount() {
     //this.randomVideoListOrder()
    this.fetchData(responseJson => {
      let ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      })

      const data = shuffleArray(responseJson.items.filter(item => item.id.videoId !== undefined))
      console.log(data.length)
      console.log(data.length)

      /*console.log(data)
      for (var i of data) {
        console.log(i.id.videoId);
      }*/

      responseJson.nextPageToken===undefined 
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
    if (this.state.isLoading) {
      return (
        <View style={styles.isloading_container}>
          <ActivityIndicator size="large" color={THEME.PRIMARY.BACKGROUND_COLOR}/>
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
            renderHeader={() => <HeaderContentIndicator type="MaterialCommunityIcons" icon="movie" color={THEME.PRIMARY.BACKGROUND_COLOR} backgroundColor={THEME.PRIMARY.COLOR} />}
            renderRow={
              (rowData, sectionId, rowId) => <Video 
                firstData={rowData}                
                toggleFavorite={this.toggleFavorite} 
                recoverFavorite={this.recoverFavorite}
                isFavorite={this.isFavorite}
                navigateTo={this.navigateTo}
                rowId={rowId}
                handleVideoInProgress={this.handleVideoInProgress}
              /> 
            }
            renderFooter={() => {
              return (
                this.state.isLoadingMore &&
                <View style={styles.isloadingmore_container}>
                  <ActivityIndicator size="large" color={THEME.PRIMARY.BACKGROUND_COLOR} />
                </View>
              )
            }}
            onEndReached={ !this.state.isRefreshing && !this.state.stopLoadingMore ? () => this.setState({ isLoadingMore: true }, () => this.canWeFetchMore()) : null }
            refreshControl={ 
              <RefreshControl 
                colors={[THEME.PRIMARY.BACKGROUND_COLOR]} 
                refreshing={this.state.isRefreshing} 
                progressViewOffset={50}
                onRefresh={() => this.setState({ isRefreshing: true, isLoading: true, isLoadingMore: false, dataSource: null, _dataAfter: '' }, () => this.fetchRefresh())}
              /> 
            }
            onEndReachedThreshold={.1}
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
    paddingTop: DIMENSION.MEDIUM_HEADER_HEIGHT,
  },
  content_container: {
    marginTop: 0
  },
  isloading_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: DIMENSION.STATUSBAR_HEIGHT,
    backgroundColor: THEME.PRIMARY.COLOR,
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
