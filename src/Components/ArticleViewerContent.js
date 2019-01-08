import React from 'react'
import { 
	Platform, 
	Text, 
	View, 
	Image,
	StyleSheet,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import ArticleGenerator from '../AI/ArticleGenerator'
import THEME from '../INFO/THEME'

const AUTHOR_PIC = '../assets/cvHappyTof2.jpg'

class ArticleViewerContent extends React.Component{
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
								<Image source={require(AUTHOR_PIC)} style={styles.author_pic}/>
							</View>
						</View>
						<View style={styles.author_name_container}>
							<Text style={styles.author_name}>{firstData.author}</Text>
							<Text style={styles.author_detail}>{secondData.authorDescription}</Text>
							<Text style={styles.author_detail}>
								<Icon name="md-time" /> {firstData.publihAt} - {secondData.readTime}
							</Text>
						</View>
					</View>

					<View style={styles.article_container}>
            <ArticleGenerator secondData={secondData} />
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
		color: THEME.SECONDARY.COLOR, 
	},
	author_detail: { 
		fontSize:13, 
		color: THEME.TERTIARY.COLOR
	},
})

export default ArticleViewerContent