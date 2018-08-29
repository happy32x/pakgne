import React from 'react'
import { createStore } from 'redux'
import ReduxComponent from './ReduxComponent' 
import ReduxReducer from './ReduxReducer'

const store = createStore(ReduxReducer)
  
export default class ReduxMain extends React.Component {
    render() {
        return (
            <ReduxComponent 
                value={store.getState()}
                onIncrement={() => store.dispatch({type:'INCREMENT'})}
                onDecrement={() => store.dispatch({type:'DECREMENT'})}
            />
        )
    }
}

store.subscribe(render)
  




