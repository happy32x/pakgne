import React, { Component } from 'react'
import { 
  View, 
  TouchableNativeFeedback, 
  StatusBar, 
  Platform,
  TextInput,
  StyleSheet,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import BarStatus from './BarStatus'
import InfiniteScrollView from '../../SandBox/_SandBox/InfiniteScrollView'
import THEME from '../INFO/THEME'

const DEFAULT_HEIGHT = 55
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
      cross_display: false,
      flex_text_input: FLEX_TEXT_INPUT_EMPTY, 
    }
  }

  changeText = (text) => {
    this.setState({text})
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

  render() {
    return (
      <View>
        <View style={styles.main_container}>
          <View style={styles.arrow_back_container}>
            <TouchableNativeFeedback 
              background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,true)}
              onPress={() => {
                this.props.navigation.goBack()
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
              value={this.state.text}
            />
          </View>
          {this.state.cross_display ? this.crossTextInput() : null}
        </View>

        <InfiniteScrollView/>

        { Platform.OS === 'android' ? <BarStatus color={THEME.PRIMARY.COLOR}/> : null }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: { 
    backgroundColor: THEME.PRIMARY.COLOR, 
    height: StatusBar.currentHeight + DEFAULT_HEIGHT, 
    flexDirection: 'row',
    paddingTop: StatusBar.currentHeight,
    marginTop: 0,
  },
  arrow_back_container: { 
    flex:2, 
    alignItems:'center', 
    justifyContent:'flex-start', 
    flexDirection:'row',
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
