// https://developer.chrome.com/docs/extensions/reference/runtime/#event-onStartup
import {
  Callback,
  ContentScriptCallback,
  CustomBookmarkCreateArg,
  BookmarkMessageType,
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

  get(): Promise<chrome.bookmarks.BookmarkTreeNode[]> {
    return new Promise((resolve, reject) => {
      try {
        chrome.bookmarks.getTree((bookmarks) => {
          this.bookmarks = bookmarks;
          resolve(bookmarks);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  contentScriptEventHandler = async (
    message: any,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void
  ) => {
    if (message.type === CLOSE_BOOKMARK) {
      const tabID = sender.tab?.id;
      this.close(tabID);
      return;
    }

    if (message.type === CREATE_BOOKMARK) {
      await this.create(message);
    }

    // default: message.type === REQUEST_BOOKMARK
    this.bookmarks = await this.get();
    this.update();
  };

  update() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      tabs.map((tab) => {
        if (tab.id) {
          chrome.tabs.sendMessage(
            tab.id,
            {
              bookmarkOpen: true,
              bookmarks: this.bookmarks,
            } as BookmarkMessageType,
            function (response) {
              console.log(response);
            }
          );
        }
      });
    });
  }

  create = async (bookmarkArg: CustomBookmarkCreateArg) => {
    return new Promise<chrome.bookmarks.BookmarkTreeNode>((resolve, reject) => {
      const { index, parentId, title, url } = bookmarkArg;
      try {
        chrome.bookmarks.create({ index, parentId, title, url }, (result) => {
          resolve(result);
        });
      } catch (err) {
        reject(err);
      }
    });
  };

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
