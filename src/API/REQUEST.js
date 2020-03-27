import DATA from './DATA'
import { withStateHandlers } from 'recompose'

import { 
  setAccessToken,
  setRefreshToken,
  setAccessTokenTimeOut,

  getAccessToken,
  getRefreshToken,
  getAccessTokenTimeOut,
} from '../Store/storeData'

const apiKey = DATA.KEY
const channelId = DATA.CHANNEL_ID
const results = DATA.REQUEST_NUMBER
const resultsRelatedToVideoId = 10
const androidClientID = DATA.ANDROID_CLIENT_ID

//Récupérer une liste de videos
export function getVideoListFromApi (order, pageToken) {
  const url = `https://www.googleapis.com/youtube/v3/search/?key=${apiKey}&channelId=${channelId}&part=snippet&order=${order}&maxResults=${results}${pageToken}`
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

//Récupérer une liste de videos de resultat de recherche
export function getVideoListMiniFromApi (keyWord, pageToken) {
  const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&q=${keyWord}&maxResults=${results}${pageToken}`
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

//Récupérer une liste de videos relative à la video actuelle
export function getVideoListMiniRelatedToVideoIdFromApi (videoId) {  
  const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&type=video&maxResults=${resultsRelatedToVideoId}&relatedToVideoId=${videoId}`
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

//Récupérer les infos d'une video
export function getVideoInfoFromApi (videoId) {
  const url = `https://www.googleapis.com/youtube/v3/videos?part=id,statistics,contentDetails&id=${videoId}&key=${apiKey}`
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

//Récupérer une liste de sous-comentaires (commentId : UgyfGyvTA8OzJ3ilUOd4AaABAg , UgwLj19LmkKZddNcdJh4AaABAg, UgzTt0YulIuUMp5DslN4AaABAg)
export function getCommentListReplyFromApi (commentId, pageToken) {
  const url = `https://www.googleapis.com/youtube/v3/comments?key=${apiKey}&parentId=${commentId}&part=snippet&maxResults=${results}${pageToken}`
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

//Récupérer une liste de commentaires
export function getCommentListFromApi (videoId, order, pageToken) {
  const url = `https://www.googleapis.com/youtube/v3/commentThreads?key=${apiKey}&videoId=${videoId}&order=${order}&part=snippet&maxResults=${results}${pageToken}`
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

//Récupérer un unique commentaire
export function getOneCommentFromApi (videoId, order) {
  const url = `https://www.googleapis.com/youtube/v3/commentThreads?key=${apiKey}&videoId=${videoId}&order=${order}&part=snippet&maxResults=1`
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

//Récupérer des données pour savoir si l'utilisateur est abonné à une chaîne
export function getSubscriptionStatusFromApi (accessToken) {
  const url = `https://www.googleapis.com/youtube/v3/subscriptions?forChannelId=${channelId}&part=snippet&mine=true`

  return fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Host': 'www.googleapis.com',
      'Content-length': '0',
      'Authorization': `Bearer ${accessToken}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => console.error("REQUEST :: getSubscriptionStatusFromApi :: ERROR :: " + error))
}

//Subscribe to channel
export async function subscribeToChannel (accessToken) { 
  const url = `https://www.googleapis.com/youtube/v3/subscriptions?part=snippet`
  const data = `{"snippet":{"resourceId":{"kind":"youtube#channel","channelId":"${channelId}"}}}`
  //--data '{"snippet":{"resourceId":{"kind":"youtube#channel","channelId":"UC_x5XG1OV2P6uZZ5FSM9Ttw"}}}'

  const response = await fetch(url, {  
                          method: 'POST',
                          headers: {                 
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`,
                          },
                          body: data
                          //body: JSON.stringify({a: 1, b: 'Textual content'})
                        })
  const json = await response.json()
  return json   
}  

//UnSubscribe to channel
export async function unSubscribeToChannel (accessToken, subscriptionID) { 
  const url = `https://www.googleapis.com/youtube/v3/subscriptions?id=${subscriptionID}`  
  const response = await fetch(url, {  
                          method: 'DELETE',
                          headers: {       
                            'Accept': 'application/json',        
                            'Content-Type': 'application/json',  
                            'Authorization': `Bearer ${accessToken}`,                            
                          },    
                        })
  const json = await response
  return json    
}

//Récupérer des données pour savoir si l'utilisateur a rate une vidéo
export function getVideoRateDataFromApi (accessToken, videoId) { 
  const url = `https://www.googleapis.com/youtube/v3/videos/getRating?id=${videoId}`

  return fetch(url, {  
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .catch((error) => console.error("REQUEST :: getVideoRateDataFromApi :: ERROR :: " + error))
}

//Rate une vidéo
export async function rateVideoFromApi (accessToken, videoId, rating) { 
  const url = `https://www.googleapis.com/youtube/v3/videos/rate?id=${videoId}&rating=${rating}`

  const response = await fetch(url, {  
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Authorization': `Bearer ${accessToken}`,
                      'Content-Type': 'application/json',
                    },
                  })
  const json = await response
  return json                
}

//commenter une video
export async function commentVideo (accessToken, videoId, textOriginal) {
  const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet`  
  const data = `{
                  "snippet": {
                    "videoId": "${videoId}",
                    "topLevelComment": {
                      "snippet": {
                        "textOriginal": "${textOriginal}"
                      }
                    }
                  }
                }`
  const response = await fetch(url, {  
                          method: 'POST',
                          headers: {                 
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`,
                          },
                          body: data                          
                        })
  const json = await response.json()
  return json   
}  

//Supprimer un commentaire
export async function deleteCommentFromApi (accessToken, commentId) { 
  const url = `https://www.googleapis.com/youtube/v3/comments?id=${commentId}`

  const response = await fetch(url, {  
                    method: 'DELETE',
                    headers: {
                      'Accept': 'application/json',
                      'Authorization': `Bearer ${accessToken}`,
                      'Content-Type': 'application/json',
                    },
                  })
  const json = await response
  return json                
}

//editer un top Commentaire
export async function editTopCommentFromApi (accessToken, commentId, textOriginal) {
  const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet`  
  const data = `{
                  "id": "${commentId}",
                  "snippet": {
                    "topLevelComment": {
                      "snippet": {
                        "textOriginal": "${textOriginal}"
                      }
                    }
                  }
                }`
  const response = await fetch(url, {  
                          method: 'PUT',
                          headers: {                 
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`,
                          },
                          body: data                    
                        })
  const json = await response.json()
  return json
}

//commenter un commentaire
export async function commentComment (accessToken, topCommentId, textOriginal) {
  const url = `https://www.googleapis.com/youtube/v3/comments?part=snippet`
  const data = `{
                  "snippet": {
                    "parentId": "${topCommentId}",
                    "textOriginal": "${textOriginal}"
                  }
                }`
  const response = await fetch(url, {
                          method: 'POST',
                          headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`,
                          },
                          body: data
                        })
  const json = await response.json()
  return json
}

//editer un Commentaire
export async function editCommentFromApi (accessToken, commentId, textOriginal) {
  const url = `https://www.googleapis.com/youtube/v3/comments?part=snippet`
  const data = `{
                  "id": "${commentId}",
                  "snippet": {
                    "textOriginal": "${textOriginal}"
                  }
                }`
  const response = await fetch(url, {  
                          method: 'PUT',
                          headers: {                 
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`,
                          },
                          body: data                    
                        })
  const json = await response.json()
  return json
}













//=========================================================

//Pour eviter les doublons, il faut s'assurer 
//qu'en amont, on n'execute pas getNewTokenFromApi_Filter()
//plus d'une fois au cours d'un process
export function getNewTokenFromApi_Filter(callback) {     
  console.log(isAccessTokenValid())
  if(isAccessTokenValid() === false) { //false

    __waiters.push(callback)
    __waiters__premier++
    console.log('REQUEST :: getNewTokenFromApi_Filter :: __waiters__premier :: ' + __waiters__premier)
    console.log('REQUEST :: getNewTokenFromApi_Filter :: __waiters.length :: ' + __waiters.length)

    if(!__gettingNewTokenInProgress){
      __gettingNewTokenInProgress = true
      exectOneTime(getNewTokenFromApi)
    } 

  } else if (isAccessTokenValid() === true) { //true
    //__waterloo.push(callback)
    __waiters__second++
    console.log('REQUEST :: getNewTokenFromApi_Filter :: __waiters__second :: ' + __waiters__second)
    callback(__accessToken)
  }

}

//Récupérer un nouveau token
function getNewTokenFromApi () {

  getRefreshToken().then( refreshToken => {
    const url = `https://www.googleapis.com/oauth2/v4/token?client_id=${androidClientID}&grant_type=refresh_token&refresh_token=${refreshToken}`

    getTokenDataAccess(url)
      .then((res) => {  
        console.log('REQUEST :: getRefreshToken :: getTokenDataAccess :: res :: ' + JSON.stringify(res))        
        __accessToken__timeout_presave = Math.floor(Date.now() / 1000)                    
        return res

        //(async () => {
          //__accessToken = res.access_token
        //})().then( () => {
          //__accessToken__timeout =  __accessToken__timeout_presave 
        //})
        
      })
      .then((res) => { 
        __accessToken = res.access_token 
        console.log('WWW 1')
        return res
      })
      .then((res) => {        
        __accessToken__timeout =  __accessToken__timeout_presave
        console.log('WWW 2')
        return res
      })
      .then((res) => {  
        console.log('WWW 3')      
        setAccessTokenTimeOut( __accessToken__timeout_presave ).then(() => {
          console.log('REQUEST :: getNewTokenFromApi :: getRefreshToken :: getTokenDataAccess :: setAccessTokenTimeOut :: accessTokenTimeOut successful saved !')                                                   
          setAccessToken(res.access_token).then(() => {      
            console.log('REQUEST :: getNewTokenFromApi :: getRefreshToken :: getTokenDataAccess :: setAccessTokenTimeOut ::  setAccessToken :: accessToken successful saved !')                                                                         
            getNewTokenFromApi_Succeed(res.access_token) 
          }) 
        })                 
      })
      .catch((err) => {
        console.error("REQUEST :: getNewTokenFromApi :: getRefreshToken :: ERROR :: " + err)
        //Il y a perte de connection
        //getNewTokenFromApi_Initialize()
      })
  })

}

async function getTokenDataAccess(url) {
  const response = await fetch(url, {  
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                          },
                        })
  const json = await response.json()
  console.log('REQUEST :: getTokenDataAccess :: json :: ' + json)    // <-- (5) [Object, Object, Object, Object, Object]
  return json
}

function getNewTokenFromApi_Succeed(newAccessToken) {  
  let __waiters__callback
  console.log("BEGIN ::" + __waiters.length)
  //do {
    __waiters__callback = __waiters
    for(let i=0; i<__waiters__callback.length; i++) {
      __waiters__callback[i](newAccessToken)
      //__waiters.shift()
    }
  console.log("END ::" + __waiters.length)
  //}while(__waiters.length !== 0)  

  getNewTokenFromApi_Initialize()

  //BLOC OBSOLETE MAIS A RELIRE AVANT DE SUPPRIMER
  /*
    A CE STADE DE L'EXECUTION DU PROGRAMME, LE [CAS DE FIGURE] SUIVANT EST
    UNIQUEMENT ENVISAGEABLE SI LES DEUX [EVENEMENTS] SUIVANTS S'EXECUTENT SIMULTANEMENTS.
    DANS CE CAS LA [SOLUTION] SUIVANTE S'APPLIQUERA

    [EVENEMENTS]
      - [là-bas] le accessToken vient d'expirer et composant s'enregistre dans le tableau des __waiters [ici]
      - au même moment, [ici] on vient de finir la boucle (car elle a duré plus d'une minute) 
      mais on n'a pas encore initialisé (getNewTokenFromApi_Initialize())

    [CAS DE FIGURE]
      A ce moment précis, un élement 
      peut entrer dans les __waiters et peut définitivement être oublié si on 
      initialise les waiters, raison pour laquelle on ne les initialize pas/jamais mais 
      on laisse plutôt le soin à .shift via la boucle "do ... while"
      de le faire au fur et à mesure de l'execution de chaque élément du tableau.

    [SOLUTION]
      L'élément ainsi stocké dans __waiters pourra être executé
      grace à une serie de [setTimeout()] intelligent qui se déclenchera 
      à chaque tour, jusqu'à l'obtention d'un nouvel accessToken
                      
      Si le problème persiste, au bout d'un certain temps, la série d'appel s'arrête
      et l'application considère que l'utilisateur a perdu définitivement sa connexion internet.
      
      Par la suite on mettra en place un système de détection automatique de connection internet
      comme cela se fait sur l'app youtube, pour réenclencher le processus    
      
      NB: Cette solution n'est pas infaillible
  */
}

function getNewTokenFromApi_Initialize() {  

  exectOneTime = (function() {
    let executed = false
    return function(fn) {
        if (!executed) {
            console.log("exectOneTime")
            executed = true
            fn()
        }
    }
  })()
  __waiters = []  
  __gettingNewTokenInProgress = false 

  //BLOC OBSOLETE MAIS A RELIRE AVANT DE SUPPRIMER
  /*if(__waiters.length !== 0) { //Ceci siginfie que La boucle [do ... while] dans 
                               //la fonction [getNewTokenFromApi_Succeed_A] a duré plus d'une minute 
                               //ou alors il y a perte de connection    

    //Lire [SOLUTION] écrit plus haut, 
    //pour améliorer cette partie du code plutard

    //Ici on va executer le setTimeout
    getNewTokenFromApi() //on vérifie d'abord si le token a expiré avant d'executer
  } else {
    exectOneTime = (function() {
      let executed = false
      return function(fn) {
          if (!executed) {
              console.log("exectOneTime")
              executed = true
              fn()
          }
      }
    })()
    __gettingNewTokenInProgress = false    
  }*/
}

function isAccessTokenValid() {  
  return (Math.floor(Date.now() / 1000))-__accessToken__timeout < 3300 ? true : false //on a une marge d'environ 5 min(300s) avant l'expirartion réel du token
}

let exectOneTime = (function() {
  let executed = false
  return function(fn) {
      if (!executed) {
          console.log("exectOneTime")
          executed = true
          fn()
      }
  }
})()

let __waiters = []
let __waiters__premier = 0
let __waiters__second = 0
let __gettingNewTokenInProgress = false

let __accessToken = null
let __accessToken__timeout = null 
let __accessToken__timeout_presave = null

//Avant Authentification
getAccessToken().then((accessToken) => {
  if(accessToken) {
    console.log('REQUEST :: getAccessToken :: accessToken :: ' + accessToken)
    __accessToken = accessToken //'reboot' Reboot accessToken
  }
})

getAccessTokenTimeOut().then((accessTokenTimeOut) => {
  if(accessTokenTimeOut) {
    console.log('REQUEST :: getAccessTokenTimeOut :: accessTokenTimeOut :: ' + accessTokenTimeOut)
    __accessToken__timeout = Number(accessTokenTimeOut) //0 Reboot accessToken
  }  
})

//Reboot accessToken
/*setAccessToken('reboot').then(() => {
  console.log('accesToken rebooted !')
  setAccessTokenTimeOut( 0 ).then(() => {
    console.log('accesTokenTimeOut rebooted !')
  })
}) */

//Après Authentification
export function setAccessTokenRequest(accessToken) {   
  console.log('REQUEST :: setAccessTokenRequest :: accessToken :: ' + accessToken) 
  __accessToken = accessToken
}

export function setAccessTokenTimeOutRequest(accessTokenTimeOut) {   
  console.log('REQUEST :: setAccessTokenTimeOutRequest :: accessTokenTimeOut :: ' + accessTokenTimeOut)  
  __accessToken__timeout = Number(accessTokenTimeOut)
}