import BookmarkNode from "./BookmarkNode";
import { IoFolderOutline } from "react-icons/io5";

const BookmarkFolder = ({
  bnode,
}: {
  bnode: chrome.bookmarks.BookmarkTreeNode;
}) => {
  return (
    <div className="border-double border-4 border-indigo-600">
      <div>
        <IoFolderOutline /> {bnode.title}
      </div>
      {bnode.children.map((bnode: chrome.bookmarks.BookmarkTreeNode) => {
        const isFolder = bnode.children;
        if (isFolder) {
          return <BookmarkFolder key={bnode.id} bnode={bnode} />;
        } else {
          return <BookmarkNode key={bnode.id} bnode={bnode} />;
        }
      })}
    </div>
  );
};

export default BookmarkFolder;
