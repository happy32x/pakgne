import React, { Component, PureComponent } from 'react'
import {  
  View,
  Text,
  Animated,
  StyleSheet,  
  TouchableNativeFeedback,
} from 'react-native'

import THEME from '../INFO/THEME'
import BounceUpAndDownStatic from '../Animations/BounceUpAndDownStatic'

import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'

import { randomArrayElement } from '../AI/ArrayElementPicker'

const AnimatedIconMaterialCommunityIcons = Animated.createAnimatedComponent(IconMaterialCommunityIcons)
const ORDER_BUTTON_TRANSLATE_Y_RATIO = -60

class VideoListOrder extends Component {

  constructor(props) {
    super(props)
    this.state = {      
      buttonAnim: new Animated.Value(0),
    }
    this.buttonAnim = 0
    this.order = 'date'
    this.random = 'false'

    this.videoListOrder = ['date','rating','relevance','title','viewCount']    
  }

  handleButtonPress = (value) => {
    Animated.timing(this.state.buttonAnim, {
      toValue: value,
      duration: 200,
    }).start()
  }

  handleVideoListOrder = (choice) => {  
    Animated.spring(this.state.buttonAnim, {
      toValue: 0
    }).start(() => {

      if(choice==='random') {
        this.order = randomArrayElement(this.videoListOrder)        
        this.random = 'true'
      } else {
        this.order = choice
        this.random = 'false'
      }          

      console.log('order:'+this.order+' & random:'+this.random)
      this.props.updateVideoListOrder(this.order, this.random)      
    })
  }

  render() {
    const list_button_rotation = this.state.buttonAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg']
    })   
    const list_button_opacity = this.state.buttonAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    })

    const cross_button_rotation = this.state.buttonAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['180deg', '0deg']
    })
    const cross_button_opacity = this.state.buttonAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    })

    //alphabétique, perninente, random, recent, like, vue 
    //['title','relevance','date','rating','viewCount']
    const alphabétique_button_translate_y = this.state.buttonAnim.interpolate({
      inputRange: [0, 1],
       outputRange: [0, ORDER_BUTTON_TRANSLATE_Y_RATIO*(3.8+0.7)]
     }) 
    const perninente_button_translate_y = this.state.buttonAnim.interpolate({
      inputRange: [0, 1],
       outputRange: [0, ORDER_BUTTON_TRANSLATE_Y_RATIO*(3.1+0.7)]
     })
    const random_button_translate_y = this.state.buttonAnim.interpolate({
      inputRange: [0, 1],
       outputRange: [0, ORDER_BUTTON_TRANSLATE_Y_RATIO*(2.4+0.7)]
     })
    const recent_button_translate_y = this.state.buttonAnim.interpolate({
      inputRange: [0, 1],
       outputRange: [0, ORDER_BUTTON_TRANSLATE_Y_RATIO*(1.7+0.7)]
     }) 
    const like_button_translate_y = this.state.buttonAnim.interpolate({
      inputRange: [0, 1],
       outputRange: [0, ORDER_BUTTON_TRANSLATE_Y_RATIO*(1+0.7)]
     })
    const vue_button_translate_y = this.state.buttonAnim.interpolate({
     inputRange: [0, 1],
      outputRange: [0, ORDER_BUTTON_TRANSLATE_Y_RATIO*(1+0)]
    }) 

    const order_button_translate_x = this.state.buttonAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 0]
    })
    const order_button_scale = this.state.buttonAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.1, 1]
    })

    return (
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
        }}
      >      

        <Animated.View
          style={[ styles.VideoListOrderbutton_container_button, { transform: [
            { translateX: order_button_translate_x },
            { translateY: alphabétique_button_translate_y },
            { scale: order_button_scale }
          ]}]}
          //{ transform: [{ translateX: 20}, { translateY: 0}, {scale:0.1}] }]}
          //{ transform: [{ translateX: 0}, { translateY: -60}, {scale:1}] }]}          
        >
          <BounceUpAndDownStatic
            scale={0.8}
            onPress={() => {
              console.log('title option pressed !')
              this.handleVideoListOrder('title')
            }}
          >
            <View style={styles.VideoListOrderbutton_sub_container_bouton}>                      
              <View style={styles.VideoListOrderbutton}>
                <Text style={{color:'#FFF', fontWeight:'bold'}}>alphabétique  </Text>
                <IconMaterialCommunityIcons style={{color:'#FFF', fontWeight:'bold', fontSize:20}} name='sort-alphabetical' />
              </View>            
            </View>  
          </BounceUpAndDownStatic>
        </Animated.View>
        <Animated.View
          style={[ styles.VideoListOrderbutton_container_button, { transform: [
            { translateX: order_button_translate_x },
            { translateY: perninente_button_translate_y },
            { scale: order_button_scale }
          ]}]}
          //{ transform: [{ translateX: 20}, { translateY: 0}, {scale:0.1}] }]}
          //{ transform: [{ translateX: 0}, { translateY: -60}, {scale:1}] }]}          
        >
          <BounceUpAndDownStatic
            scale={0.8}
            onPress={() => {
              console.log('relevance option pressed !')
              this.handleVideoListOrder('relevance')
            }}
          >
            <View style={styles.VideoListOrderbutton_sub_container_bouton}>                      
              <View style={styles.VideoListOrderbutton}>
                <Text style={{color:'#FFF', fontWeight:'bold'}}>perninente  </Text>
                <IconMaterialCommunityIcons style={{color:'#FFF', fontWeight:'bold', fontSize:20}} name='check-decagram' />
              </View>            
            </View>  
          </BounceUpAndDownStatic>
        </Animated.View>
        <Animated.View
          style={[ styles.VideoListOrderbutton_container_button, { transform: [
            { translateX: order_button_translate_x },
            { translateY: random_button_translate_y },
            { scale: order_button_scale }
          ]}]}
          //{ transform: [{ translateX: 20}, { translateY: 0}, {scale:0.1}] }]}
          //{ transform: [{ translateX: 0}, { translateY: -60}, {scale:1}] }]}          
        >
          <BounceUpAndDownStatic
            scale={0.8}
            onPress={() => {
              console.log('random option pressed !')
              this.handleVideoListOrder('random')
            }}
          >
            <View style={styles.VideoListOrderbutton_sub_container_bouton}>                      
              <View style={styles.VideoListOrderbutton}>
                <Text style={{color:'#FFF', fontWeight:'bold'}}>random  </Text>
                <IconFontAwesome style={{color:'#FFF', fontWeight:'bold', fontSize:20}} name='random' />
              </View>            
            </View>  
          </BounceUpAndDownStatic>
        </Animated.View>
        <Animated.View
          style={[ styles.VideoListOrderbutton_container_button, { transform: [
            { translateX: order_button_translate_x },
            { translateY: recent_button_translate_y },
            { scale: order_button_scale }
          ]}]}
          //{ transform: [{ translateX: 20}, { translateY: 0}, {scale:0.1}] }]}
          //{ transform: [{ translateX: 0}, { translateY: -60}, {scale:1}] }]}          
        >
          <BounceUpAndDownStatic
            scale={0.8}
            onPress={() => {
              console.log('date option pressed !')
              this.handleVideoListOrder('date')
            }}
          >
            <View style={styles.VideoListOrderbutton_sub_container_bouton}>                      
              <View style={styles.VideoListOrderbutton}>
                <Text style={{color:'#FFF', fontWeight:'bold'}}>recent  </Text>
                <IconMaterialCommunityIcons style={{color:'#FFF', fontWeight:'bold', fontSize:20}} name='clock' />
              </View>            
            </View>  
          </BounceUpAndDownStatic>
        </Animated.View>
        <Animated.View
          style={[ styles.VideoListOrderbutton_container_button, { transform: [
            { translateX: order_button_translate_x },
            { translateY: like_button_translate_y },
            { scale: order_button_scale }
          ]}]}
          //{ transform: [{ translateX: 20}, { translateY: 0}, {scale:0.1}] }]}
          //{ transform: [{ translateX: 0}, { translateY: -60}, {scale:1}] }]}          
        >
          <BounceUpAndDownStatic
            scale={0.8}
            onPress={() => {
              console.log('rating option pressed !')
              this.handleVideoListOrder('rating')
            }}
          >
            <View style={styles.VideoListOrderbutton_sub_container_bouton}>                      
              <View style={styles.VideoListOrderbutton}>
                <Text style={{color:'#FFF', fontWeight:'bold'}}>like  </Text>
                <IconMaterialCommunityIcons style={{color:'#FFF', fontWeight:'bold', fontSize:20}} name='heart' />
              </View>            
            </View>  
          </BounceUpAndDownStatic>
        </Animated.View>
        <Animated.View
          style={[ styles.VideoListOrderbutton_container_button, { transform: [
            { translateX: order_button_translate_x },
            { translateY: vue_button_translate_y },
            { scale: order_button_scale }
          ]}]}
          //{ transform: [{ translateX: 20}, { translateY: 0}, {scale:0.1}] }]}
          //{ transform: [{ translateX: 0}, { translateY: -60}, {scale:1}] }]}          
        >
          <BounceUpAndDownStatic
            scale={0.8}
            onPress={() => {
              console.log('viewCount option pressed !')
              this.handleVideoListOrder('viewCount')
            }}
          >
            <View style={styles.VideoListOrderbutton_sub_container_bouton}>                      
              <View style={styles.VideoListOrderbutton}>
                <Text style={{color:'#FFF', fontWeight:'bold'}}>vue  </Text>
                <IconMaterialCommunityIcons style={{color:'#FFF', fontWeight:'bold', fontSize:20}} name='eye' />
              </View>            
            </View>  
          </BounceUpAndDownStatic>
        </Animated.View>          

        <View style={styles.VideoListOrderbutton_container}>
          {/*<TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('#3b5c7d',false)}
            onPress={() => {
              console.log('close update !')
              //this.handleCloseNewVideoPopUp()
            }}
          ></TouchableNativeFeedback>*/}
          <BounceUpAndDownStatic
            scale={0.8}
            onPress={() => {
              console.log('close button pressed !')
              this.buttonAnim = this.buttonAnim ? 0:1
              this.handleButtonPress(this.buttonAnim)
            }}
          >
            <View style={styles.VideoListOrderbutton_sub_container}>          
              <View style={styles.VideoListOrderbuttonClose}>                    
                <AnimatedIconMaterialCommunityIcons
                  style={{
                    color:'#FFF',
                    fontWeight:'bold',
                    fontSize:30,
                    opacity: cross_button_opacity,
                    transform: [{ rotateX: cross_button_rotation }],
                  }}
                  name='close'
                />
                <AnimatedIconMaterialCommunityIcons 
                  style={{
                    position: 'absolute',                    
                    color:'#FFF',
                    fontWeight:'bold',
                    fontSize:30,
                    opacity: list_button_opacity,
                    transform: [{ rotateX: list_button_rotation }],
                  }} 
                  name='filter-variant'
                />
              </View>                        
            </View>  
          </BounceUpAndDownStatic> 
        </View>                        
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  VideoListOrderbutton_container: {
    position: 'absolute',
    backgroundColor: 'transparent',
    width: 70,
    height: 70,
    bottom: 10,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  VideoListOrderbutton_container_button: {
    position: 'absolute',
    backgroundColor: 'transparent',
    width: null,
    height: null,
    bottom: 10+20,
    right: 10,    
    alignItems: 'center',
    justifyContent: 'center', 
  },
  VideoListOrderbutton_sub_container: {
    alignItems: 'center',
    justifyContent: 'center',    
    width: null, 
    height: null,
    elevation: 5,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#769cc2',
  },
  VideoListOrderbutton_sub_container_bouton: {
    alignItems: 'center',
    justifyContent: 'center',    
    width: null, 
    height: null,
    elevation: 2,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#769cc2',
  },
  VideoListOrderbuttonClose: {
    width: 70, 
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',   
  },

  VideoListOrderbutton: {
    //position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 50,
    elevation: 1,
    backgroundColor: '#769cc2',     
  },
})

export default VideoListOrder