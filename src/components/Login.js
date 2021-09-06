import React, { useContext, useEffect, useState } from "react";
import { GoogleContext } from "..";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export const Login = () => {
  const { auth } = useContext(GoogleContext);
  const [user] = useAuthState(auth);
  const [userName, setName] = useState("");

  useEffect(() => { 
    console.log(user)

    if (user) {
      console.log("Вы авторизованы");
      console.log(user)
      setName(user.displayName);
    } else {
      console.log("Вы не авторизованы");
      console.log(user)
      setName("Вы не авторизованы");
    } 
  }, []);

  const login = () => {
    const provider = new GoogleAuthProvider();

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

  return (
    <div class="d-flex flex-wrap justify-content-center">
      <button class="authBtn btn btn-primary" type="submit" onClick={login}>
        Войти
      </button>

      <button
        class="authBtn btn btn-primary"
        type="submit"
        onClick={() => {
          console.log(auth.signOut());
        }}
      >
        Выйти
      </button>
     
      <div>Вы вошли как: {userName}</div>
    </div>
  );
};
