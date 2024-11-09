import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBt1GlyDU3u4tw2RY6fH4pR3cp_p5z4KC0",
  authDomain: "example-c0473.firebaseapp.com",
  projectId: "example-c0473",
  storageBucket: "example-c0473.appspot.com",
  messagingSenderId: "169286973059",
  appId: "1:169286973059:web:8ce3e1c0c6f804ed1a8db6",
  measurementId: "G-71JTKDD0X3"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);