import React, { useEffect, useState, useRef } from "react";
import ReactDOM, { createPortal } from "react-dom";
import App from "./src/App";
import "./index.css";

const IFrame = ({
  open,
  children,
}: {
  open: boolean;
  children: JSX.Element;
}) => {
  const [ref, setRef] = useState<HTMLIFrameElement | null>();
  const container = ref?.contentWindow?.document?.body;

  useEffect(() => {
    if (ref?.contentWindow?.document) {
      // css
      var cssLink = document.createElement("link");
      cssLink.href = chrome.runtime.getURL(
        "packages/content-scripts/dist/index.css"
      );
      cssLink.rel = "stylesheet";
      cssLink.type = "text/css";
      ref?.contentWindow?.document.head.appendChild(cssLink);
    }
  }, [ref]);

  return (
    <iframe
      ref={setRef}
      className={`fixed z-top h-screen ${
        open ? "inset-0 w-screen" : "w-[20px] inset-y-0 right-0"
      }`}
    >
      {container && createPortal(children, container)}
    </iframe>
  );
};

const IframeWrapper = () => {
  const [open, toggleOpen] = useState(false);
  return (
    <IFrame open={open}>
      <App open={open} toggleOpen={toggleOpen} />
    </IFrame>
  );
};

const findOrCreateBookmarkRoot = () => {
  const rootID = "memo_bookmark";
  if (document.getElementById(rootID)) {
    return document.getElementById(rootID);
  }

  const root = document.createElement("div");
  root.id = rootID;
  document.getElementsByTagName("body")[0].appendChild(root);
  return root;
};

const rootDom = findOrCreateBookmarkRoot();

ReactDOM.render(<IframeWrapper />, rootDom);
