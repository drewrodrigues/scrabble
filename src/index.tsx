import React from 'react';
import { render } from "react-dom";

import App from "./App";
import Board from "./components/board";

const rootElement = document.getElementById("root");
render(
  <App />,
  rootElement
);
