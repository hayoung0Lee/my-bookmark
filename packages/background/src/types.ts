export interface ContentScriptMessage
  extends chrome.bookmarks.BookmarkCreateArg {
  type: string;
}

export interface MessageTarget {
  get: () => void;
  set: () => void;
  trigger: () => void;
  create: (bookmarkArg: ContentScriptMessage) => void;
  close: (tabID: number | undefined) => void;
}
