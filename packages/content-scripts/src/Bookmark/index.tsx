import FullSizeWrapper from "../common/FullSizeWrapper";
import React, { useState, useEffect } from "react";
import {
  requestBookMarks,
  registerContentScriptMessageListener,
  removeContentScriptMessageListener,
  requestCloseIframe,
} from "../utils/bookmarkHandler";
import { BookmarkMessageType, TARGET_BOOKMARK } from "shared-types";
import BookmarkMain from "./BookmarkMain";
import Button from "../common/Button";
import { openModalType } from "../utils/types";

const Bookmark = ({ deActivate }: { deActivate: () => void }) => {
  const [bookmarks, setBookmarks] = useState<
    chrome.bookmarks.BookmarkTreeNode[]
  >([]);

  const onReceiveBookmarks = (
    message: BookmarkMessageType,
    _sender: chrome.runtime.MessageSender,
    _sendResponse: (response?: any) => void
  ) => {
    if (message.to === TARGET_BOOKMARK) {
      setBookmarks(message.bookmarks || []);
    }
  };

  useEffect(() => {
    requestBookMarks();
    registerContentScriptMessageListener(onReceiveBookmarks);

    return () => {
      removeContentScriptMessageListener(onReceiveBookmarks);
    };
  }, []);

  return (
    <FullSizeWrapper onClick={() => deActivate()}>
      <div className="h-screen">
        <div
          className={`overflow-y-auto fixed right-0 w-[500] h-full bg-slate-100 g-cyan-500 shadow-lg shadow-cyan-500/50 opacity-100`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Button onClick={() => deActivate()}>close</Button>
          <BookmarkMain bookmarks={bookmarks} />
        </div>
      </div>
    </FullSizeWrapper>
  );
};

export default Bookmark;
