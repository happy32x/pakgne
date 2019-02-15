import React, { Component } from "react"
import {  
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator
} from "react-native"

class VideoListMini extends Component {
  constructor(props) {
    super(props);
    this.fetchMore = this._fetchMore.bind(this)
    this.fetchData = this._fetchData.bind(this)
    this.state = {
      isLoading: true,
      isLoadingMore: false,
      _data: null,
      _dataAfter: ""
    }
  }

  _fetchData(callback) {
    const params = this.state._dataAfter !== ''
      ? `&after=${this.state._dataAfter}`
      : ''
    fetch(`https://www.reddit.com/subreddits/popular/.json?limit=15${params}`)
      .then(response => response.json())
      .then(callback)
      .catch(error => {
        console.error(error)
      })
  }
 
  _fetchMore() {
    this.fetchData(responseJson => {
      const data = this.state._data.concat(responseJson.data.children)
      this.setState({
        isLoadingMore: false,
        _data: data,
        _dataAfter: responseJson.data.after
      })
    })
  }
  
  componentDidMount() {
    this.fetchData(responseJson => {
      const data = responseJson.data.children
      this.setState({
        isLoading: false,
        _data: data,
        _dataAfter: responseJson.data.after
      })
    })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#F57F17"/>
        </View>
      );
    } else {
      return (        
        <View style={styles.flatlist_container}>
          <FlatList            
              data={this.state._data}           
              renderItem={({item}) => {
              return (
                <View style={styles.listItem}>
                  <View style={styles.imageWrapper}>
                    <Image
                      style={{ width: 70, height: 70 }}
                      source={{
                        uri: item.data.icon_img === '' ||
                          item.data.icon_img === null
                          ? 'https://via.placeholder.com/70x70.jpg'
                          : item.data.icon_img,
                      }}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.title}>
                      {item.data.display_name}
                    </Text>
                    <Text style={styles.subtitle}>
                      {item.data.public_description}
                    </Text>
                  </View>
                </View>
              );
            }}   
            keyExtractor={(item,i) => i.toString()}
            onEndReached={() => this.setState({ isLoadingMore: true }, () => this.fetchMore())}
            ListFooterComponent={() => {
              return (
                this.state.isLoadingMore &&
                <View style={{ flex: 1, padding: 10 }}>
                  <ActivityIndicator size="small" color="#F57F17"/>
                </View>
              );
            }}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ebe8f2',
  },
  flatlist_container: {
    flex: 1,
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#d6d7da',
    padding: 6,
  },
  imageWrapper: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    margin: 6,
  },
  subtitle: {
    fontSize: 10,
    textAlign: 'left',
    margin: 6,
  },
})

export default VideoListMini