import React, { useReducer } from "react";
import axios from "axios";
import { FirebaseContext } from "./firebaseContext";
import { FirebaseReducer } from "./firebaseReducer";
import {
  ADD_NOTE,
  GET_NOTES,
  GET_CURRENT_NOTE,
  REMOVE_NOTE,
  EDIT_NOTE,
  SHOW_LOADER,
  LOGIN,
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
    apiKey: "AIzaSyCpO_kNHjTh6LJXNNDHPmuJ4u90fmt7v08",
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

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const login = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem("user", JSON.stringify(result.user));
      })
      .catch((error) => {
        console.log(error);
      });

    dispatch({ type: LOGIN });
  };

  // const logOut = () => dispatch({type: CHECK_LOGIN})

  const getNotes = async () => {
    showLoader();

    const res = await axios.get(`${url}/notes.json?auth=${JSON.parse(localStorage.getItem("user")).stsTokenManager.accessToken}`);

    if (res.data == null) {
      return;
    }

    const payload = Object.keys(res.data).map((key) => {
      return {
        ...res.data[key],
        id: key,
      };
    });

    setTimeout(() => {
      dispatch({ type: GET_NOTES, payload });
      console.log("User:");
      console.log(user);
    }, 500);

    console.log(payload);
  };

  const addNote = async (title, text) => {
    function reverseString(str) {
      return str.split("-").reverse().join("-");
    }

    const note = {
      title,
      text,
      date: reverseString(new Date().toJSON().substr(0, 10)).replace(/-/g, "."),
    };

    try {
      console.log("Пытаюсь отправить запрос на сервер...");
      const res = await axios.post(`${url}/notes.json?auth=${JSON.parse(localStorage.getItem("user")).stsTokenManager.accessToken}`,
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
      `${url}/notes/${id}.json?auth=${JSON.parse(localStorage.getItem("user")).stsTokenManager.accessToken}`
    );

    dispatch({
      type: REMOVE_NOTE,
      payload: id,
    });
  };

  const editNote = async (id, date, title, text) => {
    const editedNotes = {
      id,
      date,
      title,
      text,
    };

    try {
      console.log("Пытаюсь отправить запрос на сервер...");
      const res = await axios.put(
        `${url}/notes/${id}.json?auth=${JSON.parse(localStorage.getItem("user")).stsTokenManager.accessToken}`,
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
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
