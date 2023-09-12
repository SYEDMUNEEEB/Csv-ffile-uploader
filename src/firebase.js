import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyAlWqTAEQ-sTqn9ni5NoxEd9ykNkYSRfkM",
  authDomain: "csv-file-upload.firebaseapp.com",
  projectId: "csv-file-upload",
  storageBucket: "csv-file-upload.appspot.com",
  messagingSenderId: "213508949969",
  appId: "1:213508949969:web:6e350ccad02d0e013982f0",
  measurementId: "G-32R5YHB7DD"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
