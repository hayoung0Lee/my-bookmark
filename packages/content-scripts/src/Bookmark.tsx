import BgWrapper from "./BgWrapper";
import React, { useState, useEffect } from "react";
import {
  requestBookMarks,
  requestCloseBookMarks,
  registerContentScriptMessageListener,
  removeContentScriptMessageListener,
} from "./utils/bookmarkHandler";
import { BookmarkMessage } from "../../shared-types";
import BookmarkMain from "./BookmarkMain";

const Bookmark = ({
  closeBookMark,
  openModal,
  toggleOpen,
}: {
  closeBookMark: () => void;
  openModal: React.Dispatch<React.SetStateAction<boolean>>;
  toggleOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [bookmarks, setBookmarks] = useState<
    chrome.bookmarks.BookmarkTreeNode[]
  >([]);

  const onReceiveBookmarks = (
    message: BookmarkMessage,
    _sender: chrome.runtime.MessageSender,
    _sendResponse: (response?: any) => void
  ) => {
    toggleOpen(message.bookmarkOpen);
    setBookmarks(message.bookmarks || []);
    console.log("bookmarks", message);
  };

  useEffect(() => {
    requestBookMarks();
    registerContentScriptMessageListener(onReceiveBookmarks);

    return () => {
      removeContentScriptMessageListener(onReceiveBookmarks);
      requestCloseBookMarks();
    };
  }, []);

  return (
    <BgWrapper onClick={closeBookMark}>
      <div
        className={`overflow-y-auto fixed right-0 w-[500] h-full bg-slate-100 g-cyan-500 shadow-lg shadow-cyan-500/50 opacity-100`}
        onClick={(e) => {
          e.stopPropagation();
        }}
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
        <BookmarkMain bookmarks={bookmarks} />
      </div>
    </BgWrapper>
  );
};

export default Bookmark;
