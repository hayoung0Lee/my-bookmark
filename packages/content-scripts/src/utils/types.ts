export type parentType = Pick<chrome.bookmarks.BookmarkCreateArg, "parentId">;
export type openModalType = (parentId?: parentType) => void;
export interface ModalContextType {
  isOpen: boolean;
  parentId: string | undefined;
  openModal: (parentId: string) => void;
  closeModal: () => void;
}
