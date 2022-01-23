import React, { useState, useEffect } from "react";

// https://developer.chrome.com/docs/extensions/reference/runtime/#event-onMessage
const App = ({ open, width }: { open: boolean; width: string }) => {
  const createNewBooMark = () => {
    // backgroundScript에 메시지 보냄
    chrome.runtime.sendMessage(
      { type: "create_bookmark" },
      function (response) {
        console.log("Bookmarks", response);
      }
    );
  };

  const closeBookMark = () => {
    // backgroundScript에 메시지 보냄
    chrome.runtime.sendMessage({ type: "close_bookmark" }, function (response) {
      console.log("Bookmarks", response);
    });
  };

  useEffect(() => {
    // backgroundScript에서 메시지 받음
    chrome.runtime.onMessage.addListener(async function (
      request,
      sender,
      sendResponse
    ) {
      console.log("ContentScript", request);
    });
  }, []);

  if (open) {
    return (
      <div
        className={`${width} ml-[4px] h-full w-full bg-slate-100 g-cyan-500 shadow-lg shadow-cyan-500/50`}
      >
        Test
        <button
          className="border-solid border-2 border-indigo-600"
          onClick={closeBookMark}
        >
          close
        </button>
        <button
          className="border-solid border-2 border-indigo-600"
          onClick={createNewBooMark}
        >
          click
        </button>
      </div>
    );
  }

  return <></>;
};

export default App;
