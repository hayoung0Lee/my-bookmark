// https://developer.chrome.com/docs/extensions/reference/runtime/#event-onStartup

class BookmarkManager {
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
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      tabs.map((tab) => {
        if (tab.id) {
          chrome.tabs.sendMessage(
            tab.id,
            {
              bookmarkOpen: true,
              bookmarks: bookmarkManager.get(),
            },
            function (response) {
              console.log(response);
            }
          );
        }
      });
    });
  }

  create({ title, url }: { title: string; url: string }) {
    chrome.bookmarks.create({ title: title, url: url }, (result) => {
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

const bookmarkManager = new BookmarkManager();

// // When icon clicked
chrome.action.onClicked.addListener((tab) => {
  // toggle message action 눌러서
  if (tab.id) {
    // send bookmark to contentscript
    bookmarkManager.trigger(); // 보냄
  }
});

// When button clicked in content script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const tabID = sender.tab?.id;

  if (request.type === "create_bookmark") {
    bookmarkManager.create({
      title: "Test",
      url: "https://hayoung-techlog.com/",
    });
  }

  if (request.type === "close_bookmark") {
    bookmarkManager.close(tabID);
  }
});
