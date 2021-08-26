import React, { useContext } from "react";
import { FirebaseContext } from "../context/firebase/firebaseContext";
import { useHistory } from "react-router-dom";

export const Card = ({ notes }) => {
  const { getCurrentNote, currentNote } = useContext(FirebaseContext);
  let history = useHistory();

  return notes.map((note) => (
    <div onClick={() => {
      getCurrentNote(note)
      history.push("/note");
    }} class="card text-dark bg-light mb-3">
      <div class="card-header">
        {note.date}
        </div>
      <div class="card-body">
        <h5 class="card-title">{note.title}</h5>
        <p class="card-text">
          {note.text}
        </p>
      </div>
    </div>
  ));
};
