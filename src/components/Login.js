import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../context/firebase/firebaseContext";
import { useHistory } from "react-router-dom";

export const Login = () => {
  const { auth, user, check, login } = useContext(FirebaseContext);
  const history = useHistory();

  useEffect(() => {
    console.log("Сработал метод useEffect");
    console.log(auth);

    if (localStorage.getItem("user")) {
      console.log("Вы успешно авторизовались");
      console.log(user);
    } else {
      console.log(user);
      console.log("Вы не авторизованы");
    }
  }, [check]);

  return (
    <div className="auth">
      <div className="auth_inner container">
        <div className="auth_img">
          <img src="/img/1.jpg" />
        </div>
        <div className="auth_form d-flex flex-column justify-content-center align-items-center">
          <div className="auth_title">MY NOTES</div>
          <div className="auth_subtitle">
            Непременно одно из лучших решений для ведения заметок
          </div>
          <button
            class="authBtn btn"
            type="submit"
            onClick={() => {
              login().then(() => history.push("/"));
            }}
          >
            Войти через Google
          </button>
        </div>
      </div>
    </div>
  );
};
