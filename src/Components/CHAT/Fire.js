import firebase from 'firebase'

class Fire {
  constructor() {
    this.init()
    this.observeAuth()
  }

  observeAuth = () => 
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged)

  onAuthStateChanged = user => {
    if(!user) {
      try { firebase.auth().signInAnonymously() }
      catch ({ message }) { alert(message) }
    }
  }

  get ref() {
    return firebase.database().ref('messages')
  }
  get uid() {
    return (firebase.auth().currentUser || {}).uid
  }
  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP
  }  

  send = messages => {
    for (let i=0; i<messages.length; i++) {
      const { text, user } = messages[i]

      const message = {
        text,
        user,
        timestamp: this.timestamp,
      }
      
      this.append(message)
    }
  }

  append = message => this.ref.push(message)

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val()
    const { key: _id } = snapshot

    const timestamp = new Date(numberStamp)

    const message = {
      _id,
      timestamp,
      text,
      user,
    }
    return message
  }

  on = callback => 
    this.ref
      .limitToLast(20)
      .on( 'child_added', snapshot => 
                            callback(this.parse(snapshot)) 
      )

  off() {
    this.ref.off()
  }

  init = () =>
    firebase.initializeApp({
      apiKey:'AIzaSyA3PdbusUmuMA12Jy4jgCjPIe3-9kd9iSQ',
      authDomain:'my-rn-chatapp.firebaseapp.com',
      databaseURL:'https://my-rn-chatapp.firebaseio.com',
      projectId:'my-rn-chatapp',
      storageBucket:'',
      messagingSenderId:'837624391700',
    })
}

Fire.shared = new Fire()
export default Fire