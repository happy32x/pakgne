import React, { Component, PureComponent } from "react"
import {  
  View,
  FlatList,
  Animated,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,    
} from "react-native"

import uuidv1 from 'uuid/v1'

import Video from './Video'
import { shuffleArray } from '../AI/Randomizer'
import { getVideoListFromApi } from '../API/REQUEST'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import DIMENSION from '../INFO/DIMENSION'
import HeaderContentIndicator from './HeaderContentIndicator'
import THEME from '../INFO/THEME'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

class VideoList extends Component {
  _isMounted = false

  constructor(props) {
    super(props);    
    this.state = {
      updateVideoList: false,
      isLoading: true,
      isLoadingMore: false,
      isRefreshing: false,
      stopLoadingMore: false,
    }

    this.requestId = null

    this._data = null
    this._dataAfter = ''

    this.toggleFavorite = this._toggleFavorite.bind(this)
    this.recoverFavorite = this._recoverFavorite.bind(this)
    this.isFavorite = this._isFavorite.bind(this)
    this.navigateTo = this._navigateTo.bind(this)

    this.videoListOrder = ['date','rating','relevance','title','videoCount','viewCount']
    this._videoListOrder = []
    this.randomVideoListOrder = this._randomVideoListOrder.bind(this)

    this.fetchMore = this._fetchMore.bind(this)
    this.fetchData = this._fetchData.bind(this)
    this.fetchRefresh = this._fetchRefresh.bind(this)
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

  async _randomVideoListOrder() {   
    this.videoListOrder = await shuffleArray(this.videoListOrder) 
    this._videoListOrder = this.videoListOrder
    return this.videoListOrder[0]
  }

  _fetchData(callback) {
    const pageToken = this._dataAfter !== '' ? `&pageToken=${this._dataAfter}` : ''
    //getVideoListFromApi(this.videoListOrder[0], pageToken).then(callback)
    getVideoListFromApi('date', pageToken).then(callback)
  }

  _fetchMore() {
    const requestId = this.requestId = uuidv1()

    this.fetchData(responseJson => {
      if(this._isMounted && this.requestId === requestId) {      
        const data = this._data.concat(shuffleArray(responseJson.items.filter(item => item.id.videoId !== undefined)))      
        console.log("dataLength : " + data.length)

        this._data = data,
        this._dataAfter = responseJson.nextPageToken,

        this.setState({ isLoadingMore: false })

        responseJson.nextPageToken===undefined
          ? this.setState({ stopLoadingMore: true })
          : null
      }
    })
  }

  _fetchRefresh() {
    this.dataAfter = ''
    const requestId = this.requestId = uuidv1()

    this.randomVideoListOrder()
      .then((order) => {
        this.fetchData(responseJson => {
          //if(this._isMounted && this.requestId === requestId && this.props.updateVideoList !== false && this.props.updateVideoList === this.state.updateVideoList) {
          if(this._isMounted && this.requestId === requestId) {
            const data = shuffleArray(responseJson.items.filter(item => item.id.videoId !== undefined))
            console.log("order : " + order)
            console.log("dataLength : " + data.length)
      
            this._data = data,
            this._dataAfter = responseJson.nextPageToken,

            this.setState({
              isLoading: false,
              isLoadingMore: false,
              isRefreshing: false,
            })

            responseJson.nextPageToken===undefined 
              ? this.setState({ stopLoadingMore: true })  
              : this.setState({ stopLoadingMore: false })  
              
            //On vérifie pour raison de sécurité si this.requestId à été modifié
            /*this.requestId === requestId 
              ? this.setState({ isLoading: false })
              : this.setState({ isLoading: true })*/
          }            
        })
      })
  }

  componentDidMount() {    
    this._isMounted = true

    this.randomVideoListOrder()
      .then((order) => {
        this.fetchData(responseJson => {
          if(this._isMounted) {
            //const data = shuffleArray(responseJson.items.filter(item => item.id.videoId !== undefined))
            const data = responseJson.items.filter(item => item.id.videoId !== undefined)
            console.log("order : " + order)
            console.log("dataLength : " + data.length)
      
            this._data = data,
            this._dataAfter = responseJson.nextPageToken,

            this.setState({ isLoading: false })

            responseJson.nextPageToken===undefined 
              ? this.setState({ stopLoadingMore: true })  
              : null            
          }        
        })
      })    
  }

  /*
  componentDidUpdate(prevProps) {
    if (this.props.searchText !== '' && this.props.searchText !== this.state.searchText) {
      
      this._dataAfter = ''
      this.keyWord = this.props.searchText
      const requestId = this.requestId = uuidv1()
      console.log('didupdate')

      this.fetchData(responseJson => {
        console.log('in')
        console.log("responseJson.items.length : " + JSON.stringify(responseJson.items.length))
        //console.log("responseJson : " + JSON.stringify(responseJson))
        //console.log("_isMounted : " + this._isMounted)
        //console.log("this._requestId : " + this.requestId)
        //console.log("requestId : " + requestId)
        //console.log("this.props.searchText : " + this.props.searchText)
        if(responseJson.items.length===0) { //Rien n'a été trouvé, donc remise des compteurs à 0 avec isEmpty à true et mise a jour de searchText
          this.setState({ 
            searchText: this.props.searchText,
            isLoading: false,
            isLoadingMore: false,
            isRefreshing: false,
            isEmpty: true,   
          }) 
        } else if(this._isMounted && this.requestId === requestId && this.props.searchText !== '') {
          const data = responseJson.items.filter(item => item.id.videoId !== undefined)        
          console.log("dataLength : " + data.length)
    
          this._data = data
          this._dataAfter = responseJson.nextPageToken

          this.setState({
            searchText: this.props.searchText,
            isLoading: false,
            isLoadingMore: false,
            isRefreshing: false,
            isEmpty: false,
          })  

          responseJson.nextPageToken===undefined 
            ? this.setState({ stopLoadingMore: true })  
            : this.setState({ stopLoadingMore: false })

          //On vérifie pour raison de sécurité si this.requestId à été modifiés
          this.requestId === requestId 
            ? this.setState({ isLoading: false })
            : this.setState({ isLoading: true })
        }  
        console.log('out')        
      })
    } else if (this.props.searchText === '') { //S'execute uniquement pour mettre à jour this.state.searchText (qui deviens vide) 
      this.setState({                          //avec this.props.searchText (qui est vide)
        searchText: this.props.searchText, 
      })  
    }    
  }
  */

  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate')  
    console.log('this.props.updateVideoList :: ' + this.props.updateVideoList)  
    console.log('this.props.updateVideoListToggle :: ' + this.props.updateVideoListToggle)  
    console.log('prevProps.updateVideoListToggle :: ' + prevProps.updateVideoListToggle)  

    //On appui sur VIDEO une deuxième fois
    if(this.props.updateVideoList && (this.props.updateVideoListToggle !== prevProps.updateVideoListToggle) ) {          
      this._dataAfter = ''
      this.setState({ isRefreshing: true, isLoading: true, isLoadingMore: false }, () => this.fetchRefresh())      
    }
  }  

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate') 
    console.log('nextProps.scrollTopVideoList :: ' + nextProps.scrollTopVideoList) 

    if(nextProps.index != 0 || nextProps.indexOLD != 0) return false

    if(nextProps.scrollTopVideoList) { //On appui sur VIDEO une première fois  
      this.scrollTopVideoList = nextProps.scrollTopVideoList
      this.scrollTop()
      return false
    }

    return true
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  //Déclenché depuis l'onglet VIDEO de RootTab
  scrollTop = () => {
    //this.scroll.scrollTo({x: 0, animated: true})
    this.scroll.getNode().scrollToOffset({ offset: 0, animated: true });
  }

  render() {
    {console.log('render')}
    if (this.state.isLoading) {
      return (
        <View style={styles.isloading_container}> 
          <ActivityIndicator size="large" color={THEME.PRIMARY.BACKGROUND_COLOR}/>
        </View>
      )
    } else {
      return (        
        <View style={styles.main_container}>
          <AnimatedFlatList
            ref={(lv) => {this.scroll = lv}}
            contentContainerStyle={styles.content_container}
            showsVerticalScrollIndicator={false}            
            data={this._data}  
            ListHeaderComponent={() => <HeaderContentIndicator type="MaterialCommunityIcons" icon="movie" color={THEME.PRIMARY.BACKGROUND_COLOR} backgroundColor={THEME.PRIMARY.COLOR} />}
            renderItem={
              ({item}) => <Video 
                firstData={item}                
                toggleFavorite={this.toggleFavorite} 
                recoverFavorite={this.recoverFavorite}
                isFavorite={this.isFavorite}
                navigateTo={this.navigateTo}          
              />
            }
            ListFooterComponent={() => {
              return (
                this.state.isLoadingMore &&
                <View style={styles.isloadingmore_container}>
                  <ActivityIndicator size="large" color={THEME.PRIMARY.BACKGROUND_COLOR} />
                </View>
              )
            }}
            onEndReached={ !this.state.isRefreshing && !this.state.stopLoadingMore && !this.state.isLoadingMore ? () => this.setState({ isLoadingMore: true }, () => this.fetchMore()) : null }
            refreshControl={ 
              <RefreshControl 
                colors={[THEME.PRIMARY.BACKGROUND_COLOR]} 
                refreshing={this.state.isRefreshing} 
                progressViewOffset={50}                
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
      );
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