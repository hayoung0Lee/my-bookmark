export const REQUEST_BOOKMARK = "REQUEST_BOOKMARK";
export const CREATE_BOOKMARK = "create_bookmark";
export const CLOSE_BOOKMARK = "close_bookmark";

export interface BookmarkMessageType {
  bookmarkOpen: boolean;
  bookmarks?: chrome.bookmarks.BookmarkTreeNode[];
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
