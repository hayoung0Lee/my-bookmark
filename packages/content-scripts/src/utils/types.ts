export type parentType = Pick<chrome.bookmarks.BookmarkCreateArg, "parentId">;
export type openModalType = (parentId?: parentType) => void;
