export interface IframeMessageType {
  iframeOpen: boolean;
  to: string;
}

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
