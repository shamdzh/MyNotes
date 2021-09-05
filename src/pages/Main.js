import React, { Fragment, useContext, useEffect } from "react";
import { Card } from "../components/Card";
import { Form } from "../components/Form";
import { FirebaseContext } from "../context/firebase/firebaseContext";

export const Main = () => {
  const { notes, getNotes } = useContext(FirebaseContext);

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <Fragment>
      <Form />
      <hr />

      <Card notes={notes} />
    </Fragment>
  );
};
