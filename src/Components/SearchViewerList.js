import React, { Component, PureComponent } from "react"
import {  
  View,
  FlatList,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native'

import SearchViewerListElement from './SearchViewerListElement'

import DIMENSION from '../INFO/DIMENSION'
import THEME from '../INFO/THEME'

import Fuse from 'fuse.js'
import uuidv1 from 'uuid/v1'

/*import { 
  getSearchListHistory 
} from './SearchViewerListRequestTest'*/

import {
  getSearchListHistory,
} from '../Store/storeData'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const fuse_options = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "text"
  ]
}

class SearchViewerList extends Component {  
  _isMounted = false

  constructor(props) {    
    super(props);    
    this.state = {
      data: [],
      text: null,
    }        
    
    this.requestId = null
    this._data = []

    this.launchResearhParam = this._launchResearhParam.bind(this)             
  }   

  _launchResearhParam(research) {
    this.props.launchResearhParam(research)
  }

  componentDidMount() {
    this._isMounted = true     
    this._data = this.props.searchList

    console.log("SearchViewerList :: componentDidMount :: this.props.text :: " + this.props.text)    
  }

  componentDidUpdate() {
    const requestId = this.requestId = uuidv1()
    if(this.props.text && this.props.text != this.state.text) {
      if(this.props.searchList !== null) {
        let fuse = new Fuse(this.props.searchList, fuse_options)
        let data = fuse.search(this.props.text)

        if(this._isMounted && this.requestId === requestId) {
          this._data = data
          this.setState({data: this._data, text: this.props.text})
        }

        console.log("SearckViewerList :: componentDidUpdate :: this.props.text :: if :: " + this.props.text)  
      }
    } else if (this.props.text === '' && this.props.text != this.state.text) {      
      this._data = this.props.searchList 
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
