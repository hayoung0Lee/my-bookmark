import Modal from "./common/Modal";
import Bookmark from "./Bookmark";
import BookmarkModal from "./BookmarkModal";
import { parentType } from "./types";
import React, { useState } from "react";

const Active = ({
  toggleBookmark,
}: {
  toggleBookmark: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [modal, toggleModal] = useState(false);
  const [parentId, setParentId] = useState<string>();
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
};

export default Active;
