import firebase from 'firebase'




// Your web app's Firebase configuration
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCwWIQ-NKa9f6tgL2zbFPMPKWwEqpiETCI",
    authDomain: "chat-57e9b.firebaseapp.com",
    databaseURL: "https://chat-57e9b.firebaseio.com",
    projectId: "chat-57e9b",
    storageBucket: "chat-57e9b.appspot.com",
    messagingSenderId: "475985477873",
    appId: "1:475985477873:web:f31e9427bbc156e9e2a950",
    measurementId: "G-GP5R24XC5N"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.analytics();

export default firebase.firestore()