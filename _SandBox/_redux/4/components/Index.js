import React from 'react'
import { Provider } from 'react-redux'
import Main from './Main'
import Store from '../factories/Store'

export default class Index extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <Main />
      </Provider>
    )
  }
}

