importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');


let firebaseConfig = {
  projectId: 'bringoo-7d05e',
  appId: '1:1042986177263:web:866b6c3e451e1f4589411a',
  databaseURL: 'https://bringoo-7d05e.firebaseio.com',
  storageBucket: 'bringoo-7d05e.appspot.com',
  apiKey: 'AIzaSyDs_JyEVBPXVxUM_hIfOwmOlsq9NNAWZhY',
  authDomain: 'bringoo-7d05e.firebaseapp.com',
  messagingSenderId: '1042986177263',
  measurementId: 'G-4JX8YEDLTW'
};

if (!firebase.apps.length) {
  try {
      firebase.initializeApp(firebaseConfig);
  } catch (e) {
      console.log("sw error", e)
  }
}

let messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('firebase Received background message ', JSON.stringify(payload));
});
