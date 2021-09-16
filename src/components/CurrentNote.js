import React from "react";

export const CurrentNote = ({currentNote}) => {
  return (
    <section class="currentNote">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col col-md-8">
            <h1 class="mb-3 currentnote_title">{currentNote.title}</h1>
            <p class="currentnote_text">{currentNote.text}</p>
          </div>
        </div>
      </div>
    </section>

  );
};
