//  Firebase configuration
const firebaseConfig = {
  apiKey: "xxxx",
  authDomain: "xxxx",
  projectId: "xxxx",
  storageBucket: "xxxx",
  messagingSenderId: "xxxx",
  appId: "xxxx",
  measurementId: "xxxx"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Authenticate & Firestore available globally
const auth = firebase.auth();
const db = firebase.firestore();

