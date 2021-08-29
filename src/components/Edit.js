import React, { useContext, useState }  from "react";
import { FirebaseContext } from "../context/firebase/firebaseContext";
import axios from 'axios';

export const Edit = ({ currentNote }) => {
  const [title, setTitle] = useState(currentNote.title);
  const [text, setText] = useState(currentNote.text);
  const firebase = useContext(FirebaseContext);



  return (
    <div class="note-form">
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Название заметки:
        </label>
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="Введите название заметки"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">
          Текст заметки:
        </label>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          placeholder="Введите текст..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        ></textarea>
      </div>

      <div class="btnBox">
        <button
          onClick={() => firebase.editNote(currentNote.id, currentNote.date, title, text)}
          type="button"
          class="addBtn btn btn-lg"
        >
          Сохранить изменения
        </button>
      </div>
    </div>
  );
};
