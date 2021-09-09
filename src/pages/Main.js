import React, { Fragment, useContext, useEffect } from "react";
import { Alert } from "../components/Alert";
import { Card } from "../components/Card";
import { Form } from "../components/Form";
import { Login } from "../components/Login";
import { Navbar } from "../components/Navbar";
import { FirebaseContext } from "../context/firebase/firebaseContext";

export const Main = () => {
  const { notes, getNotes } = useContext(FirebaseContext);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      getNotes();
    }
  }, []);

  return localStorage.getItem("user") ? (
    <Fragment>
      <Navbar />
      <div className="container" style={{ height: "90vh" }}>
        <Alert />
        <Form />
        <hr />
        <Card notes={notes} />
      </div>
    </Fragment>
  ) : (
    <Login />
  );
};
