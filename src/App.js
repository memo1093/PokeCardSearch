import React from "react";
import "./App.css";
import CardRenderer from "./components/CardRenderer";
import { BrowserRouter as Router, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
            <CardRenderer />
      </Switch>
    </Router>
  );
}

export default App;
