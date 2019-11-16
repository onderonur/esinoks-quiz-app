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

class FirebaseAPI {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.firestore();
    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.storage = app.storage();
  }

  authUser = () => this.auth.currentUser;
  user = userId => this.db.collection("users").doc(userId);
  users = () => this.db.collection("users");
  quiz = quizId => this.db.collection("quizzes").doc(quizId);
  quizzes = () => this.db.collection("quizzes");
  question = (quizId, questionId) =>
    this.quiz(quizId)
      .collection("questions")
      .doc(questionId);
  questions = quizId => this.quiz(quizId).collection("questions");

  getDocFromSnapshot = snapshot => {
    const data = {
      id: snapshot.id,
      ...snapshot.data()
    };
    return data;
  };

  getCollectionFromSnapshot = snapshot => {
    const { docs } = snapshot;
    const collection = docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return collection;
  };

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);
  doSignOut = () => this.auth.signOut();

  getQuiz = quizId => this.quiz(quizId).get();
  createQuiz = ({ title, authorId, createdAt }) =>
    this.quizzes().add({ title, authorId, createdAt });
  updateQuiz = (quizId, { title }) => this.quiz(quizId).update({ title });
  createQuestion = (quizId, { body, choices, correctAnswer, createdAt }) =>
    this.questions(quizId).add({ body, choices, correctAnswer, createdAt });
  updateQuestion = (quizId, questionId, { body, choices, correctAnswer }) =>
    this.question(quizId, questionId).update({ body, choices, correctAnswer });
  getQuizQuestions = quizId =>
    this.questions(quizId)
      .orderBy("createdAt")
      .get();
  getAuthorQuizzes = authorId =>
    this.quizzes()
      .where("authorId", "==", authorId)
      .orderBy("createdAt")
      .get();
}

const firebaseAPI = new FirebaseAPI();

export default firebaseAPI;
