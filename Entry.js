import React from 'react'
import Root from './src/Navigation/Root'

import { Provider } from 'react-redux'
import Store from './src/Store/configureStore'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'

export default class Entry extends React.Component {
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
