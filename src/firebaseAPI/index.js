import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { normalize } from "normalizr";
import schemas from "schemas";
import config from "./config";

class FirebaseAPI {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.firestore();
    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.storage = app.storage();
  }

  // Authentication
  signInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);
  signInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);
  signOut = () => this.auth.signOut();
  authUser = () => this.auth.currentUser;

  // Collections and Documents
  users = () => this.db.collection("users");
  user = userId => this.users().doc(userId);
  quizzes = () => this.db.collection("quizzes");
  quiz = quizId => this.quizzes().doc(quizId);
  questions = quizId => this.quiz(quizId).collection("questions");
  question = (quizId, questionId) => this.questions(quizId).doc(questionId);
  quizImagePaths = quizId => this.quiz(quizId).collection("quizImagePaths");

  // Queries
  getQuiz = async quizId => {
    const snapshot = await this.quiz(quizId).get();
    if (!snapshot.exists) {
      return null;
    }

    const quiz = this.getDocFromSnapshot(snapshot);
    const response = normalize(quiz, schemas.quizSchema);
    return response;
  };
  getQuizQuestions = async quizId => {
    const snapshot = await this.questions(quizId)
      .orderBy("createdAt")
      .get();
    const questions = this.getCollectionFromSnapshot(snapshot);
    const response = normalize(questions, schemas.questionListSchema);
    return response;
  };
  getAuthorQuizzes = async authorId => {
    const snapshot = await this.quizzes()
      .where("authorId", "==", authorId)
      .orderBy("createdAt")
      .get();
    const quizzes = this.getCollectionFromSnapshot(snapshot);
    const response = normalize(quizzes, schemas.quizListSchema);
    return response;
  };

  // Write Operations
  createQuiz = async input => {
    const docRef = await this.quizzes().add(input);
    const { id } = docRef;
    const quiz = {
      ...input,
      id
    };
    const response = normalize(quiz, schemas.quizSchema);
    return response;
  };
  updateQuiz = async (quizId, input) => {
    const quizRef = this.quiz(quizId);
    await quizRef.update(input);
  };
  deleteQuiz = async quizId => {
    const quizRef = this.quiz(quizId);
    await quizRef.delete();
  };
  createQuestion = async (quizId, input) => {
    const questionsRef = this.questions(quizId);
    const docRef = await questionsRef.add(input);
    const { id } = docRef;
    const question = {
      ...input,
      id
    };
    const response = normalize(question, schemas.questionSchema);
    return response;
  };
  updateQuestion = async (quizId, questionId, input) => {
    const questionRef = this.question(quizId, questionId);
    await questionRef.update(input);
  };
  deleteQuestion = async (quizId, questionId) => {
    const questionRef = this.question(quizId, questionId);
    await questionRef.delete();
  };

  saveUser = async (userId, { displayName, email, photoURL }) => {
    const batch = this.db.batch();
    const userRef = this.user(userId);
    batch.set(userRef, {
      displayName,
      email,
      photoURL,
      lastSignIn: this.getFirestoreTimeStamp(new Date())
    });
    await batch.commit();
  };

  // Storage
  upload = async (file, path) => {
    const storageRef = this.storage.ref();
    const fileRef = storageRef.child(`${path}/${Date.now()}`);
    const snapshot = await fileRef.put(file);
    const snapshotRef = snapshot.ref;
    const downloadURL = await snapshotRef.getDownloadURL();
    const fullPath = snapshotRef.fullPath;
    return { downloadURL, fullPath };
  };

  // Utility Functions
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
  getFirestoreTimeStamp = date => app.firestore.Timestamp.fromDate(date);
  getCompositeKey = (...keys) => keys.join("_");
}

const firebaseAPI = new FirebaseAPI();

export default firebaseAPI;
