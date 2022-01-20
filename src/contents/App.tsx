import React, { useState, useEffect } from "react";

// https://developer.chrome.com/docs/extensions/reference/runtime/#event-onMessage
const App = ({ open, width }: { open: boolean; width: string }) => {
  if (open) {
    return (
      <div
        className={`${width} ml-[4px] h-full w-full bg-slate-100 g-cyan-500 shadow-lg shadow-cyan-500/50`}
      >
        Open
        <h1 className="text-3xl font-bold underline decoration-green-50">
          Hello world!
        </h1>
      </div>
    );
  }

  return <></>;
};

export default App;
