import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, doc, getDoc, query, orderBy, getDocs, getFirestore, updateDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDoGMCqROerC7Uu3RrxR5Igy9uvHWVJAhk",
    authDomain: "vue-quiz-app-93e58.firebaseapp.com",
    databaseURL: "https://vue-quiz-app-93e58-default-rtdb.firebaseio.com",
    projectId: "vue-quiz-app-93e58",
    storageBucket: "vue-quiz-app-93e58.appspot.com",
    messagingSenderId: "442633272498",
    appId: "1:442633272498:web:56e2d3849b5e8c1a2c5dab",
    measurementId: "G-G8J58SN2E7",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();

export const getQuiz = (id) => {
    return getDoc(doc(db, "quiz", id))
        .then((data) => ({ ...data.data(), id: data.id }))
        .catch((err) => err);
};

export const getQuizes = () => {
    let q = query(collection(db, "quiz"), orderBy("createdAt", "desc"));
    return getDocs(q).then((data) => data.docs.map((d) => ({ ...d.data(), id: d.id })));
};

export const createQuiz = (data) => {
    return addDoc(collection(db, "quiz"), { ...data, createdAt: serverTimestamp() })
        .then((data) => data)
        .catch((err) => err);
};

export const editQuiz = (data) => {
    return updateDoc(doc(collection(db, "quiz"), data.id), data)
        .then((data) => data)
        .catch((err) => err);
};

export const deleteQuiz = (id) => {
    return deleteDoc(doc(db, "quiz", id));
};

export const getSubmissions = () => {
    let q = query(collection(db, "submissions"), orderBy("createdAt", "desc"));
    return getDocs(q)
        .then((data) => data.docs.map((d) => ({ ...d.data(), id: d.id })))
        .catch((err) => err);
};

export const submitSubmission = (name, quiz, score) => {
    return addDoc(collection(db, "submissions"), { name, quiz, score, createdAt: serverTimestamp() })
        .then((data) => {
            data;
        })
        .catch((err) => err);
};
