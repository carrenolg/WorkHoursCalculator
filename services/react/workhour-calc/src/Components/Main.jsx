import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home"
import About from "./About"
import Contact from "./Contact"

function Main() {
  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/about" component={About}></Route>
      <Route exact path="/contact" component={Contact}></Route>
    </Switch>
  );
}

export default Main;
