import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "..";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export const Login = () => {
  const { auth } = useContext(LoginContext);
  const [user] = useAuthState(auth);
  const [userName, setName] = useState('');
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    console.log("Сработал метод useEffect")

      if (user) {
        console.log("Вы успешно авторизовались")
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        console.log("Вы не авторизованы")
      }


  }, [user]);

  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        setName(result.user.displayName);
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
      setName('SignOut');
      
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
