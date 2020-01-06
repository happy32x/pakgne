import React, { Component } from 'react'
import {
  View,
  Text,
  FlatList,
  Animated,
  Clipboard,
  Dimensions,
  StyleSheet,
  ToastAndroid,
  ImageBackground,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from 'react-native'

import TransparentBar from '../TransparentBar'

import firebase from 'firebase'
import uuidv1 from 'uuid/v1'
import THEME from '../../INFO/THEME'
import { withNavigation } from 'react-navigation'

import { 
  getMessagesFromApi,
} from './API/REQUEST'

import Discussion from './Discussion'
import DiscussionLoading from './DiscussionLoading'
import DiscussionEmpty from './DiscussionEmpty'
import DiscussionPost from './DiscussionPost'
import MyDiscussion from './MyDiscussion'

import BounceUpAndDownStatic from '../../Animations/BounceUpAndDownStatic'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import DiscussionHeader from './DiscussionHeader'
import DiscussionHeaderSelected from './DiscussionHeaderSelected'

const WHATSAPP_DEFAULT_BACKGROUND_IMAGE = '../../assets/whatsAppBackgroundImage.png'
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const SCREEN_WIDTH = Dimensions.get("window").width
const SCREEN_WIDTH_MID = SCREEN_WIDTH/2

class DiscussionList extends Component {
  _isMounted = false

  constructor(props) {
    super(props)
    this.state = {
      scrollY: new Animated.Value(0),
      scaleGoToBottomButton: new Animated.Value(0),
      
      data: [4],//[],
      isEmpty: false,
      isLoading: true,
      isLoadingMore: false,
      stopLoadingMore: false,

      quoteAuthor: null,
      quote: null,
      autoShowKeyboard: null,

      selectedMode: false,
      multiSelected: false,
      lockDelete: false,
    }
    this.selectedElements = []
    this.selectedElementsDiscussion = []

    this.scaleGoToBottomButtonAllowTop = true
    this.scaleGoToBottomButtonAllowBottom = false

    this._data = [4]//[]
    this._dataAfter = ''

    this.requestId = null

    this.fetchData = this._fetchData.bind(this)    
    this.fetchMore = this._fetchMore.bind(this)

    this.navigateTo = this._navigateTo.bind(this)
    this.navigateBack = this._navigateBack.bind(this)

    this.addComment = this._addComment.bind(this)
    this.addQuote = this._addQuote.bind(this)
    this.delQuote = this._delQuote.bind(this)
    this.copyDiscussion = this._copyDiscussion.bind(this)
    this.deleteDiscussion = this._deleteDiscussion.bind(this)
    this.shareDiscussion = this._shareDiscussion.bind(this)    
  }

  _copyDiscussion() {
    //On recupère le texte à copier
    //this.selectedElements[0].
    Clipboard.setString('Bonjour le France ! Bonjour le France ! Bonjour le France !')
    ToastAndroid.show('Copié', ToastAndroid.SHORT)
    this.disableSelectedMode()
  }

  _deleteDiscussion() {
    for(let i=0; i<this.selectedElements.length; i++) {   
      this.selectedElements[i].deleteElement()
    }

    this.selectedElements = []
    this.setState({selectedMode: false, multiSelected: false})

    ToastAndroid.show('Supprimé', ToastAndroid.SHORT)    
  } 

  _shareDiscussion() {
    ToastAndroid.show('Partagé', ToastAndroid.SHORT)
    this.disableSelectedMode()
  }

  _addQuote(quoteAuthor, quote) {
    this.setState({quoteAuthor,quote, autoShowKeyboard: !this.state.autoShowKeyboard })
    this.disableSelectedMode()
  }

  _delQuote(quoteAuthor, quote) {
    this.setState({quoteAuthor,quote})
  }

  async _addComment (newDataComment) {
    //console.log("MERDE :: this._data[0].val().message :: " + this._data[0].val().message)
    await this._data.unshift(newDataComment)   
    console.log("MERDE :: this._data :: " + this._data)

    /*this._data.forEach((e) => {
      console.log(e)
    })*/
    
    console.log("MERDE :: this._data.length :: " + this._data.length) 
    console.log("MERDE :: this._data[0].val().message :: " + this._data[0].val().message)
    console.log("MERDE :: this._data[1].val().message :: " + this._data[1].val().message)
    this.setState({ data: this._data })
  }

  _navigateTo(destination, data) {
    this.props.navigation.navigate(destination, data)
  }

  _navigateBack() {
    this.props.navigation.goBack()
  }

  _fetchData(callback) {
    const pageToken = this._dataAfter !== '' ? this._dataAfter : ''   
    getMessagesFromApi(pageToken,this.props.chatKey).then(callback)
  }

  _fetchMore() {
    const requestId = this.requestId = uuidv1()

    this.fetchData(responseJson => {
      if(this._isMounted && this.requestId === requestId) {         

        this._data = this._data.concat(responseJson.items)
        this._dataAfter = responseJson.nextPageToken

        this.setState({
          data: this._data,
          isLoadingMore: false,
        })

        responseJson.nextPageToken===undefined
          ? this.setState({ stopLoadingMore: true })
          : null
      }
    })
  }

  componentDidMount() {   

    console.log("DiscussionList :: componentDidMount")
    this._isMounted = true

    this.setState({ 
      data: this._data,
      isLoading: false,
      stopLoadingMore: true,
    })

    /*this.fetchData(responseJson => {
      if(this._isMounted && this.state.isLoading) {
        //this._data = responseJson.items.filter(item => item.id.videoId !== undefined)

        this._data = responseJson.items
        this._dataAfter = responseJson.nextPageToken        
        
        console.log("DiscussionList :: responseJson.nextPageToken :: " + responseJson.nextPageToken)
        console.log("DiscussionList :: responseJson.items[0].key :: " + responseJson.items[0].key)
        console.log("DiscussionList :: responseJson.items.length :: " + responseJson.items.length)
        
        console.log('EN ATTENTE DE CHARGEMENT DE LA LISTE DES DISCUSSIONS ...')  

        responseJson.nextPageToken===undefined 
        ? this.setState({ 
            data: this._data,
            isLoading: false,
            stopLoadingMore: true,
          })
        : this.setState({ 
            data: this._data,
            isLoading: false,
          })
      }
    })*/
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  scaleGoToBottomButtonAnimation = (e) => {
    if(e.nativeEvent.contentOffset.y > SCREEN_WIDTH_MID && this.scaleGoToBottomButtonAllowTop) {
      console.log('TOP')
      this.scaleGoToBottomButtonAllowTop = false
      this.scaleGoToBottomButtonAllowBottom = true
      Animated.spring(this.state.scaleGoToBottomButton, {
        toValue: 1,
        useNativeDriver: true,
      }).start()
    } else if (e.nativeEvent.contentOffset.y <= SCREEN_WIDTH_MID && this.scaleGoToBottomButtonAllowBottom) {     
      console.log('BOTTOM')  
      this.scaleGoToBottomButtonAllowTop = true
      this.scaleGoToBottomButtonAllowBottom = false                         
      Animated.spring(this.state.scaleGoToBottomButton, {
        toValue: 0,    
        useNativeDriver: true,
      }).start()
    }
  }

  scrollBottom = () => {
    //this.scroll.scrollTo({x: 0, animated: true})
    this.scroll.getNode().scrollToOffset({ offset: 0, animated: true })
  }

  disableSelectedMode = () => {
    for(let i=0; i<this.selectedElements.length; i++) {
      this.selectedElements[i].setSelectedMode(false)
    }   
    this.selectedElements = []
    this.selectedElementsDiscussion = []
    this.setState({selectedMode: false, multiSelected: false, lockDelete: false})
  }

  enableSelectedMode = (element) => {
    if(element.state.discussionType === 'MyDiscussion') {
      this.selectedElements.push(element) 
      this.setState({selectedMode: true})      
    } else {
      this.selectedElements.push(element) 
      this.selectedElementsDiscussion.push(element)
      this.setState({selectedMode: true, lockDelete: true})
    }     
  }  

  setSelectedElements = (value, element) => {
    if(value) {
      this.selectedElements.push(element)
      element.state.discussionType === 'Discussion' 
        ? this.selectedElementsDiscussion.push(element) 
        : null
    } else {
      this.selectedElements.shift()
      element.state.discussionType === 'Discussion' 
        ? this.selectedElementsDiscussion.shift()
        : null
    }

    this.selectedElementsDiscussion.length
    ? this.selectedElements.length
      ? this.selectedElements.length > 1
        ? this.setState({multiSelected: true, lockDelete: true})
        : this.setState({multiSelected: false, lockDelete: true})              
      : this.disableSelectedMode(false)
    : this.selectedElements.length
      ? this.selectedElements.length > 1
        ? this.setState({multiSelected: true})
        : this.setState({multiSelected: false})              
      : this.disableSelectedMode(false)
  }

  onLongPress = (element) => {
    if(this.state.selectedMode === false) {
      element.setSelectedMode(true)
      this.enableSelectedMode(element)
    }
  }

  onPress = (element) => {
    if(this.state.selectedMode === true) {  
      element.state.selected 
        ? this.setSelectedElements(false, element) 
        : this.setSelectedElements(true, element)         
      element.setState({selected: !element.state.selected})       
    }
  }

  render() {

    console.log('CHIEN VERT !!!')
    return (
      <View style={{flex:1}}>     
        <DiscussionHeader
          //title={this.props.navigation.state.params.name}
          //type={this.props.navigation.state.params.type}
          //pic={this.props.navigation.state.params.pic}
          navigateBack={this.navigateBack}
          navigateTo={this.navigateTo}
        /> 
        <KeyboardAvoidingView 
          style={styles.main_container} 
          behavior="padding" 
          enabled={false}
          keyboardVerticalOffset={-50}
        >
          <ImageBackground
            source={require(WHATSAPP_DEFAULT_BACKGROUND_IMAGE)}
            style={{width: '100%', height: '100%'}}
          >
            {
              this.state.isLoading
                ? <DiscussionLoading color={THEME.PRIMARY.BACKGROUND_COLOR}/>
                : this.state.isEmpty
                  ? <DiscussionEmpty/>
                  : <View style={styles.listview_container}>                  
                      <AnimatedFlatList
                        ref={(lv) => {this.scroll = lv}}
                        inverted={true}
                        contentContainerStyle={styles.listview}
                        showsVerticalScrollIndicator={true}
                        keyboardShouldPersistTaps='always'
                        data={this.state.data}
                        renderItem={
                          ({item}) => {
                            return (
                            true//item.val().author_id === firebase.auth().currentUser.uid
                              ? <Discussion
                                  data={item}
                                  navigateTo={this.navigateTo}
                                  addQuote={this.addQuote}
                                  onLongPress={this.onLongPress}
                                  onPress={this.onPress}                                  
                                  //chatKey={this.props.chatKey}
                                />
                              : <Discussion
                                  data={item}
                                  navigateTo={this.navigateTo}
                                  addQuote={this.addQuote}
                                  onLongPress={this.onLongPress}
                                  onPress={this.onPress}
                                  //chatKey={this.props.chatKey}
                                />         
                              
                              /*<View style={{
                                  backgroundColor: '#f9bf8c',
                                  maxWidth: SCREEN_WIDTH-100,
                                  padding: 5,
                                  paddingHorizontal: 15,
                                  elevation: 1,
                                  alignSelf: 'center',
                                  borderRadius: 100,
                                }}>
                                  <Text>3 nouveaux messages</Text>
                                </View>*/
                          )}
                        }
                        ListFooterComponent={() => {
                          return (
                            this.state.isLoadingMore &&
                            <View style={styles.isloadingmore_container}>
                              <ActivityIndicator size="large" color={THEME.PRIMARY.BACKGROUND_COLOR} />
                            </View>
                          )
                        }}
                        //onEndReached={ !this.state.stopLoadingMore && !this.state.isLoadingMore ? () => this.setState({ isLoadingMore: true }, () => this.fetchMore()) : null }
                        keyExtractor={(item,e) => e.toString()}
                        //onEndReachedThreshold={.5}
                        //{...this.props}

                        onScroll={
                          Animated.event(
                            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                            {
                              useNativeDriver: true,
                              listener: event => {
                                //console.log(event.nativeEvent.contentOffset.y)                          
                                this.scaleGoToBottomButtonAnimation(event)                
                              },
                            },
                          )
                        }
                      />

                      <Animated.View style={{
                        position: 'absolute',
                        right: 10,
                        bottom: 10,
                        opacity: 0.9,
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: [{scale: this.state.scaleGoToBottomButton}],
                      }}>              
                        <TouchableNativeFeedback
                          background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR, true)}
                          onPress={() => {
                            console.log("quote touch !")
                            this.scrollBottom()
                          }}
                        >  
                          <View style={{
                            width: 32,
                            height: 32,
                            borderRadius: 16,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: THEME.PRIMARY.COLOR,                          
                          }}>
                            <IconFontAwesome
                              name="angle-double-down"
                              style={{
                                color: THEME.TERTIARY.COLOR,
                                fontSize: 21,
                              }}
                            />                          
                          </View>
                        </TouchableNativeFeedback>                                  
                      </Animated.View>                  

                    </View>
            }          

            <DiscussionPost 
              addComment={this.addComment}                                                          
              autoFocus={false}
              quoteAuthor={this.state.quoteAuthor}
              quote={this.state.quote}
              delQuote={this.delQuote}
              autoShowKeyboard={this.state.autoShowKeyboard}
            />
          </ImageBackground>
        </KeyboardAvoidingView>
        <TransparentBar />
        {
          this.state.selectedMode
          ? <DiscussionHeaderSelected
              disableSelectedMode={this.disableSelectedMode}
              addQuote={this.addQuote}
              copyDiscussion={this.copyDiscussion}
              deleteDiscussion={this.deleteDiscussion}
              shareDiscussion={this.shareDiscussion}
              multiSelected={this.state.multiSelected}
              lockDelete={this.state.lockDelete}
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
    backgroundColor: 'transparent',//THEME.PRIMARY.COLOR,
  },
  listview_container: {
    flex: 1,
    //backgroundColor: 'blue',
  },
  listview: {
    backgroundColor: 'transparent',//THEME.PRIMARY.COLOR,  
    paddingTop: 0,
    paddingBottom: 0, 
  },
  isloadingmore_container: { 
    flex: 1,
    padding: 10
  }
})

export default withNavigation (DiscussionList)

