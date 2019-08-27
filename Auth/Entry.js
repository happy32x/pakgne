import React from 'react'

import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'

import Store from '../src/Store/configureStore'
import Root from '../src/Navigation/Root'

export default class Entry extends React.Component {

  static navigationOptions = {
    header: null
  }

  render() {
    let persistor = persistStore(Store)
    return (
      <Provider store={Store}>
        <PersistGate persistor={persistor}>
          <Root />
        </PersistGate>
      </Provider>
    )
  }
}
