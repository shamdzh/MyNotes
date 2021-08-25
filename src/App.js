import React from "react";
import { Navbar } from "./components/Navbar";
import { FirebaseState } from "./context/firebase/firebaseState";
import { Main } from "./pages/Main";
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { Note } from "./pages/Note";

function App() {
  return (
    <FirebaseState>
     <BrowserRouter>
      <Navbar /> 
      <div className="container pt-5">
        <Switch>
          <Route exact path="/" component={Main}/>
          <Route exact path="/note" component={Note}/>
        </Switch>
      </div>
      </BrowserRouter>
    </FirebaseState>
    
  );
}

export default App;
