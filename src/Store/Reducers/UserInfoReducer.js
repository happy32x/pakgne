const initialState = { currentUser: {} }

function UserInfoReducer(state = initialState, action) {    

  let nextState
  switch (action.type) {
    case 'UPDATE_USER_INFO':
      nextState = {
        currentUser: { ...action.value }
      }            
      return nextState || state
    case 'ADD_NEW_ACCESS__ID_TOKEN':
      nextState = {
        currentUser: { 
          ...state,
          accessToken: action.value.access_token,
          idToken: action.value.id_token
        }
      }            
      return nextState || state
    default:
      return state
  }
}

export default UserInfoReducer

