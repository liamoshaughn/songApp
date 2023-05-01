import { initializeApp } from "firebase/app";
import { getAnalytics, setUserProperties } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHZywAmdTkChUiOEAb1jsTzZjQbVR3LcU",
  authDomain: "songapp-384011.firebaseapp.com",
  projectId: "songapp-384011",
  storageBucket: "songapp-384011.appspot.com",
  messagingSenderId: "415269484901",
  appId: "1:415269484901:web:3987c1e55b71173b5c098c",
  measurementId: "G-X3KB49MSQ6",
};

// Initialize Firebase
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
setUserProperties(analytics, { user_type: "client" });
export const db = getFirestore(firebaseApp);
export const fc = getFunctions(firebaseApp, "australia-southeast1");
if (process.env.NODE_ENV == 'development') {
  connectFunctionsEmulator(fc, 'localhost', 5001);
}
