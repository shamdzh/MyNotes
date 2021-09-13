import React, { useState, useContext } from "react";
import { CurrentNote } from "../components/CurrentNote";
import { Alert } from "../components/Alert";
import { useHistory } from "react-router-dom";
import { Edit } from "../components/Edit";
import { FirebaseContext } from "../context/firebase/firebaseContext";

export const Note = () => {
  const { currentNote } = useContext(FirebaseContext);
  const history = useHistory();
  const [edit, setEdit] = useState(false);

  return (
    <div className="container" style={{ height: "90vh" }}>
      <Alert />
      {!edit ? (
        <CurrentNote currentNote={currentNote} />
      ) : (
        <Edit currentNote={currentNote} />
      )}

      <div class="btn_group d-flex justify-content-center ">
        <div class="btn_back" onClick={() => history.push("/")}>
          <img src="/img/left-arrow.png" />
          Вернуться назад
        </div>
        <div class="v_border"></div>
        <div
          class="btn_edit d-flex"
          onClick={() => {setEdit(true);}}>
          <div><img src="/img/pencil.png" /></div>
          Редактировать заметку
        </div>
      </div>
    </div>
  );
};
