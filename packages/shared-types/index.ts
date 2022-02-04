export const TARGET_IFRAME = "iframe";
export const OPEN_IFRAME = "open_iframe";
export const CLOSE_IFRAME = "close_iframe";

export interface IframeMessageType {
  iframeOpen: boolean;
  to: string;
}

export const TARGET_BOOKMARK = "bookmark";
export const REQUEST_BOOKMARK = "REQUEST_BOOKMARK";
export const CREATE_BOOKMARK = "create_bookmark";
export const REMOVE_BOOKMARK = "remove_bookmark";
export interface BookmarkMessageType {
  bookmarks?: chrome.bookmarks.BookmarkTreeNode[];
  to: string;
}

export interface CustomBookmarkCreateArg
  extends chrome.bookmarks.BookmarkCreateArg {
  type: string;
}

export type Callback = () => void;

export type ContentScriptCallback = (
  message: any,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void
) => void;

export interface MessageTarget {
  installedEvent: Callback[];
  clickIconEvent: Callback[];
  contentScriptEvent: ContentScriptCallback[];
}

export interface BookmarkTarget extends MessageTarget {
  get: () => Promise<chrome.bookmarks.BookmarkTreeNode[]>;
  contentScriptEventHandler: (
    message: any,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void
  ) => void;
  update: () => void;
  create: (bookmarkArg: CustomBookmarkCreateArg) => void;
}
