import React, { Component } from 'react'
import { 
  View, 
  Text,  
  StyleSheet,
  ScrollView,
} from 'react-native'

import LinkUrl from './LinkUrl'
import icon from '../assets/icon.png'
import THEME from '../INFO/THEME';

function CguContent(props) {
  return (
    <ScrollView>
      <View style={styles.main_container}>

        <View style={styles.txt_content}>
          <Text style={styles.txt_first_title}>
            CONDITIONS D’UTILISATION DE PAKGNE         
          </Text>
          <Text style={styles.txt_first_body}>
            Date de la dernière modification : 11 Septembre 2019          
          </Text>
        </View>

        <View style={styles.txt_content}>
          <Text style={styles.txt_title}>
            Bienvenue sur Pakgne!
          </Text>
          <Text style={styles.txt_body}>
            Merci d’avoir choisi nos produits et services (les « Services »). 
            Les Services sont fournis par la société Softa LLC (ci-après « Softa »), 
            sise à Ndokoti, PK8, Douala, BP 3600 Akwa, Cameroun.             
          </Text>
          <Text style={styles.txt_body}>
            L’utilisation de nos Services implique votre acceptation 
            des présentes Conditions d’Utilisation. Nous vous invitons à les lire attentivement.             
          </Text>
          <Text style={styles.txt_body}>
            Nos Services sont très variés : il se peut donc que des 
            conditions additionnelles ou particulières à certains Services 
            (p. ex. des conditions de limite d’âge) s’appliquent. Ces conditions 
            additionnelles seront mises à votre disposition avec les Services concernés. 
            Si vous choisissez d’utiliser ces Services, vous acceptez que ces 
            conditions additionnelles fassent alors également partie de 
            votre engagement contractuel avec nous.            
          </Text>
        </View>    

        <View style={styles.txt_content}>
          <Text style={styles.txt_title}>
            Utilisation de nos Services
          </Text>
          <Text style={styles.txt_body}>
            Vous devez respecter les règles applicables aux Services que vous utilisez.            
          </Text>
          <Text style={styles.txt_body}>
            N’utilisez pas nos Services de façon impropre. Ne tentez pas, 
            par exemple, de produire des interférences avec nos Services ou 
            d’y accéder en utilisant une méthode autre que l’interface et les 
            instructions que nous mettons à votre disposition. Vous ne devez 
            utiliser nos Services que dans le respect des lois en vigueur, y 
            compris les lois et réglementations applicables concernant le contrôle 
            des exportations et ré-exportations. Nous pouvons suspendre ou cesser 
            la fourniture de nos Services si vous ne respectez pas les conditions 
            ou règlements applicables, ou si nous examinons une suspicion 
            d’utilisation impropre.
          </Text>
          <Text style={styles.txt_body}>
            L’utilisation de nos Services ne vous confère aucun droit de propriété 
            intellectuelle sur nos Services ni sur les contenus auxquels vous accédez. 
            Vous ne devez utiliser aucun contenu obtenu par l’intermédiaire de nos 
            Services sans l’autorisation du propriétaire dudit contenu, à moins d’y 
            être autorisé par la loi. Ces Conditions d’Utilisation ne vous confèrent 
            pas le droit d’utiliser une quelconque marque ou un quelconque logo 
            présent dans nos Services. Vous n’êtes pas autorisé à supprimer, 
            masquer ou modifier les notices juridiques affichées dans ou avec nos 
            Services.            
          </Text>
          <Text style={styles.txt_body}>
            Nos Services affichent des contenus n’appartenant pas à Softa. 
            Ces contenus relèvent de l’entière responsabilité de l’entité qui 
            les a rendus disponibles. Nous pouvons être amenés à vérifier les 
            contenus pour s’assurer de leur conformité à la loi ou à nos 
            conditions d’utilisation. Nous nous réservons le droit de supprimer 
            ou de refuser d’afficher tout contenu que nous estimons 
            raisonnablement être en violation de la loi ou de notre règlement. 
            Le fait que nous nous réservions ce droit ne signifie pas 
            nécessairement que nous vérifions les contenus. Dès lors, 
            veuillez ne pas présumer que nous vérifions les contenus.
          </Text>
          <Text style={styles.txt_body}>
            Dans le cadre de votre utilisation des Services et de l’exécution 
            de notre engagement contractuel, nous sommes susceptibles de vous 
            adresser des messages liés au fonctionnement ou à l’administration 
            des Services ainsi que d’autres informations. Vous pouvez choisir 
            de ne plus recevoir certains de ces messages. 
          </Text>
          <Text style={styles.txt_body}>
            Certains de nos Services sont disponibles sur les appareils mobiles. 
            Ne les utilisez pas d’une manière susceptible de vous distraire et de 
            vous empêcher de respecter le code de la route et les règles de 
            sécurité en matière de conduite.
          </Text>          
        </View>

        <View style={styles.last_txt_content}>
          <Text style={styles.txt_title}>
            ...
          </Text>
          <LinkUrl 
            text="Pour plus d'infos appuyez ici" 
            url='https://policies.Softa.com/terms?hl=fr'
          />
        </View>

      </View>
    </ScrollView>      
  )
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection:'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: 20,
    marginRight: 20,
    paddingBottom: 40,
  },
  txt_content: {
    marginTop: 40,
  },
  last_txt_content: {
    marginTop: 10,
  },
  txt_first_title: {
    fontSize:15, 
		color: THEME.SECONDARY.WAVE_COLOR,
    lineHeight: 27,
    fontWeight: 'bold'
  },
  txt_first_body: {
    fontSize:13, 
		color: THEME.SECONDARY.WAVE_COLOR,
    lineHeight: 27,
    marginTop: 20,
    fontStyle: 'italic',
  },
  txt_title: {
    fontSize:18, 
		color: THEME.SECONDARY.WAVE_COLOR,
    lineHeight: 27,
    fontWeight: 'bold'
  },
  txt_body: {
    fontSize:16, 
		color: THEME.SECONDARY.WAVE_COLOR,
    lineHeight: 27,
    marginTop: 20,
  }
})

export default CguContent