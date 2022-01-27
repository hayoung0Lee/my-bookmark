import BookmarkNode from "./BookmarkNode";

const BookmarkFolder = ({
  bnode,
}: {
  bnode: chrome.bookmarks.BookmarkTreeNode;
}) => {
  return (
    <div className="border-double border-4 border-indigo-600">
      Group title: {bnode.title}
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
