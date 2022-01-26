export const REQUEST_BOOKMARK = "REQUEST_BOOKMARK";
export const CREATE_BOOKMARK = "create_bookmark";
export const CLOSE_BOOKMARK = "close_bookmark";

export interface BookmarkMessage {
  bookmarkOpen: boolean;
  bookmarks?: chrome.bookmarks.BookmarkTreeNode[];
}
