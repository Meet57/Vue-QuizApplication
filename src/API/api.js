// Worker
// import Worker from "worker-loader!./worker";
import * as Comlink from "comlink";
export const worker = Comlink.wrap(new Worker(new URL("./worker.js", import.meta.url)));

// export worker;
// export const getQuiz = worker.getQuiz;
// export const getQuizes = worker.getQuizes;
// export const createQuiz = worker.createQuiz;
// Worker

// export const getQuiz = (id) => {
//     return getDoc(doc(db, "quiz", id))
//         .then((data) => ({ ...data.data(), id: data.id }))
//         .catch((err) => err);
// };

// export const getQuizes = () => {
//     let q = query(collection(db, "quiz"), orderBy("createdAt", "desc"));
//     return getDocs(q).then((data) => data.docs.map((d) => ({ ...d.data(), id: d.id })));
// };

// export const createQuiz = (data) => {
//     return addDoc(collection(db, "quiz"), { ...data, createdAt: serverTimestamp() })
//         .then((data) => data)
//         .catch((err) => err);
// };

// export const editQuiz = (data) => {
//     return updateDoc(doc(collection(db, "quiz"), data.id), data)
//         .then((data) => data)
//         .catch((err) => err);
// };

// export const deleteQuiz = (id) => {
//     return deleteDoc(doc(db, "quiz", id));
// };

// export const getSubmissions = () => {
//     let q = query(collection(db, "submissions"), orderBy("createdAt", "desc"));
//     return getDocs(q)
//         .then((data) => data.docs.map((d) => ({ ...d.data(), id: d.id })))
//         .catch((err) => err);
// };

// export const submitSubmission = (name, quiz, score) => {
//     return addDoc(collection(db, "submissions"), {
//         name,
//         quiz,
//         score,
//         createdAt: serverTimestamp(),
//     })
//         .then((data) => {
//             data;
//         })
//         .catch((err) => err);
// };

// export function sendMessage(msg) {
//     worker.postMessage(msg);
//     worker.onmessage = function (e) {
//         console.log(e.data);
//     };
// }
