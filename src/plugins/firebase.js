// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
let firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

// TODO: Replace the following with your app's Firebase project configuration
let firebaseConfig = {
    apiKey: "AIzaSyBQRdgBoxBYoqesdZXaowU8hnJ4ih__6xg",
    authDomain: "gametour-global.firebaseapp.com",
    databaseURL: "https://gametour-global.firebaseio.com",
    projectId: "gametour-global",
    storageBucket: "gametour-global.appspot.com",
    messagingSenderId: "696643004399",
    appId: "1:696643004399:web:0f418d3f27e2d8cb5df81a",
    measurementId: "G-GNYB3YCT65"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
