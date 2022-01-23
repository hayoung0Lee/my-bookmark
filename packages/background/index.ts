// Fired when an action icon is clicked. This event will not fire if the action has a popup.
chrome.action.onClicked.addListener((tab) => {
  // toggle message action 눌러서
  if (tab.id) {
    chrome.tabs.sendMessage(tab.id, { toggle: "toggle" }, {}, (res) => {
      console.log(`toggled!!`);
    });
  }
});

// bookmarks
// bookmark 생성, 이런거 어떻게 처리할지?
// https://developer.chrome.com/docs/extensions/reference/bookmarks/#event-onCreated
let bookmarksArr: chrome.bookmarks.BookmarkTreeNode[] = [];

const getTree = () => {
  chrome.bookmarks.getTree((bookmarks) => {
    bookmarksArr = bookmarks;
  });
};

getTree();

// 1. backgroundScript에서 보낸다.
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  if (tabs[0].id) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { greeting: "hello", bookmarks: bookmarksArr },
      function (response) {
        console.log(response.farewell);
      }
    );
  }
});

chrome.bookmarks.onCreated.addListener(function (id, bookmark) {});

// message 받고, 보내는것 처리
// onMessage received
// 2. 뭐 받았을때
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );

  if (request.type === "get_bookmarks") {
    sendResponse({ body: "hello", result: bookmarksArr });
  }
});
