import React, { useContext } from "react";
import { FirebaseContext } from "../context/firebase/firebaseContext";
import { useHistory } from "react-router-dom";
import { AlertContext } from "../context/alert/alertContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export const Card = ({ notes }) => {
  const { getCurrentNote, removeNote } = useContext(FirebaseContext);
  const { show, hide } = useContext(AlertContext);
  const history = useHistory();

  return (
    <div class="cards__container d-flex flex-wrap justify-content-center">
      <TransitionGroup component={null}>
        {notes.map((note) => (
          <CSSTransition 
            key={note.id} 
            timeout={500} 
            classNames="card"
          >
            <div
              class="card text-dark bg-light mb-3"
              onClick={() => {
                getCurrentNote(note);
                hide();

                history.push("/note");
              }}
            >
              <div class="card-header d-flex justify-content-between align-items-center">
                {note.date}
                <button
                  class="btn-close"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeNote(note.id).then(() => {
                      show("Заметка была удалена...", "success");
                    });
                    console.log("Удаление заметки...");
                  }}
                  type="button"
                  aria-label="Close"
                ></button>
              </div>
              <div class="card-body">
                <h5 class="card-title">{note.title}</h5>
                <p class="card-text">{note.text}</p>
              </div>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};
