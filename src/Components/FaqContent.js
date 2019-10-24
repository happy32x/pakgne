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

function FaqContent(props) {
  return (
    <ScrollView>
      <View style={styles.main_container}>

        <View style={styles.txt_content}>
          <Text style={styles.txt_question}>
            Comment faire pour s'abonner à pakgne ?
          </Text>

          <Text style={styles.txt_answer}>
            Ouvrir <Text style={{fontWeight:'bold'}}>Paramètre</Text>, 
            ensuite appuyez sur votre nom, 
            puis sur le bouton <Text style={{fontWeight:'bold'}}>ABONNEZ-VOUS A PAKGNE </Text> 
            en bas de la page. 
          </Text>
        </View>

        <View style={styles.txt_content}>
          <Text style={styles.txt_question}>
            Comment enregistrer une vidéo pour la regarder plus tard ?
          </Text>

          <Text style={styles.txt_answer}>
            Sur la vidéo, appuyez sur <Text style={{fontWeight:'bold'}}>l'étoile </Text>
            situé en haut à droite, ou alors appuyez sur le bouton <Text style={{fontWeight:'bold'}}>Enregistrement </Text> 
            en dessous de la vidéo 
          </Text>
        </View>

        <View style={styles.txt_content}>
          <Text style={styles.txt_question}>
            Comment puis-je aider pakgne à grandir ? 
          </Text>

          <Text style={styles.txt_answer}>
            Vous avez plusieurs manières de le faire tout d'abord vous devez 
            vous abonner, liker, partager et commenter les vidéos, 
            vous pouvez acheter les <Text style={{fontWeight:'bold'}}>articles</Text> et <Text style={{fontWeight:'bold'}}>googdies </Text>
            présents dans la boutique (onglet boutique de la page d'acceuil) 
            vous pouvez également souscrire à l'une des offres prémium pour accéder aux contenus exclusifs. 
          </Text>
        </View>

        <View style={styles.txt_content}>
          <Text style={styles.txt_question}>
            A chaque fois que j'ouvre l'application de 
            reçois du contenu déjà vu ?
          </Text>

          <Text style={styles.txt_answer}>
            Cela signifie que vous êtes peut être une grande fan 
            et que vous avez probablement déjà vu une grande partie 
            des vidéos proposées. Si tel est le cas, allez dans <Text style={{fontWeight:'bold'}}>Paramètre</Text>, 
            puis ouvrez votre profil (appuyez sur votre nom), 
            ensuite appuyez sur le bouton <Text style={{fontWeight:'bold'}}>Obtenir votre récompense </Text> 
            (la présence de ce bouton signifie que vous êtes bel et bien un(e) grand(e) fan. Dans le cas contraire, 
            continuez de soutenir pakgne en interagissant de plus en plus via l'application, vous finirez par 
            être récompensé). Une fois cela fait, vous reçevrez un badge spécial, une offre prémium d'un an, 
            ainsi qu'un rendez-vous vip avec vos stars préférées. 
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
    paddingBottom: 40,
  },
  txt_content: {
    marginTop: 40,
  },
  txt_question: {
    fontSize:18, 
		color: THEME.SECONDARY.WAVE_COLOR,
    lineHeight: 27,
    fontWeight: 'bold'
  },
  txt_answer: {
    fontSize:16, 
		color: THEME.SECONDARY.WAVE_COLOR,
		lineHeight: 27,
  }
})

export default FaqContent