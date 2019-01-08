import React from 'react'
import { 
	Text, 
	View, 
	Image,
	StyleSheet,
} from 'react-native'

import THEME from '../INFO/THEME'

const ARTICLE_IMG = '../assets/vladimir-poutine-a-stavropol-le-9-octobre-2018_6118412.jpg'

class ArticleGenerator extends React.Component{
  render() {
		const secondData = this.props.secondData

    return (
			secondData.content.map((element, index) => {
				switch (element.id) {
					case 'title':					 
						return (
							<View key={index} style={styles.article_title_container}>
								<Text style={styles.article_title}>{element.content}</Text>
								{ 
									element.description !== '' 
										? <Text style={styles.article_title_one}>{element.description}</Text> 
										: null 
								}
							</View>
						)
					case 'text':
						return (
							<View key={index}>
								<Text style={styles.text_in_article}>{element.content}</Text>
							</View>
						)
					case 'image':
						return (
							<View key={index} style={styles.image_in_article_container}>
								<Image source={require(ARTICLE_IMG)} style={styles.image_in_article}/>
							</View>
						)
					default:
						return null
				}
			})
		)
		
  }
}

const styles = StyleSheet.create({
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
		color: THEME.SECONDARY.COLOR
	},
	article_title_one: { 
		fontSize:20, 
		color: THEME.TERTIARY.COLOR
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
		color: THEME.SECONDARY.COLOR,
		lineHeight: 27,
	},
})

export default ArticleGenerator