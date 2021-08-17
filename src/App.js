import React from "react";
import { Navbar } from "./components/Navbar";
import { FirebaseState } from "./context/firebase/firebaseState";
import { Main } from "./pages/Main";

function App() {
  return (
    <FirebaseState>
      <Navbar />
      <div className="container pt-5">
        <Main />
      </div>
    </FirebaseState>
    
  );
}

export default App;
