import React, { useState } from "react";
import Modal from "./common/Modal";
import Bookmark from "./Bookmark";
import BookmarkModal from "./BookmarkModal";

const HoverApp = ({ openBookMark }: { openBookMark: () => void }) => {
  return (
    <div
      className={`fixed right-0 w-[10] h-full bg-orange-400 opacity-20 hover:opacity-100`}
      onClick={openBookMark}
    ></div>
  );
};

const App = () => {
  const [modal, openModal] = useState(false);
  const [open, toggleOpen] = useState(false);

  const openBookMark = () => {
    toggleOpen(true);
  };

  const closeBookMark = () => {
    toggleOpen(false);
  };

  if (open) {
    return (
      <>
        <Bookmark
          closeBookMark={closeBookMark}
          openModal={openModal}
          toggleOpen={toggleOpen}
        />
        {modal && (
          <Modal openModal={openModal}>
            <BookmarkModal />
          </Modal>
        )}
      </>
    );
  }

  return <HoverApp openBookMark={openBookMark} />;
};

export default App;
