import React, { useContext, useState } from "react";
import { GoogleContext } from "..";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const Login = () => {
  const { auth } = useContext(GoogleContext);
  const [userName, setName] = useState('');
  

  const login = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider).then((result) => {
      console.log(result)
      setName(result.user.displayName)

    }).catch((error) => {
      console.log(error)
    })

    console.log(provider);
  };

  return (
    <div class="d-flex flex-wrap justify-content-center">
      <button class="authBtn btn btn-primary" type="submit" onClick={login}>
        Войти
      </button>
      <div>Вы вошли как: {userName}</div>
    </div>
  );
};
