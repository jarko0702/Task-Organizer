import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthCheck from "./AuthCheck";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={AuthCheck} />
        <Route path="/tasks" component={Tasks} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default Routes;
