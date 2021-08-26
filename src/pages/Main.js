import React, { Fragment, useContext, useEffect } from "react";
import { Card } from "../components/Card";
import { Form } from "../components/Form";
import { FirebaseContext } from "../context/firebase/firebaseContext";

export const Main = () => {
  const { notes, getNotes } = useContext(FirebaseContext);

  useEffect(() => {
    getNotes()
  }, [])


  return (
    <Fragment>
      <Form />
      <hr />

      <div class="cards__container d-flex flex-wrap justify-content-center">
        <Card notes={notes} />
      </div>
    </Fragment>
  );
};
