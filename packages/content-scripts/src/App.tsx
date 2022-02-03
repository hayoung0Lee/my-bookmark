import React, { useState } from "react";
import Modal from "./common/Modal";
import Bookmark from "./Bookmark";
import BookmarkModal from "./BookmarkModal";
import { parentType } from "./types";

const HoverApp = ({ openBookMark }: { openBookMark: () => void }) => {
  return (
    <div
      className={`fixed right-0 w-[20px] h-full bg-orange-400 opacity-20 hover:opacity-100`}
      onClick={openBookMark}
    ></div>
  );
};

const App = () => {
  const [modal, toggleModal] = useState(false);
  const [bookmark, toggleBookmark] = useState(false);
  const [parentId, setParentId] = useState<string>();

  if (bookmark) {
    return (
      <>
        <Bookmark
          openModal={({ parentId }: parentType) => {
            toggleModal(true);
            setParentId(parentId);
          }}
          toggleBookmark={toggleBookmark}
        />
        {modal && (
          <Modal toggleModal={toggleModal}>
            <BookmarkModal
              parentId={parentId}
              closeModal={() => toggleModal(false)}
            />
          </Modal>
        )}
      </>
    );
  }

  return <HoverApp openBookMark={() => toggleBookmark(true)} />;
};

export default App;
