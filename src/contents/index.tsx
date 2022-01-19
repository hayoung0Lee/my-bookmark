// (async () => {
//   console.log("Ts");
//   const src = chrome.runtime.getURL("dist/contents/main.js");
//   const contentScript = await import(src);
//   contentScript.main(/* chrome: no need to pass it */);
// })();
// import { something } from "./main";
// something();

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

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

ReactDOM.render(<h1>Hello, world!</h1>, rootDom);
