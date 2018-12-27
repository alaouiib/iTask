import firebase from 'firebase/app'
import firestore from 'firebase/firestore'


var config = {
   apiKey: "AIzaSyDbXKirXzP6N_7n9qI9OlE8gl-TFe8kvK0",
   authDomain: "itasks-91130.firebaseapp.com",
   databaseURL: "https://itasks-91130.firebaseio.com",
   projectId: "itasks-91130",
   storageBucket: "itasks-91130.appspot.com",
   messagingSenderId: "26630697813"
 };
 const firebaseApp = firebase.initializeApp(config);
 firebaseApp.firestore().settings({ timestampsInSnapshots: true })


// export firestore to be able to interact with the db anywhere
export default firebaseApp.firestore()
