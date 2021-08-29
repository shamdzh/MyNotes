import React, { useContext } from "react";
import { FirebaseContext } from "../context/firebase/firebaseContext";
import { useHistory } from "react-router-dom";

export const Card = ({ notes }) => {
  const { getCurrentNote, removeNote } = useContext(FirebaseContext);
  let history = useHistory();

  return notes.map((note) => (
    <div onClick={() => {
      getCurrentNote(note)
      history.push("/note");
    }} class="card text-dark bg-light mb-3">
      <div class="card-header d-flex justify-content-between align-items-center">
        {note.date}
        <button onClick={(e) => {
          e.stopPropagation()
          removeNote(note.id)
          console.log("Удаление заметки...")
        }} type="button" class="btn-close" aria-label="Close"></button>
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
