import React, { Component, PureComponent } from "react"
import {  
  View,
  FlatList,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native'

import SearchViewerListElement from './SearchViewerListElement'
import { getHistoryListFromApi } from './SearchViewerListRequestTest'
import DIMENSION from '../INFO/DIMENSION'
import THEME from '../INFO/THEME'

import Fuse from 'fuse.js'
import uuidv1 from 'uuid/v1'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const fuse_options = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "nom"
  ]
};

class SearchViewerList extends Component {  
  _isMounted = false

  constructor(props) {    
    super(props);    
    this.state = {
      data: null,
      text: null,
    }        

    this.requestId = null
    this._data = null    
    
    this.launchResearhParam = this._launchResearhParam.bind(this)        
    this.fetchData = this._fetchData.bind(this)

    //console.log("SearckViewerList :: Constructor :: this.props.text :: " + props.text)    
  }   

  _launchResearhParam(research) {
    this.props.launchResearhParam(research)
  }

  _fetchData(callback) {    
    getCommentListFromApi(this.videoId, this.state.order, pageToken).then(callback)
  }

  componentDidMount() {
    this._isMounted = true
    this._data = getHistoryListFromApi() 
    console.log("SearckViewerList :: componentDidMount :: this.props.text :: " + this.props.text)    
  }

  componentDidUpdate() {
    const requestId = this.requestId = uuidv1()
    if(this.props.text && this.props.text != this.state.text) {
      let fuse = new Fuse(getHistoryListFromApi(), fuse_options)
      let data = fuse.search(this.props.text)

      if(this._isMounted && this.requestId === requestId) {
        this._data = data
        this.setState({data: this._data, text: this.props.text})
      }

      console.log("SearckViewerList :: componentDidUpdate :: this.props.text :: if :: " + this.props.text)  

    } else if (this.props.text === '' && this.props.text != this.state.text){      
      this._data = getHistoryListFromApi() 
      this.setState({data: this._data, text: this.props.text})

      console.log("SearckViewerList :: componentDidUpdate :: this.props.text :: else if :: " + this.props.text)    
    }
  }

  componentWillUnmount(){
    this._isMounted = false
  }

  render() {        
      return (        
        <View style={[ styles.main_container, { top: this.props.SearchViewerListIsDisplaying 
                                                  ? DIMENSION.MAX_HEADER_HEIGHT 
                                                  : Dimensions.get('window').height                                               
                                              }]}>
          <AnimatedFlatList      
            keyboardShouldPersistTaps={'handled'}      
            contentContainerStyle={styles.content_container}
            showsVerticalScrollIndicator={false}            
            data={this._data}                          
            renderItem={
              ({item}) => <SearchViewerListElement 
                data={item}  
                text={this.props.text}                              
                launchResearhParam={this.launchResearhParam}                       
              />
            }                  
            keyExtractor={(item,e) => e.toString()}            
            {...this.props}
          />
        </View>
      )    
  }
}

const styles = StyleSheet.create({
  main_container: {
    position: "absolute",
    backgroundColor: THEME.PRIMARY.COLOR,
    //top: DIMENSION.MAX_HEADER_HEIGHT,
    left: 0,
    height: Dimensions.get('window').height - DIMENSION.MAX_HEADER_HEIGHT,
    width: '100%',    
    zIndex: 999,    
  },
  content_container: {
    marginTop: 0
  },
})

export default SearchViewerList
