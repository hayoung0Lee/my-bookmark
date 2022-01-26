import BookmarkNode from "./BookmarkNode";

const BookmarkNodeGroup = ({
  bnode,
}: {
  bnode: chrome.bookmarks.BookmarkTreeNode;
}) => {
  if (bnode.children) {
    return (
      <div className="border-double border-4 border-indigo-600">
        Group title: {bnode.title}
        {bnode.children.map((bnode: chrome.bookmarks.BookmarkTreeNode) => {
          return <BookmarkNodeGroup key={bnode.id} bnode={bnode} />;
        })}
      </div>
    );
  } else {
    return <BookmarkNode bnode={bnode} />;
  }
};

export default BookmarkNodeGroup;
