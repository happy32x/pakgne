import React from 'react'
import SplashPage from './SplashPage'
import Root from './Root'

export default class Pakgne extends React.Component{
  constructor() {
    super()
    this.state = {
      isReady: false
    }
  }

  componentWillUnMount() {
    clearTimeout(this.timeoutID)
  }

  componentDidMount() {
    this.load()
  }

  async load() {
    this.timeoutID = setTimeout(() => {
      this.setState({isReady: true})
    }, 1000)
  }

  render() {
    return ( !this.state.isReady ? <SplashPage /> : <Root /> )
  }
}
