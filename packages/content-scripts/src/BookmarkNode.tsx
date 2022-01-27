import { useRef, useState } from "react";
import { IoPizzaOutline } from "react-icons/io5";

const BookmarkNode = ({
  bnode,
}: {
  bnode: chrome.bookmarks.BookmarkTreeNode;
}) => {
  const [favicon, setFavicon] = useState(true);

  return (
    <a
      href={`${bnode.url}`}
      target="_blank"
      className="flex items-center text-base my-3"
    >
      {favicon ? (
        <img
          className="w-5 h-5 mx-1.5"
          src={`https://s2.googleusercontent.com/s2/favicons?domain=${bnode.url}`}
          onError={() => {
            setFavicon(false);
          }}
        />
      ) : (
        <IoPizzaOutline className="mx-1.5" />
      )}
      <span className="truncate">{bnode.title}</span>
    </a>
  );
};

export default BookmarkNode;
