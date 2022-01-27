import BookmarkFolder from "./BoomarkFolder";

const BookmarkMain = ({
  bookmarks,
}: {
  bookmarks: chrome.bookmarks.BookmarkTreeNode[];
}) => {
  return (
    <div className="border-double border-4 border-indigo-600">
      {bookmarks.map((bnode) => {
        return <BookmarkFolder key={bnode.id} bnode={bnode} />;
      })}
    </div>
  );
};

export default BookmarkMain;
