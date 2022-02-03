import { useRef, useState } from "react";
import { IoPizzaOutline } from "react-icons/io5";
import Node from "./common/Node";

const BookmarkNode = ({
  bnode,
}: {
  bnode: chrome.bookmarks.BookmarkTreeNode;
}) => {
  const [favicon, setFavicon] = useState(true);

  return (
    <Node href={`${bnode.url}`} target="_blank">
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
    </Node>
  );
};

export default BookmarkNode;
