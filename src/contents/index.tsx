import React, { useEffect, useState } from "react";
import ReactDOM, { createPortal } from "react-dom";
import App from "./App";

const IFrame = ({ children }: { children: JSX.Element }) => {
  const [ref, setRef] = useState<HTMLIFrameElement | null>();
  const container = ref?.contentWindow?.document?.body;
  useEffect(() => {
    if (ref?.contentWindow?.document) {
      var cssLink = document.createElement("link");
      cssLink.href = chrome.runtime.getURL("./dist/contents/index.css");
      cssLink.rel = "stylesheet";
      cssLink.type = "text/css";
      ref?.contentWindow?.document.head.appendChild(cssLink);
    }
  }, [ref]);

  return (
    <iframe ref={setRef}>
      {container && createPortal(children, container)}
    </iframe>
  );
};

const IframeWrapper = () => {
  return (
    <IFrame>
      <App />
    </IFrame>
  );
};

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

ReactDOM.render(<IframeWrapper />, rootDom);
