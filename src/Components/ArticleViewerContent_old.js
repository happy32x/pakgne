import React from 'react'
import { 
	Platform, 
	Text, 
	View, 
	Image,
	StyleSheet,
} from 'react-native'

import Empereur_Poutine from '../assets/Empereur_Poutine.jpg'

class ArticleViewerContent extends React.Component{
  render() {
    return (
      <View style={{ paddingTop: Platform.OS !== 'ios' ? this.props.headerMaxHeight : 0, }}>
        <View style={styles.main_container}>

					<View style={styles.author_info_container}>
						<View style={styles.author_pic_container}>
							<View style={styles.author_pic_container_one}>
								<Image source={Empereur_Poutine} style={styles.author_pic}/>
							</View>
						</View>
						<View style={styles.author_name_container}>
							<Text style={styles.author_name}>Vladimir Vladimirovich Poutine</Text>
							<Text style={styles.author_detail}>Président de la fédération de russie et Szar de toutes les russies</Text>
							<Text style={styles.author_detail}>Dec 25, 2019 - 4 min de lecture</Text>
						</View>
					</View>

					<View style={styles.article_container}>

						<View style={styles.article_title_container}>
							<Text style={styles.article_title}>De l'espionnage au pouvoir</Text>
							<Text style={styles.article_title_one}>Suivé son parcours de berlin à moscou</Text>
						</View>

						<View>
							<Text style={styles.article_description}>
							Vladimir Vladimirovitch Poutine (en russe : Влади́мир Влади́мирович Пу́тин [vɫɐˈdʲimʲɪr vɫɐˈdʲimʲɪrəvʲɪt͡ɕ ˈputʲɪn] Écouter), né le 7 octobre 1952 à Léningrad (aujourd'hui Saint-Pétersbourg), est un homme d'État russe. Il est président du gouvernement de 1999 à 2000 et de 2008 à 2012, et président de la Fédération de Russie, par intérim de 1999 à 2000, puis de plein exercice de 2000 à 2008 et depuis 2012.

Officier du KGB, principal service de renseignement de l'URSS post-stalinienne, en poste à Berlin au moment de la chute du mur, il commence sa carrière politique à la mairie de Saint-Pétersbourg, puis devient l'un des plus proches conseillers du président Boris Eltsine, qui fera de lui le directeur du Service fédéral de sécurité en 1998, puis le président du gouvernement de la Russie l'année suivante.
							</Text>
						</View>

						<View style={styles.image_in_article_container}>
							<Image source={Empereur_Poutine} style={styles.image_in_article}/>
						</View>

						<View>
							<Text style={styles.text_in_article}>
							Vladimir Vladimirovitch Poutine (en russe : Влади́мир Влади́мирович Пу́тин [vɫɐˈdʲimʲɪr vɫɐˈdʲimʲɪrəvʲɪt͡ɕ ˈputʲɪn] Écouter), né le 7 octobre 1952 à Léningrad (aujourd'hui Saint-Pétersbourg), est un homme d'État russe. Il est président du gouvernement de 1999 à 2000 et de 2008 à 2012, et président de la Fédération de Russie, par intérim de 1999 à 2000, puis de plein exercice de 2000 à 2008 et depuis 2012.

Officier du KGB, principal service de renseignement de l'URSS post-stalinienne, en poste à Berlin au moment de la chute du mur, il commence sa carrière politique à la mairie de Saint-Pétersbourg, puis devient l'un des plus proches conseillers du président Boris Eltsine, qui fera de lui le directeur du Service fédéral de sécurité en 1998, puis le président du gouvernement de la Russie l'année suivante.

À partir du 31 décembre 1999, à la suite de la démission d'Eltsine, il assure les fonctions de président de la Fédération de Russie par intérim. Il devient président de plein exercice le 7 mai 2000, après avoir remporté l'élection présidentielle au premier tour. Confortablement réélu en 2004, il mène une grande politique de réformes marquée par un redressement de l'économie nationale et une politique institutionnelle tournée vers une concentration des pouvoirs présidentiels.

En 2008, la Constitution lui interdisant de concourir pour un troisième mandat consécutif, il soutient la candidature de Dmitri Medvedev à la présidence. Une fois élu, ce dernier le nomme 1er Ministre. Dans la foulée, Vladimir Poutine prend la direction du parti Russie unie. Fréquemment accusé d'autoritarisme dans son mode de gouvernement, il est pour la première fois significativement contesté à la suite des élections législatives de 2011.

Candidat à l'élection présidentielle de 2012 avec le soutien du président Medvedev, il l'emporte au premier tour et retrouve la fonction de président de la Fédération de Russie pour un mandat allongé de deux ans en vertu d'un amendement adopté en 2008. Au cours de cette période, il s'efforce de restaurer l'influence russe sur la scène internationale. D'une part, dans le cadre de la guerre du Donbass, à la suite d'un référendum contesté, il permet le rattachement de la péninsule de Crimée à la Russie, ce qui lui vaut des accusations de violation du droit international. D'autre part, il implique militairement la Russie dans la guerre civile syrienne, en soutien à Bachar el-Assad.

Il brigue un nouveau mandat lors de l'élection présidentielle de 2018, qu'il remporte dès le premier tour avec un score jamais atteint par un candidat lors d'un scrutin présidentiel de l'après-communisme (76,7 %).
							</Text>
						</View>

					</View>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: { 
		marginTop:40, 
		marginBottom:15, 
		marginLeft:15, 
		marginRight:15 
	},
	author_info_container: { 
		flexDirection:'row',
		marginBottom:40 
	},
	author_pic_container: { 
		flex:0.3, 
		alignItems:'center', 
		justifyContent:'center' 
	},
	author_pic_container_one: { 
		height:60, 
		width:60 
	},
	author_pic: { 
		flex: 1, 
		borderRadius:60, 
		height: null, 
		width: null 
	},
	author_name_container: { 
		flex:1, 
		paddingLeft:15, 
		paddingRight:15, 
		justifyContent:'center' 
	},
	author_name: { 
		fontSize:18, 
		color:"#000" 
	},
	author_detail: { 
		fontSize:13, 
		color:"#9d9d9d" 
	},
	article_container: { 
		paddingLeft:15, 
		paddingRight:15 
	},
	article_title_container: { 
		marginBottom:40 
	},
	article_title: { 
		fontSize:30, 
		fontWeight:'bold', 
		color:"#000" 
	},
	article_title_one: { 
		fontSize:20, 
		color:"#9d9d9d" 
	},
	article_description: { 
		fontSize:18, 
		color:"#161616" 
	},
	image_in_article_container: { 
		height:200, 
		marginTop:40, 
		marginBottom:40 
	},
	image_in_article: { 
		flex:1, 
		height: null, 
		width: null 
	},
	text_in_article: { 
		fontSize:18, 
		color:"#161616" 
	},
})

export default ArticleViewerContent