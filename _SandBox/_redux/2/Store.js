import { createStore } from 'redux'
import todoApp from './reducers'

const STATE_FROM_SERVER = {
    todos: [
        { text: 'Eat food', completed: true },
        { text: 'Exercice', completed: false }
    ],
    visibilityFilter: 'SHOW_COMPLETED'
}
​

const store = createStore(todoApp)

 //OR

const store = createStore(todoApp, STATE_FROM_SERVER)


/* 
STATE_FROM_SERVER == window.STATE_FROM_SERVER 
peut provenir du serveur ou du AsyncStorage
*/

