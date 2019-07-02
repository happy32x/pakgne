import React, { Component, PureComponent } from "react"
import {  
  View,
  FlatList,
  Animated,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,     
} from "react-native"

import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import DIMENSION from '../INFO/DIMENSION'
import EmptyDynamic from './EmptyDynamic'
import THEME from '../INFO/THEME'
import Favorite from './Favorite'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

class FavoriteList extends Component {
  _isMounted = false

  constructor(props) {
    super(props);    
    this.state = {      
      isLoading: true,                  
    }    

    this.toggleFavorite = this._toggleFavorite.bind(this)
    this.isFavorite = this._isFavorite.bind(this)
    this.navigateTo = this._navigateTo.bind(this)    
  }

  _toggleFavorite(firstData, secondData) {
    const action = { type: "TOGGLE_FAVORITE", value: [firstData,secondData] }
    this.props.dispatch(action)    
  }  

  _isFavorite(firstData) {
    return this.props.favoritesVideo.findIndex(item => item[0].id.videoId === firstData.id.videoId)
  }

  _navigateTo(destination, data) {
    this.props.navigation.navigate(destination, data)
  }

  componentDidMount() {    
    this._isMounted = true
    if(this._isMounted) {                                                   
      this.setState({ isLoading: false })
    }               
  }   

  componentWillUnmount() {
    this._isMounted = false
  }
  
  render() {    
    if (this.state.isLoading) {
      return (
        <View style={styles.isloading_container}> 
          <ActivityIndicator size="large" color={THEME.PRIMARY.BACKGROUND_COLOR}/>
        </View>
      )
    } else if (this.props.favoritesVideo == '') {
      return (
        <EmptyDynamic type={'Ionicons'} icon={'md-star'} color={THEME.TERTIARY.COLOR} message={"Aucun favori"} />   
      )         
    } else {
      return (        
        <View style={styles.main_container}>
          <AnimatedFlatList
            ref={(lv) => {this.scroll = lv}}
            contentContainerStyle={styles.content_container}
            showsVerticalScrollIndicator={false}            
            data={this.props.favoritesVideo}              
            renderItem={
              ({item}) => <Favorite
                data={item}                
                toggleFavorite={this.toggleFavorite}     
                isFavorite={this.isFavorite}                         
                navigateTo={this.navigateTo}          
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

export default withNavigation( connect(mapStateToProps)(FavoriteList) )