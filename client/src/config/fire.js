import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyCnPpvWeo23iQrfClcJ-yA4kHasV7_f3NM",
  authDomain: "onlinechat-a4573.firebaseapp.com",
  databaseURL: "https://onlinechat-a4573.firebaseio.com",
  projectId: "onlinechat-a4573",
  storageBucket: "onlinechat-a4573.appspot.com",
  messagingSenderId: "430917770367",
  appId: "1:430917770367:web:d924c920ce14c70208f34a",
  measurementId: "G-4TWFFDWZRX",
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
