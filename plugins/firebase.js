import firebase from "firebase/app"

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBD7D06SLUuEFzU28QfAVo9okv5-SEkAp8",
    authDomain: "nuxt-practice-3dbac.firebaseapp.com",
    databaseURL: "https://nuxt-practice-3dbac.firebaseio.com",
    projectId: "nuxt-practice-3dbac",
    storageBucket: "nuxt-practice-3dbac.appspot.com",
    messagingSenderId: "611832719315",
    appId: "1:611832719315:web:d928e1be83aee49622f126"
  })
}
  
  export default firebase
  