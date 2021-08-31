import React from "react";
import { Navbar } from "./components/Navbar";
import { FirebaseState } from "./context/firebase/firebaseState";
import { Main } from "./pages/Main";
import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";
import { Note } from "./pages/Note";
import { useTransition, animated } from "react-spring";
import { Alert } from "./components/Alert";

function App() {
  const location = useLocation();
  console.log(location);
  const transitions = useTransition(location, { 
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0, display:'none' },
    config: { duration: 350 }
   
  });

  return (
    <FirebaseState>
      <Navbar />
      <div className="container pt-5" style={{position:'relative', height: "90vh"}}>
        <Alert />
        {transitions((props, item) => (
          <animated.div style={props}>
            <div style={{position: "absolute", width:"100%"}}>
            <Switch location={item}>
              <Route exact path="/" component={Main} />
              <Route exact path="/note" component={Note} />
            </Switch>
            </div>
          </animated.div>
        ))}
      </div>
    </FirebaseState>
  );
}

export default App;
