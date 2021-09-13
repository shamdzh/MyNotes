import React from "react";
import { Navbar } from "./components/Navbar";
import { FirebaseState } from "./context/firebase/firebaseState";
import { Main } from "./pages/Main";
import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";
import { Note } from "./pages/Note";
import { useTransition, animated } from "react-spring";
import { Alert } from "./components/Alert";
import { AlertState } from "./context/alert/alertState";
import { Login } from "./components/Login";
import { Auth } from "./pages/Auth";
import { Loader } from "./components/Loader";

function App() {
  const location = useLocation();
  console.log(location);
  const transitions = useTransition(location, { 
    from: { opacity: 0 },
    enter: { opacity: 1, position:'relative'},
    leave: { opacity: 0, display:'none' },
    config: { duration: 350 }
  });

  return (
    <FirebaseState>
      <AlertState>
      <Navbar />
        {transitions((props, item) => (
          <animated.div style={props}>
            <div style={{position: "absolute", width: "100%"}}>
            <Switch location={item}>
              <Route exact path="/" component={Main} />
              <Route exact path="/auth" component={Auth} />
              <Route exact path="/note" component={Note} />
            </Switch>
            </div>
          </animated.div>
        ))}
      
      </AlertState>
    </FirebaseState>
  );
}

export default App;
