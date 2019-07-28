import React, { Component, PureComponent } from "react"
import {  
  View,
  FlatList,
  Animated,
  StyleSheet,
  ActivityIndicator,   
} from 'react-native'

import ChatListElement from './ChatListElement'
import { getDiscussionListFromApi } from './API/REQUEST' //Requête qui sera utilisée pour récupérer la liste des discussions
import { withNavigation } from 'react-navigation'
import DIMENSION from '../../INFO/DIMENSION'
import THEME from '../../INFO/THEME'
import HeaderContentIndicator from '../HeaderContentIndicator'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

class ChatList extends Component {
  _isMounted = false  

  constructor(props) {    
    super(props);    
    this.state = {
      updateVideoList: false,
      isLoading: true,  
    }

    this._data = null
    //this._dataAfter = ''

    this.navigateTo = this._navigateTo.bind(this)
  }  

  _navigateTo(destination, data) {
    this.props.navigation.navigate(destination, data)
  }

  /*_fetchData(callback) {
    const pageToken = this._dataAfter !== '' ? `&pageToken=${this._dataAfter}` : ''
    //getVideoListFromApi(this.videoListOrder[0], pageToken).then(callback)
    getVideoListFromApi('date', pageToken).then(callback)
  }*/

  componentDidMount() {    
    this._isMounted = true          
  }  

  componentDidUpdate(prevProps) {   
    if(this._isMounted && this.state.isLoading) {      
      const data = getDiscussionListFromApi() //On récupère donc le tableau JSON des discussions           
      this._data = data,      
      this.setState({ isLoading: false })   
    }      
  }  

  shouldComponentUpdate(nextProps, nextState) {    
    if(nextProps.index == 1) {
      if(this.state.isLoading /*|| nextState.isLoading*/) return true
      
      if(nextProps.scrollTopChatList && nextProps.index == 1 && nextProps.indexOLD == 1) {   
        this.scrollTopChatList = nextProps.scrollTopChatList
        this.scrollTop()
        return false
      }      
    
      return true
    }        

    return false
  }

  componentWillUnmount() {
    this._isMounted = false    
  }

  //Déclenché depuis l'onglet TALK de RootTab
  scrollTop = () => {    
    this.scroll.getNode().scrollToOffset({ offset: 0, animated: true });
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
          <AnimatedFlatList
            ref={(lv) => {this.scroll = lv}}
            contentContainerStyle={styles.content_container}
            showsVerticalScrollIndicator={false}            
            data={this._data}              
            ListHeaderComponent={() => <HeaderContentIndicator type="Octicons" icon="comment-discussion" color={THEME.PRIMARY.BACKGROUND_COLOR} backgroundColor={THEME.PRIMARY.COLOR} />}            
            renderItem={
              ({item}) => <ChatListElement 
                data={item}                                
                navigateTo={this.navigateTo}          
              />
            }      
     
            keyExtractor={(item,e) => e.toString()}            
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
  render_separator: {
    height: 1,
    width: "80%",
    backgroundColor: THEME.TERTIARY.SEPARATOR_COLOR,
    marginLeft: "20%"
  },
})

export default withNavigation( ChatList )