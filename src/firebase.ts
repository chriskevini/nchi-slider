import {initializeApp} from "firebase/app";
import {getFirestore, collection, addDoc} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCRb1Pf09W3TOwugVF92b-N_hxhobtUp5A",
  authDomain: "chris-irineo.firebaseapp.com",
  projectId: "chris-irineo",
  storageBucket: "chris-irineo.appspot.com",
  messagingSenderId: "317884967129",
  appId: "1:317884967129:web:1878d016492fa8151fb6c8",
  measurementId: "G-W8XVG7JY72",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log(db);

export async function submitScore(scoreInfo: {}) {
  const scoresRef = collection(db, "nchiSlider", "db", "scores");
  return addDoc(scoresRef, scoreInfo);
}
