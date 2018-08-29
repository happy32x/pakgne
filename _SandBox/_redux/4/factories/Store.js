import { createStore } from 'redux'
import Reducer from './Reducer'
import STATE_FROM_SERVER from './State'

const Store = createStore(Reducer, STATE_FROM_SERVER)

export default Store


/*

const store = createStore(Reducer)
OR
const store = createStore(Reducer, STATE_FROM_SERVER)

STATE_FROM_SERVER === window.STATE_FROM_SERVER 
peut provenir du serveur ou du AsyncStorage

*/

