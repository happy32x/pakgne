import React, { Component } from 'react'
import {
  View,
  Platform,
  Keyboard,
  TextInput,
  StatusBar,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import BarStatus from './BarStatus'
import VideoListMini from './VideoListMini'
import DIMENSION from '../INFO/DIMENSION'
import THEME from '../INFO/THEME'
import SearchViewerList from './SearchViewerList'

import {
  getSearchListHistory,
  addTextInSearchListHistory,
} from '../Store/storeData'

const FLEX_TEXT_INPUT_EMPTY = 12
const FLEX_TEXT_INPUT_FILLED = 10

class SearchViewer extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this.state = {
      text: '',
      searchText: '',
      cross_display: false,
      flex_text_input: FLEX_TEXT_INPUT_EMPTY,
      SearchViewerListIsDisplaying: true,
      VideoListMiniIsDisplaying: false,
      
      searchList: [],
    }      
    this.searchListHistory = []
    this.index = this.props.navigation.getParam('searchId', 0)
    //console.log("searchViewer :: " + this.index)

    this.launchResearhParam = this._launchResearhParam.bind(this)    
    this.launchResearh = this._launchResearh.bind(this)  

    this.navigateBack = this._navigateBack.bind(this)
  }

  _navigateBack() {    
    if ( this.state.SearchViewerListIsDisplaying && !this.state.VideoListMiniIsDisplaying || 
        !this.state.SearchViewerListIsDisplaying && this.state.VideoListMiniIsDisplaying ) {
      this.props.navigation.goBack()        
    } else {
      Keyboard.dismiss()
      this.setState({SearchViewerListIsDisplaying: false})
    }    
  }

  _launchResearhParam(research) {
    console.log("SearchViewer :: _launchResearhParam :: research :: " + research)    
    this.text_input.setNativeProps({text: research})

    this.setState({text: research, searchText: research, SearchViewerListIsDisplaying: false, VideoListMiniIsDisplaying: true}, 
      () => console.log("SearchViewer :: _launchResearhParam :: research : " + research))   
  }

  _launchResearh() {

    if ( this.searchListHistory.length === 0 || this.searchListHistory.findIndex(item => item.text === this.state.text) !== -1  ) {                  
      this.searchListHistory.unshift({text:this.state.text})      
      addTextInSearchListHistory(this.searchListHistory).then(() => {
        console.log('SearchViewer :: _launchResearh :: addTextInSearchListHistory :: searchList successful saved !')          
      })
      this.setState({searchList: this.searchListHistory})
    }

    this.setState({
      searchText: this.state.text,
      SearchViewerListIsDisplaying: false,
      VideoListMiniIsDisplaying: true,
    }, () => console.log('SearchViewer :: searchtext :: ' + this.state.text))
  }

  changeText = (text) => {
    this.setState({text}, () => console.log('SearchViewer :: text :: ' + this.state.text))
    if(text !== '' && this.state.cross_display === false)
      this.setState({cross_display: true, flex_text_input: FLEX_TEXT_INPUT_FILLED})
    else if(text === '' && this.state.cross_display === true)
      this.setState({cross_display: false, flex_text_input: FLEX_TEXT_INPUT_EMPTY})
  }

  crossTextInput = () => {
    return (
      <View style={styles.crossTextInput_container}>
        <TouchableNativeFeedback 
          background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,true)}
          onPress={() => {
            this.text_input.focus()
            this.setState({text: '', cross_display: false, flex_text_input: FLEX_TEXT_INPUT_EMPTY})
          }}
        >
          <View style={styles.crossTextInput_container_one}>
            <IconMaterialCommunityIcons style={styles.crossTextInput} name="close" />
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }

  componentDidMount() {
    getSearchListHistory().then(result => {
      const res = result//[{text:'league of legend'},{text:'dota 2'},{text:'Heroes of the storm'}]
      if(res) {
        this.searchListHistory = res   
        this.setState({searchList: res})
      }      
    })
  }

  render() {
    return (
      <View style={styles.super_container}>
        <View style={styles.main_container}>
          <View style={styles.arrow_back_container}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple(THEME.PRIMARY.WAVE_COLOR_PRIMARY,true)}
              onPress={() => {
                this.navigateBack()
              }}
            >
              <View style={styles.arrow_back_container_one} >
                <Icon style={styles.arrow_back} name="md-arrow-back" />
              </View>
            </TouchableNativeFeedback>
          </View>

          <View style={[styles.text_input_container, {flex: this.state.flex_text_input}]}>
            <TextInput
              ref={x => this.text_input = x}
              style={styles.text_input}
              placeholder="Rechercher ..."
              selectionColor={THEME.PRIMARY.BACKGROUND_COLOR}
              autoFocus={true}
              underlineColorAndroid="transparent"
              autoCorrect={false}
              autoCapitalize={'none'}
              keyboardType={'web-search'}
              returnKeyType={'search'}
              onChangeText={this.changeText}
              onSubmitEditing={() => this.launchResearh()}
              onFocus={() => this.setState({SearchViewerListIsDisplaying: true,
                                            cross_display: true,
                                            flex_text_input: FLEX_TEXT_INPUT_FILLED
                                          })}
              value={this.state.text}
            />
          </View>
          {this.state.cross_display ? this.crossTextInput() : null}
        </View>        
        
        <VideoListMini searchText={this.state.searchText} />

        {/*
          this.state.SearchViewerListIsDisplaying
          ? <SearchViewerList
              launchResearhParam={this.launchResearhParam}
              searchText={this.state.searchText}
            />
          : null
        */}

        <SearchViewerList
          launchResearhParam={this.launchResearhParam}
          text={this.state.text}
          SearchViewerListIsDisplaying={this.state.SearchViewerListIsDisplaying}
          searchList={this.state.searchList}
        />

        { Platform.OS === 'android' ? <BarStatus color={THEME.PRIMARY.COLOR}/> : null }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  super_container: { 
    flex: 1,
  },
  main_container: { 
    backgroundColor: THEME.PRIMARY.COLOR, 
    height: DIMENSION.MAX_HEADER_HEIGHT, 
    flexDirection: 'row',
    paddingTop: StatusBar.currentHeight,
    marginTop: 0,
  },
  arrow_back_container: { 
    flex:2, 
    flexDirection:'row',
    alignItems:'center', 
    justifyContent:'flex-start',     
  },
  arrow_back_container_one: {
    width: 50, 
    height: 60, 
    alignItems:'center', 
    justifyContent:'center', 
    flexDirection:'row'
  },
  arrow_back: {
    fontWeight:'bold', 
    fontFamily:'normal', 
    color: THEME.PRIMARY.BACKGROUND_COLOR, 
    fontSize:25 
  },
  text_input_container: { 
    alignItems:'center', 
    justifyContent:'flex-start', 
    flexDirection:'row',
  },
  text_input: {
    height: '100%', 
    width: '100%', 
    fontSize: 18,
  },
  crossTextInput_container: { 
    flex:2, 
    alignItems:'center', 
    justifyContent:'flex-start', 
    flexDirection:'row', 
  },
  crossTextInput_container_one: {
    width: 50, 
    height: 60, 
    alignItems:'center', 
    justifyContent:'center', 
    flexDirection:'row',
  },
  crossTextInput: {
    fontWeight:'bold',
    fontFamily:'normal',
    color: THEME.PRIMARY.BACKGROUND_COLOR, 
    fontSize:25 
  },
})

export default SearchViewer
