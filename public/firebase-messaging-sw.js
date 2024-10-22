importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyA5As5BKbHxAtQLSbpB6wme_2Z0V57LpPU",
    authDomain: "pocketmind-ed11e.firebaseapp.com",
    databaseURL: 'https://pocketmind-ed11e.firebaseio.com',
    projectId: "pocketmind-ed11e",
    storageBucket: "pocketmind-ed11e.appspot.com",
    messagingSenderId: "693520526870",
    appId: "1:693520526870:web:a8d02e8a0bd9dd36904f37",
    measurementId: "G-RFFY3FL876"
});
const messaging = firebase.messaging();

// Optional:
messaging.onBackgroundMessage((m) => {
  console.log("onBackgroundMessage", m);
});

messaging.onTokenRefresh(function() {
	messaging.getToken()
	.then(function(refreshedToken) {
		console.log(refreshedToken);
		console.log('Token refreshed.');
	})
	.catch(function(err) {
		console.log('Unable to retrieve refreshed token ', err);
	});
});


// messaging.onBackgroundMessage(function(payload) {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: '/firebase-logo.png'  // 알림 아이콘 경로 설정
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
