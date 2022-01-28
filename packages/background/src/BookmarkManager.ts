// https://developer.chrome.com/docs/extensions/reference/runtime/#event-onStartup
import {
  Callback,
  ContentScriptCallback,
  CustomBookmarkCreateArg,
  BookmarkMessageType,
  REQUEST_BOOKMARK,
  CREATE_BOOKMARK,
  CLOSE_BOOKMARK,
  BookmarkTarget,
} from "../../shared-types";

export class BookmarkManager implements BookmarkTarget {
  bookmarks: chrome.bookmarks.BookmarkTreeNode[] = [];

  installedEvent: Callback[] = [];
  clickIconEvent: Callback[] = [];
  contentScriptEvent: ContentScriptCallback[] = [];

  constructor() {
    this.contentScriptEvent.push(this.contentScriptEventHandler);
  }

  get() {
    return this.bookmarks;
  }

  set() {
    chrome.bookmarks.getTree((bookmarks) => {
      this.bookmarks = bookmarks;
      this.trigger();
    });
  }

  contentScriptEventHandler = (
    message: any,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void
  ) => {
    if (message.type === CREATE_BOOKMARK) {
      this.create(message);
    }
    if (message.type === CLOSE_BOOKMARK) {
      const tabID = sender.tab?.id;
      this.close(tabID);
    }

    if (message.type === REQUEST_BOOKMARK) {
      this.set();
    }
  };

  trigger() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      tabs.map((tab) => {
        if (tab.id) {
          chrome.tabs.sendMessage(
            tab.id,
            {
              bookmarkOpen: true,
              bookmarks: this.get(),
            } as BookmarkMessageType,
            function (response) {
              console.log(response);
            }
          );
        }
      });
    });
  }

  create(bookmarkArg: CustomBookmarkCreateArg) {
    const { index, parentId, title, url } = bookmarkArg;
    chrome.bookmarks.create({ index, parentId, title, url }, (result) => {
      this.set();
    });
  }

  close(tabID: number | undefined) {
    if (tabID) {
      chrome.tabs.sendMessage(
        tabID,
        {
          bookmarkOpen: false,
        } as BookmarkMessageType,
        function (response) {
          console.log(response);
        }
      );
    }
  }
}
