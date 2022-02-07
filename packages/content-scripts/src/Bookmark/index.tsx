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
          className={`overflow-y-auto fixed right-0 w-[500] h-full p-2 bg-zinc-100 shadow-lg shadow-zinc-400/50 `}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="flex justify-between items-center">
            <div className="text-2xl">Simple Bookmark</div>
            <Button onClick={() => deActivate()}>close</Button>
          </div>
          <BookmarkMain bookmarks={bookmarks} />
        </div>
      </div>
    </FullSizeWrapper>
  );
};

export default Bookmark;
