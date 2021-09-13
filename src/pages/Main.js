import React, { Fragment, useContext, useEffect } from "react";
import { Alert } from "../components/Alert";
import { Card } from "../components/Card";
import { Form } from "../components/Form";
import { Loader } from "../components/Loader";
import { Login } from "../components/Login";
import { FirebaseContext } from "../context/firebase/firebaseContext";

export const Main = () => {
  const { notes, getNotes, loading } = useContext(FirebaseContext);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      getNotes();
    }
  }, []);

  return localStorage.getItem("user") ? (
    <Fragment>
      <div className="container" style={{ height: "90vh" }}>
        <Alert />
        <Form />
        <hr />

        {loading ? <Loader /> : <Card notes={notes} />}
      </div>
    </Fragment>
  ) 
  : <Login />
};
