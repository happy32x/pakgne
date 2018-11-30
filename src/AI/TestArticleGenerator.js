import React from 'react'
import { 
	Platform, 
	Text, 
	View, 
	Image,
	StyleSheet,
} from 'react-native'

import Empereur_Poutine from '../assets/Empereur_Poutine.jpg'

class TestArticleGenerator extends React.Component{
  render() {
		const article = this.props.article
		const firstData = article[0]
		const secondData = article[1]

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
							<Text style={styles.author_name}>{firstData.author}</Text>
							<Text style={styles.author_detail}>{secondData.authorDescription}</Text>
							<Text style={styles.author_detail}>{firstData.publihAt} - {secondData.readTime}</Text>
						</View>
					</View>

					<View style={styles.article_container}>

						{
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
												<Image source={Empereur_Poutine} style={styles.image_in_article}/>
											</View>
										)
									default:
										return null
								}
							})
						}

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

export default TestArticleGenerator