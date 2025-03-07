import React, { useReducer } from "react";
import axios from "axios";
import CryptoJS from 'crypto-js'
import { FirebaseContext } from "./firebaseContext";
import { FirebaseReducer } from "./firebaseReducer";
import {
  ADD_NOTE,
  GET_NOTES,
  GET_CURRENT_NOTE,
  REMOVE_NOTE,
  EDIT_NOTE,
  SHOW_LOADER,
  HIDE_LOADER,
  LOGIN,
  LOGOUT
} from "../types";
import { initializeApp } from "firebase/app";

// Add the Firebase products that you want to use
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";

export const FirebaseState = ({ children }) => {
  const initialState = {
    notes: [],
    currentNote: "null",
    loading: false,
    check: false,
  };

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "",
    authDomain: "mynotes-e2d75.firebaseapp.com",
    databaseURL: "https://mynotes-e2d75-default-rtdb.firebaseio.com",
    projectId: "mynotes-e2d75",
    storageBucket: "mynotes-e2d75.appspot.com",
    messagingSenderId: "605851805430",
    appId: "1:605851805430:web:56bb1fbe61abb2efea2ed7",
  };

  // Initialize Firebase //
  const firebase = initializeApp(firebaseConfig);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const firestore = getFirestore();
  const [user] = useAuthState(auth);
  // -- Initialize Firebase  -- //

  
  const url = "https://mynotes-e2d75-default-rtdb.firebaseio.com";

  const [state, dispatch] = useReducer(FirebaseReducer, initialState);

  const decrypt = (noteText) => {
    const bytes  = CryptoJS.AES.decrypt(noteText, 'note');
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const login = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem("user", JSON.stringify(result.user));
        axios.patch(`${url}/users/${result.user.uid}.json?auth=${JSON.parse(localStorage.getItem("user")).stsTokenManager.accessToken}`,
          { email: result.user.email, name: result.user.displayName });
      })
      .catch((error) => {
        console.log(error);
      });

    dispatch({ type: LOGIN });
  };

  const logOut = async () => {
    await signOut(auth).then(() => {
      console.log("logOut successful");
      localStorage.removeItem('user')
    })

    dispatch({ type: LOGOUT });
  };

  // const logOut = () => dispatch({type: CHECK_LOGIN})

  const getNotes = async () => {
    showLoader();
    try {
      const res = await axios.get(`${url}/users/${JSON.parse(localStorage.getItem("user")).uid}/notes.json?auth=${JSON.parse(localStorage.getItem("user")).stsTokenManager.accessToken}`);

      if (res.data == null) {
        dispatch({ type: HIDE_LOADER });
        return;
      }

      const payload = Object.keys(res.data).map((key) => {
        return {
          ...res.data[key],
          id: key,
        };
      });

      dispatch({ type: GET_NOTES, payload });
    } catch (e) {
      if ((e.message).includes('401')) {
        logOut()
      };
    }

  };

  const addNote = async (title, text) => {
    function reverseString(str) {
      return str.split("-").reverse().join("-");
    }

    // Encrypt
    let ciphertext = CryptoJS.AES.encrypt(text, 'note').toString();

  

    const note = {
      title,
      text: ciphertext,
      date: reverseString(new Date().toJSON().substr(0, 10)).replace(/-/g, "."),
    };

    try {
      console.log("Пытаюсь отправить запрос на сервер...");
      const res = await axios.post(`${url}/users/${JSON.parse(localStorage.getItem("user")).uid}/notes.json?auth=${JSON.parse(localStorage.getItem("user")).stsTokenManager.accessToken}`,
        note);

      const payload = {
        ...note,
        id: res.data.name,
      };

      dispatch({ type: ADD_NOTE, payload });
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const removeNote = async (id) => {
    await axios.delete(
      `${url}/users/${JSON.parse(localStorage.getItem("user")).uid}/notes/${id}.json?auth=${JSON.parse(localStorage.getItem("user")).stsTokenManager.accessToken}`
    );

    dispatch({
      type: REMOVE_NOTE,
      payload: id,
    });
  };

  const editNote = async (id, date, title, text) => {
    // Encrypt
    let ciphertext = CryptoJS.AES.encrypt(text, 'note').toString();

    const editedNotes = {
      id,
      date,
      title,
      text: ciphertext,
    };

    try {
      console.log("Пытаюсь отправить запрос на сервер...");
      const res = await axios.put(
        `${url}/users/${JSON.parse(localStorage.getItem("user")).uid}/notes/${id}.json?auth=${JSON.parse(localStorage.getItem("user")).stsTokenManager.accessToken}`,
        {
          ...editedNotes,
        }
      );

      const payload = {
        ...editedNotes,
      };

      console.log(res);
      dispatch({ type: EDIT_NOTE, payload });
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const getCurrentNote = (note) => {
    const payload = {
      ...note,
    };

    dispatch({ type: GET_CURRENT_NOTE, payload });
  };

  return (
    <FirebaseContext.Provider
      value={{
        loading: state.loading,
        notes: state.notes,
        currentNote: state.currentNote,
        check: state.check,
        login,
        logOut,
        addNote,
        getNotes,
        getCurrentNote,
        editNote,
        removeNote,
        firebase,
        auth,
        firestore,
        user,
        signInWithPopup,
        signOut,
        provider,
        CryptoJS,
        decrypt
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
