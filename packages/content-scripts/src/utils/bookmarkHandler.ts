import {
  REQUEST_BOOKMARK,
  CREATE_BOOKMARK,
  REMOVE_BOOKMARK,
  CLOSE_IFRAME,
  OPEN_IFRAME,
} from "@hayoung-bookmark/shared-types";

export const createNewBooMark = ({
  index,
  parentId,
  title,
  url,
}: chrome.bookmarks.BookmarkCreateArg) => {
  // backgroundScript에 메시지 보냄
  chrome.runtime.sendMessage(
    { type: CREATE_BOOKMARK, index, parentId, title, url },
    function (response) {
      console.log("Bookmarks", response);
    }
  );
};

export const removeBookmark = ({ id, isFolder }) => {
  chrome.runtime.sendMessage(
    { type: REMOVE_BOOKMARK, id, isFolder },
    function (response) {
      console.log("removed", response);
    }
  );
};

export const requestBookMarks = () => {
  chrome.runtime.sendMessage({ type: REQUEST_BOOKMARK }, function (response) {
    console.log(response.data);
  });
};

export const requestCloseIframe = () => {
  chrome.runtime.sendMessage({ type: CLOSE_IFRAME }, function (response) {
    console.log(response.data);
  });
};

export const requestOpenIframe = () => {
  chrome.runtime.sendMessage({ type: OPEN_IFRAME }, function (response) {
    console.log(response.data);
  });
};

export const registerContentScriptMessageListener = (func) => {
  chrome.runtime.onMessage.addListener(func);
};

export const removeContentScriptMessageListener = (func) => {
  chrome.runtime.onMessage.removeListener(func);
};
