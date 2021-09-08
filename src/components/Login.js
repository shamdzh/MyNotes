import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../context/firebase/firebaseContext";
import { useHistory } from "react-router-dom";

export const Login = () => {
  const { auth, user, signInWithPopup, GoogleAuthProvider } = useContext(FirebaseContext);
  const provider = new GoogleAuthProvider();
  const [check, setCheck] = useState(false);
  const history = useHistory();

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
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div class="d-flex flex-wrap justify-content-center">
      <button class="authBtn btn" type="submit" onClick={login}>
        Войти
      </button>
    </div>
  )
};
