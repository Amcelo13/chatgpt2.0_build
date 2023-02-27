import {getApp, getApps, initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRueOVt6wwQPqFMxM66t0Us6dijReAMUs",
  authDomain: "chatgpt-clone-build.firebaseapp.com",
  projectId: "chatgpt-clone-build",
  storageBucket: "chatgpt-clone-build.appspot.com",
  messagingSenderId: "607038145169",
  appId: "1:607038145169:web:2ee311252b78ea79553530"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig); //THIS ONLY FOR REACT APP BUT WE ARE USING NEXT.js so we use getAapps to counter if we already have initialised app
//      THIS APPROACH OF IS CALLED SINGLETON PATTERN IN CODING TO GET A SINGLE INSTANCE 
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)

export {db}