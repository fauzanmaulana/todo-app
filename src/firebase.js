import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCSS1IKVE1LHm-x-CU0__Tb3tcBWg2GeIo",
    authDomain: "own-todo-list.firebaseapp.com",
    databaseURL: "https://own-todo-list.firebaseio.com",
    projectId: "own-todo-list",
    storageBucket: "own-todo-list.appspot.com",
    messagingSenderId: "194687361201",
    appId: "1:194687361201:web:3a25cb83ee53ff2da40290",
    measurementId: "G-1WPJBW84PS"
})

const db = firebaseApp.firestore()

export default db