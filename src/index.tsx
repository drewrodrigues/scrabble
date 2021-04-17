import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import App from "./App";
import Board from "./components/board";

const rootElement = document.getElementById("root");
render(
  <Router>
    <Switch>
      <Route to="/">
        <App />
      </Route>
      <Route to="/drew">
        <Board />
      </Route>
    </Switch>
  </Router>,
  rootElement
);
