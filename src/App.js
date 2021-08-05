import React from "react";
import { Navbar } from "./components/Navbar";
import { Main } from "./pages/Main";

function App() {
  return (
    <>
      <Navbar />
      <div className="container-fluid pt-5">
        <Main />
      </div>
    </>
  );
}

export default App;
