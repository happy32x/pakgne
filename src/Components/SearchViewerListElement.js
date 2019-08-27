import React from 'react'
import {
  View, 
  Text, 
  Keyboard,
  StyleSheet,
  TouchableNativeFeedback,   
} from 'react-native'

//Pour l'affichage des résultats dont le tag n'a pas encore été entré par le user
//import IconIonicons from 'react-native-vector-icons/Ionicons'
//<IconIonicons style={styles.search} name="md-search" />

import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import THEME from '../INFO/THEME'

class SearchViewerListElement extends React.Component{

  constructor(props) {
    super(props)
    this.state = {}
  }

  renderText() {    
    let text = this.props.data.nom.toLowerCase()
    let tag = this.props.text.toLowerCase()
    let data = null
    let proceed = text.indexOf(tag)

    if(tag === '' || proceed === -1) 
      return <Text>{text}</Text>

    //1 - On casse le nom avec le text    
    //data = text.split(new RegExp(tagClone, "i"))
    data = text.split(tag)

    //2 - On ajoute le text entre les éléments du tableau
    let i = 1
    while (i <= data.length-1) {
      data.splice(i, 0, tag);
      i += 2;
    }

    //3 - On enlève les éléments vide
    data = data.filter(word => word != '')
      
    //4 - On rend le résultat
    return data.map((item, index) => (
      item != tag
        ? <Text key={index}>{item}</Text>
        : <Text key={index} style={{color: THEME.PRIMARY.BACKGROUND_COLOR}}>{item}</Text>      
    ))
  }

  render() {  
    return (
      <TouchableNativeFeedback 
        background={TouchableNativeFeedback.Ripple(THEME.TERTIARY.WAVE_COLOR,false)}
        onPress={() => {
          Keyboard.dismiss()
          this.props.launchResearhParam(this.props.data.nom)
        }}
      >
        <View style={styles.main}>
          <View style={styles.left}>
            <IconMaterialCommunityIcons style={styles.left_icon} name="restore-clock" />
          </View>
          <View style={styles.center}>
            <Text style={styles.center_text} numberOfLines={7}>{this.renderText()}</Text>
          </View>          
        </View>
      </TouchableNativeFeedback>
    )    
  }
}

const styles = StyleSheet.create({      
  main: {
    width: '100%',
    flexDirection:'row', 
    paddingTop: 5,
    paddingBottom: 5,
  },

  left: {
    alignItems:'center', 
    justifyContent:'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
    left_icon: {
      color: THEME.TERTIARY.COLOR, 
      fontSize: 25,
    },

  center: {
    flex: 1,
    alignItems:'flex-start',
    justifyContent:'center',
  },
    center_text: {
      fontSize: 16,
    }
})

export default SearchViewerListElement

