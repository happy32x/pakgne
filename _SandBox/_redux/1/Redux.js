//STATE ---------------------------------------
let state = {
    todos: [
        { text: 'Eat food', completed: true },
        { text: 'Exercice', completed: false }
    ],
    visibilityFilter: 'SHOW_COMPLETED'
}

//ACTION --------------------------------------------------
let action = [
    { type: 'ADD_TODO', text: 'Go to swimming pool' },
    { type: 'TOGGLE_TODO', index: 1 },
    { type: 'SET_VISIBILITY_FILTER' , filter: 'SHOW_ALL' }
]

//REDUCER ------------------------------------------------------------------------------
let visibilityFilter_REDUCER = (state = 'SHOW_ALL', action) => {
    return action.type === 'SET_VISIBILITY_FILTER' ? action.filter : state
}

let todos_REDUCER = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO' : return state.concat([ {text: action.text, completed: false} ])
        case 'TOGGLE_TODO' : return state.map( 
            (todo, index) => action.index === index
                ? { text: todo.text, completed: !todo.completed }
                : todo
            )
        default: return state
    }
}

let main_REDUCER = (state = {}, action) => {
    return {
        todos: todos_REDUCER(state.todos, action),
        visibilityFilter: visibilityFilter_REDUCER(state.visibilityFilter, action)
    }
}

//EXEC ------------------------------
state = main_REDUCER(state, action[0])
state = main_REDUCER(state, action[1])
state = main_REDUCER(state, action[2])


 