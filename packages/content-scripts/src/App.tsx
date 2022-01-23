import React, { useState, useEffect } from "react";

// https://developer.chrome.com/docs/extensions/reference/runtime/#event-onMessage
const App = ({ open, width }: { open: boolean; width: string }) => {
  // backgroundScript에서 메시지 받음
  chrome.runtime.onMessage.addListener(async function (
    request,
    sender,
    sendResponse
  ) {
    console.log("ContentScript에서 BackgroundScript에서 뭐 받음");
  });

  if (open) {
    return (
      <div
        className={`${width} ml-[4px] h-full w-full bg-slate-100 g-cyan-500 shadow-lg shadow-cyan-500/50`}
      >
        Test
        <button
          onClick={() => {
            // backgroundScript에 메시지 보냄
            chrome.runtime.sendMessage(
              { type: "get_bookmarks" },
              function (response) {
                console.log("Bookmarks", response);
              }
            );
          }}
        >
          click
        </button>
      </div>
    );
  }

  return <></>;
};

export default App;
