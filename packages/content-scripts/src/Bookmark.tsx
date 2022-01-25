import BgWrapper from "./BgWrapper";
import React, { useState, useEffect } from "react";
import {
  createNewBooMark,
  requestBookMarks,
  registerContentScriptMessageListener,
  removeContentScriptMessageListener,
} from "./utils/bookmarkHandler";
import { BookmarkMessage } from "../../common";

const Bookmark = ({
  closeBookMark,
  openModal,
  toggleOpen,
}: {
  closeBookMark: () => void;
  openModal: React.Dispatch<React.SetStateAction<boolean>>;
  toggleOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const onReceiveBookmarks = (
    message: BookmarkMessage,
    _sender: chrome.runtime.MessageSender,
    _sendResponse: (response?: any) => void
  ) => {
    toggleOpen(message.bookmarkOpen);
    alert("Bookmarks");
    console.log("bookmarks", message);
  };

  useEffect(() => {
    requestBookMarks();
    registerContentScriptMessageListener(onReceiveBookmarks);

    return () => {
      removeContentScriptMessageListener(onReceiveBookmarks);
    };
  }, []);

  return (
    <BgWrapper onClick={closeBookMark}>
      <div
        className={`fixed right-0 w-[500] h-full bg-slate-100 g-cyan-500 shadow-lg shadow-cyan-500/50 opacity-100`}
      >
        Test
        <button
          className="border-solid border-2 border-indigo-600 block"
          onClick={closeBookMark}
        >
          close
        </button>
        <button
          className="border-solid border-2 border-indigo-600 block"
          onClick={(e) => {
            e.stopPropagation();
            openModal((prev) => !prev);
          }}
        >
          create New bookmark
        </button>
      </div>
    </BgWrapper>
  );
};

export default Bookmark;
