import Modal from "./Modal";
import Bookmark from "./Bookmark";
import { parentType } from "./utils/types";
import React, { useState } from "react";
import { ModalContextWrapper } from "./context/ModalContext";

const Active = ({ deActivate }: { deActivate: () => void }) => {
  return (
    <ModalContextWrapper>
      <Bookmark deActivate={deActivate} />
      <Modal />
    </ModalContextWrapper>
  );
};

export default Active;
