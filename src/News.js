import React from 'react'
import { ActivityIndicator, FlatList, View, RefreshControl } from 'react-native'
import data from './data'
import Card from './Card'

export default class News extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      iter:0,
    }
  }

  componentWillUnMount() {
    clearTimeout(this.timeoutID)
  }

  componentDidMount() {
    this.load()
  }

  renderFirst() {
    return (
        <View style={{ flex:1, alignItems:"center", justifyContent:"center" }}>
            <ActivityIndicator animating size="large" color="#F57F17" />
        </View>
    )
  }

  load = () => {
    this.timeoutID = setTimeout(() => {
        this.makeRemoteRequestTest()
    }, 5000)
  }

  makeRemoteRequestTest = () => {
      const { page, seed } = this.state
      this.setState({ loading: true })
      this.setState({
        loading: false,
        data: page === 1 ? data : [...this.state.data, ...data],
        error: null,
        refreshing: false
     })
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state
    const url = `https://randomuser.me/api?seed=${seed}&page=${page}&results=20`
    this.setState({ loading: true })
    fetch(url)
        .then(res => res.json())
        .then(res => {
            this.setState({
                loading: false,
                data: page === 1 ? data : [...this.state.data, ...data],
                error: res.error || null,
                refreshing: false
            })
        })
        .catch(error => {
            this.setState({ error, loading: false, refreshing: false })
        })
  }

  renderFooter = () => {
    if (!this.state.loading) return null

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" color="#F57F17" />
      </View>
    )
  }

  handleRefresh = () => {
    this.setState({
        page: 1,
        refreshing: true,
        seed: this.state.seed + 1,
    }, () => {
        this.makeRemoteRequestTest()
    })
  }

  handleLoadMore = () => {
    this.setState({
        page: this.state.page + 1,
    }, () => {
        this.makeRemoteRequestTest()
    })
  }

  render() {
      if(this.state.loading === true){
        return ( this.renderFirst() )
      }
      else{
        return ( 
            <View style={{ flex:1 }}>
                <FlatList 
                    style={{backgroundColor:'#EFEFEF', paddingLeft:0, paddingTop:0}}
                    showsVerticalScrollIndicator={false}
                    data={this.state.data}
                    renderItem={ ({ item }) => ( <Card {...item} /> )}
                    keyExtractor={item=>item.id}
                    ListFooterComponent={this.renderFooter}
                    refreshControl={ <RefreshControl colors={["#F57F17"]} refreshing={this.state.refreshing} onRefresh={this.handleRefresh} /> }
                    onEndReached={this.handleLoadMore}
                    onEndThreshold={0}
                />
            </View>
        )
      }
  }
}

