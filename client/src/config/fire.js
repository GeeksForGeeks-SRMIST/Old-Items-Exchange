import firebase from "firebase/app";
import "firebase/storage";
const firebaseconfig = {
  apiKey: "AIzaSyBi8OGDopyNXgXUOP5nOZE_h2zrb6SG7OQ",
  authDomain: "olx-srm.firebaseapp.com",
  databaseURL: "https://olx-srm.firebaseio.com",
  projectId: "olx-srm",
  storageBucket: "olx-srm.appspot.com",
  messagingSenderId: "672697236545",
  appId: "1:672697236545:web:d5f1f238a45d47288f1ac0",
};

firebase.initializeApp(firebaseconfig);
const storage = firebase.storage();
export { storage, firebase as default };
