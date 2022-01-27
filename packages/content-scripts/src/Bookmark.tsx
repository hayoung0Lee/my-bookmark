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

const Button = ({
  children,
  onClick,
}: {
  children: JSX.Element | string;
  onClick: (e?: MouseEvent) => void;
}) => {
  return (
    <button className="px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm mx-2">
      {children}
    </button>
  );
};

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
        className={`overflow-y-auto fixed right-0 w-[500] h-full bg-slate-100 g-cyan-500 shadow-lg shadow-cyan-500/50 opacity-100 p-3`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Button
          onClick={(e) => {
            e.stopPropagation();
            openModal((prev) => !prev);
          }}
        >
          create
        </Button>
        <Button onClick={closeBookMark}>close</Button>
        <BookmarkMain bookmarks={bookmarks} />
      </div>
    </BgWrapper>
  );
};

export default Bookmark;
