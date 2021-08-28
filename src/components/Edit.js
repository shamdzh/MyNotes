import React, { useContext, useState }  from "react";
import { FirebaseContext } from "../context/firebase/firebaseContext";
import axios from 'axios';

export const Edit = ({ currentNote }) => {
  const [title, setTitle] = useState(currentNote.title);
  const [text, setText] = useState(currentNote.text);
  const firebase = useContext(FirebaseContext);
  const url = 'https://mynotes-e2d75-default-rtdb.firebaseio.com';

  const editNotes = async (title, text) => {
    const res = await axios.put(`${url}/notes/-MhkhXl4mPwSc_OmYpfv.json/`, {
        title: title,
        text: text
    });

    // if(res.data == null) {
    //     return;
    // }

    // const payload = Object.keys(res.data).map(key => {
    //     return {
    //         ...res.data[key],
    //         id: key
    //     }
    // })

    // dispatch({type: GET_NOTES, payload})
    
    console.log(res);
}

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (title.trim()) {
      firebase
        .addNote(title.trim(), text.trim())
        .then(() => {
          console.log("Заметка была добавлена");
        })
        .catch(() => {
          console.log("Произошла ошибка");
        });

      setTitle("");
      setText("");
    } else {
      console.log("Введите название заметки");
    }
  };

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
          onClick={() => editNotes(currentNote.title, currentNote.text)}
          type="button"
          class="addBtn btn btn-lg"
        >
          Сохранить изменения
        </button>
      </div>
    </div>
  );
};
