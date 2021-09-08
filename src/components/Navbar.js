import React, { useContext } from "react";
import { useHistory } from "react-router";
import { AlertContext } from "../context/alert/alertContext";
import { FirebaseContext } from "../context/firebase/firebaseContext";

export const Navbar = () => {
  const { auth, signOut } = useContext(FirebaseContext);
  const { hide } = useContext(AlertContext);
  const history = useHistory();
  return localStorage.getItem('user') ? 
  (
    <nav className="navbar navbar-dark navbar-expand-lg">
      <div className="navbar-brand">Note App</div>
      <div className="userName">
        Добро пожаловать, {JSON.parse(localStorage.getItem('user')).displayName}
        <button type="submit" onClick={() => {
          signOut(auth)
            .then(() => {
              console.log("Sign-out successful");
              localStorage.removeItem('user');
              history.push("/auth");
              hide();
            })
        }}>
          Выйти
        </button>
      </div>
    </nav>
  ) 
  :
  (
    <nav className="navbar navbar-dark navbar-expand-lg">
      <div className="navbar-brand">Note App</div>
    </nav>
  )

}
