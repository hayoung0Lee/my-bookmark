import React, { useState, useEffect } from "react";

// https://developer.chrome.com/docs/extensions/reference/runtime/#event-onMessage
const App = () => {
  const [open, toggleOpen] = useState(false);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
      toggleOpen((prev) => !prev);
    });
  }, []);

  if (open) {
    return (
      <div>
        Open
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </div>
    );
  }

  return <></>;
};

export default App;
