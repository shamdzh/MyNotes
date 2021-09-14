import React, { useContext } from "react";
import { useHistory } from "react-router";
import { AlertContext } from "../context/alert/alertContext";
import { FirebaseContext } from "../context/firebase/firebaseContext";

export const Navbar = () => {
  const { auth, logOut } = useContext(FirebaseContext);
  const { hide } = useContext(AlertContext);
  const history = useHistory();
  return localStorage.getItem('user') ?
    (
      <nav className="navbar navbar-dark navbar-expand-lg">
        <div className="navbar-box d-flex justify-content-between">
          <div className="navbar-brand">MY NOTES</div>
          <div className="userName d-flex align-items-center">
            <p>Добро пожаловать, {JSON.parse(localStorage.getItem('user')).displayName}</p>
            <button className="outBtn btn btn-outline-light" type="submit" onClick={() => {
                  logOut()
                  hide();
                  history.push("/auth");
            }}>
              Выйти
            </button>
          </div>
        </div>
      </nav>
    )
    :
    (
      ''
    )

}
