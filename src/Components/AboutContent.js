import React, { Component } from 'react'
import { 
  View, 
  Text,
  Image, 
  StyleSheet,
  ScrollView,
} from 'react-native'
import icon from '../assets/icon.png'
import THEME from '../INFO/THEME';

function AboutContent(props) {
  return (
    <ScrollView>
      <View style={styles.main_container}>

        <View style={styles.img_content}>
          <Image source={ icon } style={styles.img} />
        </View>

        <View style={styles.version_content}>
          <Text style={styles.version}>Ver 2.0.0</Text>
        </View>

        {/*
            Recherche sur les alinéas
            =========================

            google => https://www.google.com/search?ei=LjhgXKjZG6qNlwSX8534DA&q=react+native+display+space+in+text&oq=react+native+display+space+in+tex&gs_l=psy-ab.1.0.33i22i29i30l7.787142.796294..799825...1.0..0.220.3781.0j19j2......0....1..gws-wiz.......0i71j35i39j0j0i203j0i22i30j0i22i10i30j33i21j33i160.Pcspgfy9zNE
            stackOverFlow => https://stackoverflow.com/questions/50884639/empty-text-space-in-a-continuous-text-component-react-native
        */}

        <View style={styles.txt_content}>
          <Text style={styles.txt}>
            {"        "}Pakgne, l'application mobile destinée aux fans
            de la web-série.
          </Text>
        </View>

        <View style={styles.txt_content}>
          <Text style={styles.txt}>
            {"        "}Dynamique et ambicieuse elle vous offrira 
            l'exclusivité d'accéder à la télé-réalité,
            une suite d'épisodes inédites relatant le 
            quotidien de vos stars préférées.
          </Text>
        </View>

      </View>
    </ScrollView>      
  )
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  img_content: { 
    marginTop: 20
  },
  img: { 
    height: 70, 
    width: 70,
  },
  version_content: { 
    marginTop: 5,
  },
  version: { 
    fontSize:18, 
    fontWeight:'bold',
		color: THEME.SECONDARY.COLOR,
  },
  txt_content: {
    marginTop: 40,
  },
  txt: {
    fontSize:16, 
		color: THEME.TERTIARY.COLOR,
		lineHeight: 27,
  }
})

export default AboutContent