import React, { useContext, useEffect, useState } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

import axios from 'axios';
import { FirebaseContext } from "../context/firebase/firebaseContext";

export const Login = () => {
  const {firebase, auth, user } = useContext(FirebaseContext);
  
  const provider = new GoogleAuthProvider();
  const [check, setCheck] = useState(false);
  const url = 'https://mynotes-e2d75-default-rtdb.firebaseio.com';

  useEffect(() => {
    console.log("Сработал метод useEffect")
    console.log(auth)

      if (localStorage.getItem('user')) {
        console.log("Вы успешно авторизовались")
        console.log(user);
      } else {
        console.log(user)
        console.log("Вы не авторизованы")
      }
  }, [check]);




  const login = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem('user', JSON.stringify(result.user))
        setCheck(!check)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  const logOut = () => {
    signOut(auth)
    .then(() => {
      console.log("Sign-out successful");
      localStorage.removeItem('user');
      setCheck(!check)
    })
    .catch((error) => {
        console.log("Ошибка выхода")
      });
  };

  return localStorage.getItem('user') ?
    (
      <>
        <div>Вы успешно авторизованы, {JSON.parse(localStorage.getItem('user')).displayName}</div>
        <button
          class="authBtn btn btn-primary"
          type="submit"
          onClick={logOut}
        >
          Выйти
        </button>
      </>
    )
    :
    (
      <div class="d-flex flex-wrap justify-content-center">
        <button class="authBtn btn btn-primary" type="submit" onClick={login}>
          Войти
        </button>
      </div>
    )
};
