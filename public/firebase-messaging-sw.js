importScripts("https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js");

const firebaseConfig = {
    apiKey: "AIzaSyDVGEyNqgLCCerqbqGmUQ3mMxu8M4sYZvo",
    authDomain: "omega-numworks.firebaseapp.com",
    databaseURL: "https://omega-numworks.firebaseio.com",
    projectId: "omega-numworks",
    storageBucket: "omega-numworks.appspot.com",
    messagingSenderId: "172338146789",
    appId: "1:172338146789:web:3000e6cb87d21249c8530c",
    measurementId: "G-P9YFFF08LN"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
