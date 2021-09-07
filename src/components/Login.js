import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "..";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export const Login = () => {
  const { auth } = useContext(LoginContext);
  const [user] = useAuthState(auth);
  const provider = new GoogleAuthProvider();
  const [check, setCheck] = useState(false);
  

  useEffect(() => {
    console.log("Сработал метод useEffect")
    

      if (user) {
        console.log(user)
        console.log("Вы успешно авторизовались")
      } else {
        console.log(user)
        console.log("Вы не авторизованы")
      }
  }, [check]);




  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
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
