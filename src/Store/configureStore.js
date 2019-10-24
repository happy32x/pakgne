import { createStore } from 'redux'
import toggleFavorite from './Reducers/favoriteReducer'
import UserInfoReducer from './Reducers/UserInfoReducer'

import { persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootPersistConfig = {
  key: 'root',
  storage: storage
}

const allReducers = {
  toggleFavorite,
  UserInfoReducer,
}

export default createStore(
  persistCombineReducers(
    rootPersistConfig,
    allReducers
  )
)
