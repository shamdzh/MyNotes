import React from "react";

export const Card = ({notes}) => {
  console.log(notes);
  return notes.map((note) => (
    <div class="card text-dark bg-light mb-3">
      <div class="card-header">{note.date}</div>
      <div class="card-body">
        <h5 class="card-title">{note.title}</h5>
        <p class="card-text">
        {note.text}
        </p>
      </div>
    </div>
  ));
};
