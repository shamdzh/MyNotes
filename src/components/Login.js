import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "..";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export const Login = () => {
  const { auth } = useContext(LoginContext);
  const [user] = useAuthState(auth);
  const [userName, setName] = useState("");
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    console.log(user)

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      console.log(localStorage.getItem('user'))
      // console.log("Вы авторизованы");
      // console.log(user)

    } else {
      // console.log("Вы не авторизованы");
      // console.log(user)
      // setName("Вы не авторизованы");
    }
  }, [userName]);

  const login = () => {
    

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        setName(result.user.displayName);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(provider);
  };

  const logOut = () => {
    signOut(auth).then(() => {
      console.log("Sign-out successful");
      localStorage.removeItem('user');
    })
    .then(() => {
      setName('');
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
