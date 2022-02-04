import BookmarkFolder from "./BoomarkFolder";
import { openModalType } from "../utils/types";

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
