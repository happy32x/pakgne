import React from 'react'
import { View, Platform } from 'react-native'
import Header from './Header'
import BarStatus from './BarStatus'
import SweetTab from './SweetTab'
import News from './News'

export default class Main extends React.Component{
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={{ flex:1 }}>
         <Header />
         <News />
         { Platform.OS === 'android' ? <BarStatus color="#e17000"/> : null }
      </View>
    );
  }
}


