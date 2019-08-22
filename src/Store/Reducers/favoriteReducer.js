import {   
  ToastAndroid, 
} from "react-native"

import firebase from 'firebase'

const initialState = { favoritesVideo: [], favoritesNews: [] }

function toggleFavorite(state = initialState, action) {    

  /*firebase.auth().onAuthStateChanged( (firebaseUser) => {      
    console.log('UID : ' + firebase.auth().currentUser.uid) 
  }) */

  let nextState
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const favoriteVideoIndex = state.favoritesVideo.findIndex(item => item[0].id.videoId === action.value[0].id.videoId)
      if (favoriteVideoIndex !== -1) {
        // Le film est déjà dans les favoris, on le supprime de la liste
        nextState = {
          ...state,
          favoritesVideo: state.favoritesVideo.filter( (item, index) => index !== favoriteVideoIndex)
        }
        ToastAndroid.show('Supprimé', ToastAndroid.SHORT)

        firebase.database().ref('/users/63JpatZJxRXZL1wFATDjzXd9Tex1').update({
          favorites: nextState
        })
      }
      else {
        // Le film n'est pas dans les films favoris, on l'ajoute à la liste      
        nextState = {
          ...state,
          favoritesVideo: [...state.favoritesVideo, action.value]
        }        
        ToastAndroid.show('Ajouté', ToastAndroid.SHORT)          

        //firebase_database_add_favorite_video(action.value)
        firebase.database().ref('/users/63JpatZJxRXZL1wFATDjzXd9Tex1').update({
          favorites: nextState
        })
      }
      return nextState || state
  default:
    return state
  }
}

export default toggleFavorite

