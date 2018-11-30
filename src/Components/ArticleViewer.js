import React, { Component } from 'react'
import {
  Animated,
  Platform,
  StyleSheet,
  View,
  TouchableNativeFeedback,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import BarStatus from './BarStatus'
import ArticleViewerContent from './ArticleViewerContent'
import secondDataGlobal from './secondDataGlobal'
import Default from './Default'
import ArticleGenerator from '../AI/ArticleGenerator'
import TestArticleGenerator from '../AI/TestArticleGenerator'

const COVER = '../assets/ukraine-les-calculs-calibres-de-poutine.jpg'
const HEADER_MAX_HEIGHT = 300
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73
const HEADER_SCROLL_DISTANCE = (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)

class ArticleViewer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
      isLoading: true,
    };
  }

  static navigationOptions = {
    header: null
  };

  _renderScrollViewContent(article) {
    return (
      <ArticleViewerContent article={article} headerMaxHeight={HEADER_MAX_HEIGHT}/>
    );
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
    })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Default />
      )
    } else {
      const { navigation } = this.props
      const firstData = navigation.getParam('firstData', 'NO-DATA')
      const secondData = secondDataGlobal[firstData.id]
      const article = [firstData, secondData]

      // Because of content inset the scroll value will be negative on iOS so bring
      // it back to 0.
      const scrollY = Animated.add(
        this.state.scrollY,
        Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
      );
      const headerTranslate = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, -HEADER_SCROLL_DISTANCE],
        extrapolate: 'clamp',
      });

      const imageOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 0.4],
        extrapolate: 'clamp',
      });
      const imageTranslate = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 100],
        extrapolate: 'clamp',
      });

      const titleScale = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 1, 0.8],
        extrapolate: 'clamp',
      });
      const titleTranslate = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 0, -8],
        extrapolate: 'clamp',
      });
      const titleTranslateX = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 0, -50],
        extrapolate: 'clamp',
      });

      const myTitleScale = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE/2, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 0.8, 0.8],
        extrapolate: 'clamp',
      });
      const myTitleTranslateY = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 14, 14],
        extrapolate: 'clamp',
      });
      const myTitleTranslateX = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [0, -10, -10],
        extrapolate: 'clamp',
      });

      return (
        <View style={styles.fill}>
        
          <Animated.ScrollView
            style={styles.fill}
            scrollEventThrottle={1}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
              { useNativeDriver: true },
            )}
            // iOS offset for RefreshControl
            contentInset={{
              top: HEADER_MAX_HEIGHT,
            }}
            contentOffset={{
              y: -HEADER_MAX_HEIGHT,
            }}
          >
            {this._renderScrollViewContent(article)}
          </Animated.ScrollView>

          <Animated.View
            pointerEvents="none"
            style={[
              styles.header,
              { transform: [{ translateY: headerTranslate }] },
            ]}
          >
            <Animated.Image
              style={[
                styles.backgroundImage,
                {
                  opacity: imageOpacity,
                  transform: [{ translateY: imageTranslate }],
                },
              ]}
              source={require(COVER)}
            />

            <Animated.Text 
              style={[
                styles.title, 
                { 
                  transform: [
                    { scale: myTitleScale },
                    { translateY: myTitleTranslateY },
                    { translateX: myTitleTranslateX },
                  ],
                }
              ]} 
              numberOfLines={4}
            >
              {firstData.title}
            </Animated.Text>

          </Animated.View>

          <Animated.View
            style={[
              styles.bar,
              {
                transform: [
                  { scale: titleScale },
                  { translateY: titleTranslate },
                  { translateX: titleTranslateX },
                ],
              },
            ]}
          >
            <TouchableNativeFeedback 
              background={TouchableNativeFeedback.Ripple("#5e5e5e",true)}
              onPress={() => navigation.goBack()}
            >
              <View>
                <Icon style={styles.arrow_back} name="md-arrow-back" /> 
              </View>              
            </TouchableNativeFeedback>
          </Animated.View>

          { Platform.OS === 'android' ? <BarStatus color="#e17000" /> : null }
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F57F17',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  bar: {
    backgroundColor: 'transparent',
    marginTop: Platform.OS === 'ios' ? 28 : 38,
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    position: "absolute",
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 22, 
    lineHeight: 36,
    padding: 25,
    paddingBottom: 8,
    bottom: 0,
  },
  arrow_back: { 
    color:"#FFF", 
    fontSize:22,
    marginLeft:25,
    marginRight:20,
  },
})

export default ArticleViewer

