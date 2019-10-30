import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// TODO: May split configs for prod and dev

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.firestore();
    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.storage = app.storage();
  }

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);
  doSignOut = () => this.auth.signOut();

  user = uid => this.db.collection("users").doc(uid);
  users = () => this.db.collection("users");

  quiz = uid => this.db.collection("quizzes").doc(uid);
  quizzes = () => this.db.collection("quizzes");

  question = (quizId, questionId) =>
    this.quiz(quizId)
      .collection("questions")
      .doc(questionId);
  questions = quizId => this.quiz(quizId).collection("questions");
}

const firebase = new Firebase();

export default firebase;
