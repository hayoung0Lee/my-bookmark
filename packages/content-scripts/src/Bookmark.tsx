import FullSizeWrapper from "./common/FullSizeWrapper";
import React, { useState, useEffect } from "react";
import {
  requestBookMarks,
  requestCloseBookMarks,
  registerContentScriptMessageListener,
  removeContentScriptMessageListener,
} from "./utils/bookmarkHandler";
import { BookmarkMessageType } from "../../shared-types";
import BookmarkMain from "./BookmarkMain";
import Button from "./common/Button";
import { openModalType } from "./types";

const Bookmark = ({
  openModal,
  toggleBookmark,
}: {
  openModal: openModalType;
  toggleBookmark: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [bookmarks, setBookmarks] = useState<
    chrome.bookmarks.BookmarkTreeNode[]
  >([]);

  const onReceiveBookmarks = (
    message: BookmarkMessageType,
    _sender: chrome.runtime.MessageSender,
    _sendResponse: (response?: any) => void
  ) => {
    toggleBookmark(message.bookmarkOpen);
    setBookmarks(message.bookmarks || []);
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
    <FullSizeWrapper onClick={() => toggleBookmark(false)}>
      <div className="h-screen">
        <div
          className={`overflow-y-auto fixed right-0 w-[500] h-full bg-slate-100 g-cyan-500 shadow-lg shadow-cyan-500/50 opacity-100`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {/* <Button
            onClick={(e) => {
              e.stopPropagation();
              openModal();
            }}
          >
            create
          </Button> */}
          <Button
            onClick={(e) => {
              toggleBookmark(false);
            }}
          >
            close
          </Button>
          <BookmarkMain bookmarks={bookmarks} openModal={openModal} />
        </div>
      </div>
    </FullSizeWrapper>
  );
};

export default Bookmark;
