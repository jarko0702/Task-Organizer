import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthCheck from "./AuthCheck";
import Login from "./pages/Login";
import TaskBase from "./pages/TaskBase";
import Tasks from "./pages/TasksDetail";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={AuthCheck} />
        <Route path="/tasks/:projectId" component={Tasks} />
        <Route path="/tasks/" component={TaskBase} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default Routes;
