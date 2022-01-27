import BookmarkNode from "./BookmarkNode";
import { IoFolderOutline } from "react-icons/io5";

const BookmarkFolder = ({
  bnode,
}: {
  bnode: chrome.bookmarks.BookmarkTreeNode;
}) => {
  // root
  const isRoot = !bnode.parentId;
  return (
    <>
      <div className="flex items-center text-lg">
        {!isRoot && (
          <>
            <IoFolderOutline className="mx-1.5" />
            {bnode.title || `BookmarksBar ${bnode.id}`}
          </>
        )}
      </div>
      <div className={isRoot ? `pl-1.5` : `pl-5`}>
        {bnode.children.map((bnode: chrome.bookmarks.BookmarkTreeNode) => {
          const isFolder = bnode.children;
          if (isFolder) {
            return <BookmarkFolder key={bnode.id} bnode={bnode} />;
          } else {
            return <BookmarkNode key={bnode.id} bnode={bnode} />;
          }
        })}
      </div>
    </>
  );
};

export default BookmarkFolder;
