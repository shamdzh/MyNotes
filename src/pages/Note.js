import React, { useState, useContext } from "react";
import { CurrentNote } from "../components/CurrentNote";
import { useHistory } from "react-router-dom";
import { Edit } from "../components/Edit";
import { FirebaseContext } from "../context/firebase/firebaseContext";


export const Note = () => {
  const { currentNote } = useContext(FirebaseContext);
  const history = useHistory();
  const [edit, setEdit] = useState(false);

  console.log(edit);
  console.log(currentNote)
  

  return (
    <>
      
      {!edit ? <CurrentNote currentNote = {currentNote} /> : <Edit currentNote = {currentNote} />}
      

      <div class="btn_group d-flex justify-content-center ">
        <div class="btn_back" onClick={() => history.push("/")}>
          <img src="/img/left-arrow.png" />
          Вернуться назад
        </div>
        <div class="v_border"></div>
        <div class="btn_edit" onClick={() => setEdit(true)}>
          <img src="/img/pencil.png" />
          Редактировать заметку
        </div>
      </div>
    </>
  );
};
