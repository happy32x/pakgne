import React, { Component, PureComponent } from "react"
import {  
  View,
  FlatList,
  Animated,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native"

import uuidv1 from 'uuid/v1'

import EmptySearch from './EmptySearch'
import VideoMini from './VideoMini'
import { getVideoListMiniFromApi } from '../API/REQUEST'
import { withNavigation } from 'react-navigation'
import THEME from '../INFO/THEME'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

class VideoListMini extends PureComponent {
  _isMounted = false

  constructor(props) {
    super(props)    
    this.state = {
      searchText: undefined,
      isLoading: true,
      isLoadingMore: false,
      isRefreshing: false,  
      stopLoadingMore: false,
      isEmpty: false,    
    }

    this.requestId = null
    this.keyWord = null

    this._data = null
    this._dataAfter = ''
    this.navigateTo = this._navigateTo.bind(this)

    this.fetchMore = this._fetchMore.bind(this)
    this.fetchData = this._fetchData.bind(this)
    this.fetchRefresh = this._fetchRefresh.bind(this)
  }

  _navigateTo(destination, data) {
    this.props.navigation.navigate(destination, data)
  }

  _fetchData(callback) {  
    const pageToken = this._dataAfter !== '' ? `&pageToken=${this._dataAfter}` : ''
    getVideoListMiniFromApi(this.keyWord, pageToken).then(callback)
  }
  
  _fetchMore() {
    const requestId = this.requestId = uuidv1()

    this.fetchData(responseJson => {
      if(this._isMounted && this.requestId === requestId) {       
        const data = this._data.concat(responseJson.items.filter(item => item.id.videoId !== undefined))     
        //console.log("dataLength : " + data.length)

        this._data = data
        this._dataAfter = responseJson.nextPageToken

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

    this.fetchData(responseJson => {
      if(this._isMounted && this.requestId === requestId && this.props.searchText !== '' && this.props.searchText === this.state.searchText) {
        const data = responseJson.items.filter(item => item.id.videoId !== undefined)
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
        this.requestId === requestId 
          ? this.setState({ isLoading: false })
          : this.setState({ isLoading: true })
      }            
    })
  }

  componentDidMount() {
    this._isMounted = true 
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchText !== '' && this.props.searchText !== this.state.searchText) {
      
      this._dataAfter = ''
      this.keyWord = this.props.searchText
      const requestId = this.requestId = uuidv1()
      console.log('didupdate')

      this.fetchData(responseJson => {
        console.log('in')
        console.log("responseJson.items.length : " + JSON.stringify(responseJson.items.length))
        /*console.log("responseJson : " + JSON.stringify(responseJson))
        console.log("_isMounted : " + this._isMounted)
        console.log("this._requestId : " + this.requestId)
        console.log("requestId : " + requestId)
        console.log("this.props.searchText : " + this.props.searchText)*/
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

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    {console.log("yes")}
    if (this.props.searchText === '') {
      {console.log(this.props.searchText + " === " + this.state.searchText)}      
      return <EmptySearch />
    } else if ( (this.props.searchText !== '' && this.props.searchText !== this.state.searchText) || this.isLoading) {
      return (
        <KeyboardAvoidingView style={styles.isloading_container} behavior="padding" enabled>
          <ActivityIndicator size="large" color={THEME.PRIMARY.BACKGROUND_COLOR}/>
        </KeyboardAvoidingView>
      )
    } else if (this.state.isEmpty) {
      return <EmptySearch />
    } else {
      return (        
        <View style={styles.main_container}>
          <AnimatedFlatList
            ref={(lv) => {this.scroll = lv}}
            contentContainerStyle={styles.content_container}
            showsVerticalScrollIndicator={true}            
            data={this._data}           
            renderItem={
              ({item}) => <VideoMini
                firstData={item}                            
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
                progressViewOffset={0}
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
  },
  content_container: {
    marginTop: 0
  },
  isloading_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.PRIMARY.COLOR,
  },
  isloadingmore_container: { 
    flex: 1, 
    padding: 10 
  }
})

export default withNavigation(VideoListMini)
