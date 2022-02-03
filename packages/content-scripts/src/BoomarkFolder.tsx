import BookmarkNode from "./BookmarkNode";
import { IoFolderOutline } from "react-icons/io5";
import Node from "./common/Node";
import DeleteButton from "./common/DeleteButton";
import CreateButton from "./common/CreateButton";

const BookmarkFolder = ({
  bnode,
  openModal,
}: {
  openModal: () => void;
  bnode: chrome.bookmarks.BookmarkTreeNode;
}) => {
  // root
  const isRoot = !bnode.parentId;
  return (
    <>
      {!isRoot && (
        <Node>
          <IoFolderOutline className="mx-1.5" />
          {bnode.title || `BookmarksBar ${bnode.id}`}
          <CreateButton
            parentId={bnode.id}
            openModal={openModal}
          ></CreateButton>
          <DeleteButton id={bnode.id} isFolder={true}></DeleteButton>
        </Node>
      )}

      <div className={isRoot ? `` : `ml-5`}>
        {bnode.children.map((bnode: chrome.bookmarks.BookmarkTreeNode) => {
          const isFolder = bnode.children;
          if (isFolder) {
            return (
              <BookmarkFolder
                key={bnode.id}
                bnode={bnode}
                openModal={openModal}
              />
            );
          } else {
            return <BookmarkNode key={bnode.id} bnode={bnode} />;
          }
        })}
      </div>
    </>
  );
};

export default BookmarkFolder;
