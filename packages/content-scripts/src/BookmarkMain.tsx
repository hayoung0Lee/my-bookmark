import BookmarkFolder from "./BoomarkFolder";

const BookmarkMain = ({
  bookmarks,
}: {
  bookmarks: chrome.bookmarks.BookmarkTreeNode[];
}) => {
  return (
    <>
      {bookmarks.map((bnode) => {
        return <BookmarkFolder key={bnode.id} bnode={bnode} />;
      })}
    </>
  );
};

export default BookmarkMain;
