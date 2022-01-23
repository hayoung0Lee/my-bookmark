import React, { useEffect, useState, useRef } from "react";
import ReactDOM, { createPortal } from "react-dom";
import App from "./src/App";
import "./index.css";

const IFRAME_WIDTH = "300px";

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
    <iframe ref={setRef} width={open ? IFRAME_WIDTH : `10px`} height="100%">
      {container && createPortal(children, container)}
    </iframe>
  );
};

const IframeWrapper = () => {
  const [open, toggleOpen] = useState(false);
  useEffect(() => {
    chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
      toggleOpen((prev) => !prev);
    });
  }, []);

  return (
    <IFrame open={open}>
      <App open={open} width={`w-[${IFRAME_WIDTH}]`} />
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
