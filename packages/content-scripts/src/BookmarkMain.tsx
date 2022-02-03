import BookmarkFolder from "./BoomarkFolder";

const BookmarkMain = ({
  bookmarks,
  openModal,
}: {
  openModal: () => void;
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
