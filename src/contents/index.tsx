import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

// alert("hello");
console.log("hello");

const findOrCreateAndAttachRoot = () => {
  if (document.getElementById("root")) {
    return document.getElementById("root");
  }
  const root = document.createElement("div");
  root.id = "memo_bookmark";
  document.getElementsByTagName("body")[0].appendChild(root);
  return root;
};

const rootDom = findOrCreateAndAttachRoot();

ReactDOM.render(<App />, rootDom);
