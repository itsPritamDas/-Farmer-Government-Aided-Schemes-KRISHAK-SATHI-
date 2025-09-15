//  Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxlr-FHi5ehacuomCXJ5ojOCd4yD-8rb8",
  authDomain: "krishak-sathi-941e1.firebaseapp.com",
  projectId: "krishak-sathi-941e1",
  storageBucket: "krishak-sathi-941e1.firebasestorage.app",
  messagingSenderId: "910668154081",
  appId: "1:910668154081:web:5438724ed8e06f99d463a0",
  measurementId: "G-YF5B3DL09E"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Authenticate & Firestore available globally
const auth = firebase.auth();
const db = firebase.firestore();
