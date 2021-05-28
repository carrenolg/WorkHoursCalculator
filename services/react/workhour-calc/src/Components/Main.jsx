import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home"
import Holidays from "./Holidays"
import Contact from "./Contact"

function Main() {
  return (
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/holidays" component={Holidays}></Route>
      <Route exact path="/contact" component={Contact}></Route>
    </Switch>
  );
}

export default Main;
