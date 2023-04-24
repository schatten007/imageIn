const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

const firebaseConfig = {

    apiKey: process.env.FIREBASE_API_KEY,
  
    authDomain: "imagein-9248b.firebaseapp.com",
  
    projectId: "imagein-9248b",
  
    storageBucket: "imagein-9248b.appspot.com",
  
    messagingSenderId: "218528779599",
  
    appId: "1:218528779599:web:caa0aa172d21bc6320c93a",
  
    measurementId: "G-LKT9WH6ECM"
  
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

module.exports = {
    storage
}