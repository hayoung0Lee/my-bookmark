import Modal from "./common/Modal";
import Bookmark from "./Bookmark";
import { parentType } from "./types";
import React, { useState } from "react";

const Active = ({ deActivate }: { deActivate: () => void }) => {
  const [modal, toggleModal] = useState(false);
  const [parentId, setParentId] = useState<string>();

  return (
    <>
      <Bookmark
        openModal={({ parentId }: parentType) => {
          toggleModal(true);
          setParentId(parentId);
        }}
        deActivate={deActivate}
      />
      {modal && (
        <Modal
          toggleModal={toggleModal}
          parentId={parentId}
          closeModal={() => toggleModal(false)}
        ></Modal>
      )}
    </>
  );
};

export default Active;
