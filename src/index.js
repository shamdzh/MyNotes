import React, { createContext } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { initializeApp } from 'firebase/app';

// Add the Firebase products that you want to use
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpO_kNHjTh6LJXNNDHPmuJ4u90fmt7v08",
  authDomain: "mynotes-e2d75.firebaseapp.com",
  databaseURL: "https://mynotes-e2d75-default-rtdb.firebaseio.com",
  projectId: "mynotes-e2d75",
  storageBucket: "mynotes-e2d75.appspot.com",
  messagingSenderId: "605851805430",
  appId: "1:605851805430:web:56bb1fbe61abb2efea2ed7"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);


const auth = getAuth();
const firestore = getFirestore();

export const GoogleContext = createContext();

ReactDOM.render(
  <GoogleContext.Provider value={{
    firebase, auth, firestore
  }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GoogleContext.Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
