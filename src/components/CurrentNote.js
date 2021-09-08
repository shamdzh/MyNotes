import React from "react";

export const CurrentNote = ({currentNote}) => {
  return (
    <section class="fdb-block">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col col-md-8 text-center">
            <h1 class="mb-3">{currentNote.title}</h1>
            <p class="lead">{currentNote.text}</p>
          </div>
        </div>
      </div>
    </section>

  );
};
