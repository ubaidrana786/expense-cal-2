import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBQnoFcA-qrk2NqjL0FfpCPAc_0fu8ojrw",
    authDomain: "expense-calculator-cdb96.firebaseapp.com",
    projectId: "expense-calculator-cdb96",
    storageBucket: "expense-calculator-cdb96.appspot.com",
    messagingSenderId: "593284739096",
    appId: "1:593284739096:web:a538a7f83ec1ee03d7936d"
  };

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const signInWithGoogle = async () => {
      try {
          const res = await auth.signInWithPopup(googleProvider);
          const user = res.user;
          const query = await db
              .collection("users")
              .where("uid", "==", user.uid)
              .get();
          if (query.docs.length === 0) {
              await db.collection("users").add({
                  uid: user.uid,
                  name: user.displayName,
                  authProvider: "google",
                  email: user.email,
              });
          }
      } catch (err) {
       
          alert(err.message);
      }
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
 const storage = app.storage()

export {
    auth,
    db,
    signInWithGoogle,
    storage
};