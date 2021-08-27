import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import * as serviceWorker from './serviceWorker';

console.log(
    "%cOmega",
    "font-family: Righteous, sans-serif; color: #c53431; font-size: 24px; line-height: 2; margin-bottom: 4px"
);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
