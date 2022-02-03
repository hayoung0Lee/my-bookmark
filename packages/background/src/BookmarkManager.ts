// https://developer.chrome.com/docs/extensions/reference/runtime/#event-onStartup
import {
  Callback,
  ContentScriptCallback,
  CustomBookmarkCreateArg,
  BookmarkMessageType,
  CREATE_BOOKMARK,
  CLOSE_BOOKMARK,
  REMOVE_BOOKMARK,
  BookmarkTarget,
} from "../../shared-types";

export class BookmarkManager implements BookmarkTarget {
  bookmarks: chrome.bookmarks.BookmarkTreeNode[] = [];

  installedEvent: Callback[] = [];
  clickIconEvent: Callback[] = [];
  contentScriptEvent: ContentScriptCallback[] = [];

  constructor() {
    // FIXME: 이거좀 이상하긴 한듯. installedEvent, clickIconEvent도 따로 정의를 해줘야하는데 부자연스럽
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

    if (message.type === REMOVE_BOOKMARK) {
      await this.remove(message);
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

  remove = async (message: any) => {
    return new Promise<void>((resolve, reject) => {
      const { id, isFolder } = message; // type은 folder or node;
      try {
        if (isFolder) {
          chrome.bookmarks.removeTree(id, (result) => {
            resolve(result);
          });
        } else {
          chrome.bookmarks.remove(id, (result) => {
            resolve(result);
          });
        }
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
