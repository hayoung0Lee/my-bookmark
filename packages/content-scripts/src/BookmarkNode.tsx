const BookmarkNode = ({
  bnode,
}: {
  bnode: chrome.bookmarks.BookmarkTreeNode;
}) => {
  return (
    <div className="border-dashed border-2 border-indigo-600 m-1.5">
      Title:{" "}
      <a href={`${bnode.url}`} target="_blank">
        {bnode.title}
      </a>
    </div>
  );
};

export default BookmarkNode;
