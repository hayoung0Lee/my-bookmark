import React, { useEffect, useState, useRef } from "react";
import ReactDOM, { createPortal } from "react-dom";
import App from "./src/App";
import "./index.css";

const rootID = "hayoung_bookmark";

const getBookmarkRoot = (): HTMLIFrameElement | undefined => {
  return document.getElementById(rootID) as HTMLIFrameElement;
};

const createBookmarkRoot = (): HTMLIFrameElement => {
  const root = document.createElement("iframe");
  root.id = rootID;
  root.classList.add(
    "z-top",
    "fixed",
    "inset-y-0",
    "right-0",
    "h-screen",
    "opacity-70",
    "bg-slate-300"
  );
  document.getElementsByTagName("body")[0].appendChild(root);
  return root;
};

const rootDom = getBookmarkRoot() || createBookmarkRoot();

const IframeWrapper = () => {
  const { head, body } = rootDom.contentWindow.document;

  useEffect(() => {
    // handling css
    const cssLink = document.createElement("link");
    cssLink.href = chrome.runtime.getURL(
      "packages/content-scripts/dist/index.css"
    );
    cssLink.rel = "stylesheet";
    cssLink.type = "text/css";
    head.appendChild(cssLink);
  });

  return ReactDOM.createPortal(<App />, body);
};

ReactDOM.render(<IframeWrapper />, rootDom);
