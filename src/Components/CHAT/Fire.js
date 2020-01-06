import firebase from 'firebase'

class Fire {
  constructor() {    
    
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

}

Fire.shared = new Fire()
export default Fire
