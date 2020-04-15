import React, { Component, PureComponent } from 'react'
import {  
  View,
  Text,
  FlatList,
  Animated,
  StyleSheet,
  Dimensions,
  RefreshControl,
  ActivityIndicator,  
  TouchableNativeFeedback,
} from 'react-native'

import uuidv1 from 'uuid/v1'

import Video from './Video'
import { shuffleArray } from '../AI/Randomizer'
import {
  getVideoListFromApi,
  getOneCommentFromApi,
} from '../API/REQUEST'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import DIMENSION from '../INFO/DIMENSION'
import HeaderContentIndicator from './HeaderContentIndicator'
import THEME from '../INFO/THEME'

import BounceUpAndDownStatic from '../Animations/BounceUpAndDownStatic'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import NewVideoPopUp from './NewVideoPopUp'
import VideoListOrder from './VideoListOrder'
import VideoListRefresh from './VideoListRefresh'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

class VideoList extends Component {
  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {
      updateVideoList: false,
      isLoading: true,
      isDisconnected: false,
      isLoadingMore: false,
      isRefreshing: false,
      stopLoadingMore: false,
      isEmpty: true,
    }

    this.requestId = null

    this._data = null
    this._dataAfter = ''

    this.toggleFavorite = this._toggleFavorite.bind(this)
    this.recoverFavorite = this._recoverFavorite.bind(this)
    this.isFavorite = this._isFavorite.bind(this)
    this.navigateTo = this._navigateTo.bind(this)    

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

  _fetchData(callback) {
    const pageToken = this._dataAfter !== '' ? `&pageToken=${this._dataAfter}` : '' 
    getVideoListFromApi(this.props.order, pageToken).then(callback)
  }

  _fetchMore() {
    return
    const requestId = this.requestId = uuidv1()

    this.fetchData(responseJson => {
      if(this._isMounted && this.requestId === requestId) {  
                        
        const data = this.props.random === 'true'
                     ? shuffleArray(responseJson.items.filter(item => item.id.videoId !== undefined))
                     : responseJson.items.filter(item => item.id.videoId !== undefined) 

        this._data = this._data.concat(data) //FOR TEST ONLY          
        this._dataAfter = responseJson.nextPageToken

        console.log("VideoList :: dataLength :: " + data.length)
        
        //this.async_getOneCommentFromApiMore(data).then( () => {
          this.setState({ isLoadingMore: false })

          responseJson.nextPageToken===undefined
            ? this.setState({ stopLoadingMore: true })
            : null
        //})
        
      }
    })
  }

  _fetchRefresh() {
    this.dataAfter = ''
    const requestId = this.requestId = uuidv1()

    this.fetchData(responseJson => {
      //if(this._isMounted && this.requestId === requestId && this.props.updateVideoList !== false && this.props.updateVideoList === this.state.updateVideoList) {
      if(this._isMounted && this.requestId === requestId) {

        if(responseJson.items===undefined) {
          this.setState({ isEmpty: true, isLoading: false }) 
        } else { 
          const data = this.props.random === 'true'
                     ? shuffleArray(responseJson.items.filter(item => item.id.videoId !== undefined))
                     : responseJson.items.filter(item => item.id.videoId !== undefined)  

          this._data = data //FOR TEST ONLY
          this._dataAfter = responseJson.nextPageToken

          console.log("VideoList :: dataLength :: " + data.length)

          //this.async_getOneCommentFromApi(data).then( () => {
            this.setState({
              isLoading: false,
              isLoadingMore: false,
              isRefreshing: false,
              isEmpty: false,
            })

            responseJson.nextPageToken===undefined 
              ? this.setState({ stopLoadingMore: true })  
              : this.setState({ stopLoadingMore: false })

            //On vérifie pour raison de sécurité si this.requestId à été modifié
            /*this.requestId === requestId 
              ? this.setState({ isLoading: false })
              : this.setState({ isLoading: true })*/
          //})
        }

      }            
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

          const data = this.props.random === 'true'
                     ? shuffleArray(responseJson.items.filter(item => item.id.videoId !== undefined))
                     : responseJson.items.filter(item => item.id.videoId !== undefined)  
          
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

 async async_getOneCommentFromApiMore(data) {

  for(let i=0; i<data.length; i++) {                      
    await getOneCommentFromApi(data[i].id.videoId, this.props.order).then(responseJsonOneComment => {              
      data[i].oneComment = responseJsonOneComment.items   
      if(!this._isMounted) return
    })
  }

  this._data = this._data.concat(data)
}

  //on complete les elements du tableau avec chacun un commentaire
  async async_getOneCommentFromApi(data) {
    for(let i=0; i<data.length; i++) {                      
      await getOneCommentFromApi(data[i].id.videoId, this.props.order).then(responseJsonOneComment => {   
        console.log(i)
        data[i].oneComment = responseJsonOneComment.items   
        if(!this._isMounted) return
      })
    }

    this._data = data
  }

  componentDidMount() {
    console.log("VideoList :: componentDidMount")
    this._isMounted = true

    this.fetchData(responseJson => {
    
      /*{"error":{"code":-1,"message":"A network error occurred, and the request could not be completed."}}*/
      /*if(responseJson.error && responseJson.error.code && responseJson.error.code === -1){
        //Aucune connexion internet
        this.setState({
          isDisconnected: true,
          isLoading: false,
        })
      }
      else { */
      
      if(responseJson.items===undefined) {
        this.setState({ isEmpty: true, isLoading: false }) 
      } else { 
        if(this._isMounted) {          
          const data = this.props.random === 'true'
                      ? shuffleArray(responseJson.items.filter(item => item.id.videoId !== undefined))
                      : responseJson.items.filter(item => item.id.videoId !== undefined)  
          this._data = data //FOR TEST ONLY
          this._dataAfter = responseJson.nextPageToken              

          console.log("VideoList :: dataLength :: " + data.length)            

          //this.async_getOneCommentFromApi(data).then( () => {
            console.log('EN ATTENTE DE CHARGEMENT DE LA LISTE DES VIDEOS ...')           
            this.setState({ 
              isLoading: false,
              isEmpty: false, 
            })

            responseJson.nextPageToken===undefined 
              ? this.setState({ stopLoadingMore: true }) //pourquoi ici on n'ajoute pas "this.setState({ isLoading: false })"
              : null   
          //})
        }      
      }
    })
  }

  componentDidUpdate(prevProps) {
    /*console.log('VideoList :: componentDidUpdate')  
    console.log('VideoList :: this.props.updateVideoList :: ' + this.props.updateVideoList)  
    console.log('VideoList :: this.props.updateVideoListToggle :: ' + this.props.updateVideoListToggle)  
    console.log('VideoList :: prevProps.updateVideoListToggle :: ' + prevProps.updateVideoListToggle)  */

    //On appui sur VIDEO une deuxième fois
    //(this.props.updateVideoListToggle !== prevProps.updateVideoListToggle) //Ceci à été ajouter pour éviter la boucle infini lors du re-rendu
    //Car quand "componentDidUpdate" fini de s'executer, on passe par "shouldComponentUpdate" puis "render" pour revenir à "componentDidUpdate",
    //ainsi (this.props.updateVideoListToggle !== prevProps.updateVideoListToggle) empêche donc un rendu supplémentaire
    if(this.props.updateVideoList && (this.props.updateVideoListToggle !== prevProps.updateVideoListToggle) ) {              
      this._dataAfter = ''
      this.setState({ isRefreshing: true, isLoading: true, isLoadingMore: false }, () => this.fetchRefresh())      
    }
  }  

  shouldComponentUpdate(nextProps, nextState) {
    /*console.log('VideoList :: shouldComponentUpdate') 
    console.log('VideoList :: nextProps.scrollTopVideoList :: ' + nextProps.scrollTopVideoList) */

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
    return (
      this.state.isLoading
      ? <View style={styles.isloading_container}>
          <ActivityIndicator size="large" color={THEME.PRIMARY.BACKGROUND_COLOR}/>
        </View>
      : this.state.isDisconnected
        ? <VideoListRefresh updateForNewVideo={this.props.updateForNewVideo} />
        : this.state.isEmpty
          ? <View style={styles.isempty_container}>   
              <IconMaterialCommunityIcons style={styles.isempty_icon} name="video-off-outline" />              
              <Text style={styles.isempty_text}>Aucune video</Text>     
              {
                this.props.newVideo
                ? <NewVideoPopUp
                    closeNewVideoPopUp={this.props.closeNewVideoPopUp}
                    updateForNewVideo={this.props.updateForNewVideo}
                  />
                : null
              }  
            </View>
          : <View style={styles.main_container}>
              <AnimatedFlatList
                ref={(lv) => {this.scroll = lv}}
                contentContainerStyle={styles.content_container}
                showsVerticalScrollIndicator={false}
                data={this._data}
                ListHeaderComponent={() => <HeaderContentIndicator type="MaterialCommunityIcons" icon="movie" color={THEME.PRIMARY.BACKGROUND_COLOR} backgroundColor={THEME.PRIMARY.COLOR} />}
                renderItem={
                  ({item, index}) => <Video
                    firstData={item}
                    toggleFavorite={this.toggleFavorite}
                    recoverFavorite={this.recoverFavorite}
                    isFavorite={this.isFavorite}
                    navigateTo={this.navigateTo}
                    id={index}
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
                      this.props.updateForNewVideo()
                    }}
                  />
                }
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={.1}
                {...this.props}
              />

              <VideoListOrder            
                updateVideoListOrder={this.props.updateVideoListOrder} 
              />

              {
                this.props.newVideo
                ? <NewVideoPopUp
                    closeNewVideoPopUp={this.props.closeNewVideoPopUp}
                    updateForNewVideo={this.props.updateForNewVideo}
                  />
                : null
              }

            </View>
    )   
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
    padding: 10,
  },
  isempty_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.PRIMARY.COLOR,
  },
  isempty_icon:{
    fontSize: 70,
    color: THEME.TERTIARY.COLOR,
    //transform: [{ translateY: DIMENSION.NAVBAR_HEIGHT }],
  },
  isempty_text: {
    color: THEME.TERTIARY.COLOR,
    //transform: [{ translateY: DIMENSION.NAVBAR_HEIGHT }],
  },
})

const mapStateToProps = (state) => {
  return {
    favoritesVideo: state.toggleFavorite.favoritesVideo,
    currentUser: state.UserInfoReducer.currentUser,
  }
}

export default withNavigation( connect(mapStateToProps)(VideoList) )