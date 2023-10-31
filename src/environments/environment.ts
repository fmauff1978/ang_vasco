
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

import * as firebase from "firebase/compat";

export const environment = {
  firebase: {
    projectId: 'udemy-851c0',
    appId: '1:893929255392:web:4f3629c740c69a7ffcfb85',
    storageBucket: 'udemy-851c0.appspot.com',
    apiKey: 'AIzaSyCjrfWGsnmnKrJ9_CyWK3g8QTdAEy42qXk',
    authDomain: 'udemy-851c0.firebaseapp.com',
    messagingSenderId: '893929255392',
  },

  api: {
    createUser: "http://localhost:5001/fir-course-recording-c7f3e/us-central1/createUser"
}
};




