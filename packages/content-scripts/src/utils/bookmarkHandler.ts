import {
  REQUEST_BOOKMARK,
  CREATE_BOOKMARK,
  CLOSE_BOOKMARK,
} from "../../../common";

export const createNewBooMark = () => {
  // backgroundScript에 메시지 보냄
  chrome.runtime.sendMessage({ type: CREATE_BOOKMARK }, function (response) {
    console.log("Bookmarks", response);
  });
};

export const requestBookMarks = () => {
  chrome.runtime.sendMessage({ type: REQUEST_BOOKMARK }, function (response) {
    console.log(response.data);
  });
};

export const requestCloseBookMarks = () => {
  chrome.runtime.sendMessage({ type: CLOSE_BOOKMARK }, function (response) {
    console.log(response.data);
  });
};

export const registerContentScriptMessageListener = (func) => {
  chrome.runtime.onMessage.addListener(func);
};

export const removeContentScriptMessageListener = (func) => {
  chrome.runtime.onMessage.removeListener(func);
};
