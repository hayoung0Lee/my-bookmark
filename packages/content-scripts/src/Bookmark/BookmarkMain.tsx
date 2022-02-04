import BookmarkFolder from "./BoomarkFolder";
import { openModalType } from "./types";

const BookmarkMain = ({
  bookmarks,
  openModal,
}: {
  openModal: openModalType;
  bookmarks: chrome.bookmarks.BookmarkTreeNode[];
}) => {
  return (
    <>
      {bookmarks.map((bnode) => {
        return (
          <BookmarkFolder key={bnode.id} bnode={bnode} openModal={openModal} />
        );
      })}
    </>
  );
};

export default BookmarkMain;
