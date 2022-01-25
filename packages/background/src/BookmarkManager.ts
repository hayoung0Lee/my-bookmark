// https://developer.chrome.com/docs/extensions/reference/runtime/#event-onStartup
import { ContentScriptMessage, MessageTarget } from "./types";

export class BookmarkManager implements MessageTarget {
  // bookmarks
  // bookmark 생성, 이런거 어떻게 처리할지?
  // https://developer.chrome.com/docs/extensions/reference/bookmarks/#event-onCreated
  bookmarks: chrome.bookmarks.BookmarkTreeNode[] = [];

  constructor() {
    this.set();
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

  trigger() {
    console.log("Trigger");
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      tabs.map((tab) => {
        if (tab.id) {
          chrome.tabs.sendMessage(
            tab.id,
            {
              bookmarkOpen: true,
              bookmarks: this.get(),
            },
            function (response) {
              console.log(response);
            }
          );
        }
      });
    });
  }

  create(bookmarkArg: ContentScriptMessage) {
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
        },
        function (response) {
          console.log(response);
        }
      );
    }
  }
}
