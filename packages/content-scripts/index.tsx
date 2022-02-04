import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import App from "./src/App";
import "./index.css";
import { registerContentScriptMessageListener } from "./src/utils/bookmarkHandler";
import { IframeMessageType, TARGET_IFRAME } from "../shared-types";

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
    "w-[20px]"
  );

  const handleIframeSize = (
    message: IframeMessageType,
    _sender: chrome.runtime.MessageSender,
    _sendResponse: (response?: any) => void
  ) => {
    console.log("handleIframe Size", message);
    if (message.to === "iframe") {
      console.log("message", message);
      const { iframeOpen } = message;
      if (iframeOpen) {
        root.classList.remove("w-[20px]");
        root.classList.add("w-screen");
      } else {
        root.classList.add("w-[20px]");
        root.classList.remove("w-screen");
      }
    }
  };

  registerContentScriptMessageListener(handleIframeSize);

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
