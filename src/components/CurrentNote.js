import React, { useContext } from "react";
import { FirebaseContext } from "../context/firebase/firebaseContext";


export const CurrentNote = ({currentNote}) => {
  const { CryptoJS } = useContext(FirebaseContext);

  let decrypt = (noteText) => {
    let bytes  = CryptoJS.AES.decrypt(noteText, 'note');
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  return (
    <section class="currentNote">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col col-md-8">
            <h1 class="mb-3 currentnote_title">{currentNote.title}</h1>
            <p class="currentnote_text">{decrypt(currentNote.text)}</p>
          </div>
        </div>
      </div>
    </section>

  );
};
