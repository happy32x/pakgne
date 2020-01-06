import firebase from 'firebase'
import DATATEST from './DATATEST'

export function getDiscussionListFromApi() {
  return DATATEST
}

export function getChatFromApi(key, callback) {
  let query = null
  query = firebase.database().ref('chats/'+key)
  query.on("value", (snapshot) => {
    console.log('REQUEST :: getChatFromApi :: snapshot.val().title :: ' + snapshot.val().title)
    callback(snapshot)
  })
}

export function getUserChatsFromApi(nextPageToken) {
  let data = []
  let query = null
  let nextData = []
  let nextQuery = null

  query = nextPageToken === ''
    ? firebase.database().ref('userChats/'+firebase.auth().currentUser.uid)
      //.orderByKey()
      .limitToLast(50)
    : firebase.database().ref('userChats/'+firebase.auth().currentUser.uid)
      //.orderByKey()
      .startAt(nextPageToken.key)
      .limitToLast(50)

  return query.once("value", (snapshot) => {
      snapshot.forEach( (childSnapshot) => {        
        data.push(childSnapshot)  
        console.log("CHAT / API / REQUEST / data[0].key :: ", data[0].key) 
      })
    })
    .then(() => {
      nextPageToken = data[data.length-1]
     
      nextQuery = firebase.database().ref('userChats/'+firebase.auth().currentUser.uid)
        //.orderByKey()
        .startAt(nextPageToken.key)
        .limitToLast(2)

      nextQuery.once("value")
        .then((snapshot) => {
          snapshot.forEach((childSnapshot) => {
            nextData.push(childSnapshot)
          })
        })
    }).then(() => {
      if(nextData.length < 2)
        nextPageToken = undefined
      else
        nextPageToken = nextData[nextData.length-1]
    }).then(() => {
      console.log("CHAT / API / REQUEST / nextPageToken :: ", nextPageToken)
      console.log("CHAT / API / REQUEST / data[0].val() :: ", data[0].val())
      return {
        nextPageToken: nextPageToken,
        items: data,
      }
    })
}

export function getMessagesFromApi(nextPageToken, chatKey) {
  let data = []
  let query = null
  let nextData = []
  let nextQuery = null

  query = nextPageToken === ''
    ? firebase.database().ref('messages/'+chatKey)
      //.orderByKey()
      .limitToLast(50)
    : firebase.database().ref('messages/'+chatKey)
      //.orderByKey()
      .startAt(nextPageToken.key)
      .limitToLast(50)

  return query.once("value", (snapshot) => {
      snapshot.forEach( (childSnapshot) => {        
        data.push(childSnapshot)  
        console.log("CHAT / API / REQUEST / childSnapshot :: ", childSnapshot.key) 
      })
    })
    .then(() => {
      nextPageToken = data[data.length-1]
     
      nextQuery = firebase.database().ref('messages/'+chatKey)
        //.orderByKey()
        .startAt(nextPageToken.key)
        .limitToLast(2)

      nextQuery.once("value")
        .then((snapshot) => {
          snapshot.forEach((childSnapshot) => {
            nextData.push(childSnapshot)
          })
        })
    }).then(() => {
      if(nextData.length < 2)
        nextPageToken = undefined
      else
        nextPageToken = nextData[nextData.length-1]
    }).then(() => {
      console.log("CHAT / API / REQUEST / nextPageToken :: ", nextPageToken)
      console.log("CHAT / API / REQUEST / data.length :: ", data.length)
      console.log("CHAT / API / REQUEST / data[0].val() :: ", data[0].val())
      console.log("CHAT / API / REQUEST / data[1].val() :: ", data[1].val())
      return {
        nextPageToken: nextPageToken,
        items: data,
      }
    })
}

export function setMessageFromApi(chatKey, data, callback) {
  let messageListRef = firebase.database().ref('messages/'+chatKey)
  let newMessageRef = messageListRef.push()

  const message = {
    author_id: data.val().author_id,
    author_name: data.val().author_name,
    author_pic: data.val().author_pic,
    message: data.val().message,
    messageTimeStamp: data.val().messageTimeStamp,
  }

  newMessageRef.set(message, (error) => {
    !error
    ? callback(newMessageRef)
    : console.log("REQUEST :: setMessageFromApi :: error :: " + error)    
  })
  
}

/*
// Assume we have the following data in the Database:
{
  "users": {
    "ada": {
      "first": "Ada",
      "last": "Lovelace"
    },
    "alan": {
      "first": "Alan",
      "last": "Turing"
    }
  }
}

// Loop through users in order with the forEach() method. The callback
// provided to forEach() will be called synchronously with a DataSnapshot
// for each child:
var query = firebase.database().ref("users").orderByKey();
query.once("value")
  .then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      // key will be "ada" the first time and "alan" the second time
      var key = childSnapshot.key;
      // childData will be the actual contents of the child
      var childData = childSnapshot.val();
  });
});
*/