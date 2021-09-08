import React, { Fragment, useContext, useEffect } from "react";
import { Card } from "../components/Card";
import { Form } from "../components/Form";
import { Login } from "../components/Login";
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
      <Form />
      <hr />

      <Card notes={notes} />
    </Fragment>
  ) : (
    <Login />
  );
};
