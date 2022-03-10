import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";

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
    return new Promise((resolve) => {
        getDoc(doc(db, "quiz", id)).then((data) => {
            resolve(data.data());
        });
    });
};

export const getQuizes = () => {
    return new Promise((resolve, reject) => {
        getDocs(collection(db, "quiz"))
            .then((data) => {
                let a = [];
                data.forEach((data) => {
                    a.push({ ...data.data(), id: data.id });
                });
                resolve(a);
            })
            .catch((err) => reject(err));
    });
};

export const createQuiz = (data) => {
    return new Promise((resolve, reject) => {
        addDoc(collection(db, "quiz"), data)
            .then(() => {
                resolve();
            })
            .catch(() => reject());
    });
};

export const deleteQuiz = (id) => {
    return new Promise((resolve, reject) => {
        deleteDoc(doc(db, "quiz", id))
            .then(() => {
                resolve();
            })
            .catch(() => {
                reject();
            });
    });
};
