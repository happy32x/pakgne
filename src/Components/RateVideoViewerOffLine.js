import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  TouchableNativeFeedback,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import IconFoundation from 'react-native-vector-icons/Foundation'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import BounceUpAndDownStatic from '../Animations/BounceUpAndDownStatic'
import likeConverter from '../Helpers/likeConverter'
import THEME from '../INFO/THEME'

const SCALE = .5
const TENSION = 100

const LIKE = 'like'
const DISLIKE = 'dislike'

class RateVideoViewerOffLine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      like: this.props.like ? this.props.like : 0,
      dislike: this.props.dislike ? this.props.dislike : 0,
      color_like: THEME.TERTIARY.COLOR,
      color_dislike: THEME.TERTIARY.COLOR,
    }

    this.rating = 'none',

    this.toggle_like = false,
    this.toggle_dislike = false,

    this.single_rate = this._single_rate.bind(this)
    this.infinite_rate = this._infinite_rate.bind(this)
  }

  _single_rate(rating) {
    if( rating === LIKE ) {
      color_like = THEME.PRIMARY.BACKGROUND_COLOR
      this.toggle_like = true     
    } else {
      color_like = THEME.TERTIARY.COLOR
      this.toggle_like = false      
    }

    if( rating === DISLIKE ) {
      color_dislike = THEME.PRIMARY.BACKGROUND_COLOR
      this.toggle_dislike = true       
    } else {
      color_dislike = THEME.TERTIARY.COLOR
      this.toggle_dislike = false
    }

    this.setState({
      color_like,
      color_dislike,
    })
  }

  _infinite_rate(rating) {
    let {like,dislike,color_like,color_dislike} = this.state

    const _like = like
    const _dislike = dislike
    const _color_like = color_like
    const _color_dislike = color_dislike

    if( rating === LIKE && this.toggle_like === false ) {
      like++
      color_like = THEME.PRIMARY.BACKGROUND_COLOR 
      this.toggle_like = true
    } else {
      if(this.toggle_like === true) {
        like--
        like<0?0:like
      }      
      color_like = THEME.TERTIARY.COLOR
      this.toggle_like = false
    }
    
    if( rating === DISLIKE && this.toggle_dislike === false ) {
      dislike++
      color_dislike = THEME.PRIMARY.BACKGROUND_COLOR
      this.toggle_dislike = true       
    } else {
      if(this.toggle_dislike === true) {
        dislike--
        dislike<0?0:dislike
      }      
      color_dislike = THEME.TERTIARY.COLOR
      this.toggle_dislike = false      
    }

    console.log(like)
    console.log(color_like)
    console.log(this.toggle_like)

    console.log(' ')

    console.log(dislike)
    console.log(color_dislike)
    console.log(this.toggle_dislike)

    this.setState({
      like,
      dislike,
      color_like,
      color_dislike,
    })

    //Après le setState, (cad au callback), on lance la requete avec "rate"
    //Pour mettre à jour le "rating"

    //Si la requête se passe bien, le processus fini bien
    //Sinon on refait un setState avec les anciennes valeurs

    /*
      this.setState({
        like: _like,
        dislike: _dislike,
        color_like: _color_like,
        color_dislike: _color_dislike,
      })
    */
  }

  componentDidMount() {
    //On lance la requete avec "getRating"
    //Pour récupérer le "rating" de l'utilisateur
    let rating = 'none'

    //Ensuite on évalue le rating [like or dislike or none or unspecified]
    this.single_rate(rating)
  }

  render() {
    return (

      <View style={styles.option_area_macro}>

        {/*<BounceUpAndDownStatic scale={SCALE} tension={TENSION} style={styles.option_area_mini}
          onPress={() => this.infinite_rate(LIKE)}
        >
          <IconFoundation style={[styles.option_area_icon, {color: this.state.color_like} ]} name="like" />
          <Text style={[styles.option_area_text, {color: this.state.color_like} ]}>{this.state.like}</Text>
        </BounceUpAndDownStatic>   

        <BounceUpAndDownStatic scale={SCALE} tension={TENSION} style={styles.option_area_mini}
          onPress={() => this.infinite_rate(DISLIKE)}
        >
          <IconFoundation style={[styles.option_area_icon, {color: this.state.color_dislike} ]} name="dislike" />
          <Text style={[styles.option_area_text, {color: this.state.color_dislike} ]}>{this.state.dislike}</Text>
        </BounceUpAndDownStatic>*/}              

        <TouchableNativeFeedback 
          background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,true)}                    
          onPress={() => {            
            !this.toggle_like ? ToastAndroid.show(LIKE, ToastAndroid.SHORT) : ToastAndroid.show('annulé', ToastAndroid.SHORT)
            this.infinite_rate(LIKE)            
          }} 
        >
          <View style={styles.same_element_one}>
            <MaterialCommunityIcons style={[styles.like_icon, {color: this.state.color_like} ]} name="heart" />
            <Text style={[styles.like_text, {color: this.state.color_like} ]}>{likeConverter(this.state.like)}</Text>
          </View>        
        </TouchableNativeFeedback>

        <TouchableNativeFeedback 
          background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,true)}                    
          onPress={() => {            
            !this.toggle_dislike ? ToastAndroid.show(DISLIKE, ToastAndroid.SHORT) : ToastAndroid.show('annulé', ToastAndroid.SHORT)     
            this.infinite_rate(DISLIKE)                   
          }} 
        >
          <View style={styles.same_element_one}>
            <MaterialCommunityIcons style={[styles.same_element_two, {color: this.state.color_dislike} ]} name="heart-off" />
            <Text style={[styles.same_element, {color: this.state.color_dislike} ]}>{likeConverter(this.state.dislike)}</Text>
          </View>        
        </TouchableNativeFeedback>

      </View>

      

    )
  }
}

const styles = StyleSheet.create({
  option_area_macro: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
  },
  /*option_area_mini: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
  },
  option_area_text: {
    fontSize: 14,
  },
  option_area_icon: {
    fontSize:25,
    marginRight: 5
  },*/

  same_element_one: { 
    flex:1, 
    alignItems:'center', 
    justifyContent:'center'
  },
  same_element_two: { 
    color: THEME.TERTIARY.COLOR, 
    fontSize:20 
  },
  same_element: { 
    fontSize:12, 
    color: THEME.TERTIARY.COLOR
  },
  like_icon: { 
    color: THEME.PRIMARY.BACKGROUND_COLOR, 
    fontSize:20 
  },
  like_text: { 
    fontSize:12, 
    color: THEME.PRIMARY.BACKGROUND_COLOR
  },
})

export default RateVideoViewerOffLine