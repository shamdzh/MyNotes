import React, { Fragment, useContext, useEffect } from "react";
import { FirebaseContext } from "../context/firebase/firebaseContext";
import { Card } from "../components/Card";

export const Note = () => {
  const { notes, getNotes, currentNote } = useContext(FirebaseContext);

  useEffect(() => {
    getNotes()
  }, [])

  console.log(currentNote);
  return (

    <div class="cards__container d-flex flex-wrap justify-content-center">
      <div class="card text-dark bg-light mb-3">
        <div class="card-header">{currentNote.date}</div>
        <div class="card-body">
          <h5 class="card-title">{currentNote.title}</h5>
          <p class="card-text">
            {currentNote.text}
          </p>
        </div>
      </div>
    </div>

  );
};
