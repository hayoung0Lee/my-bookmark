import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Bookmark from "./Bookmark";
import { createNewBooMark, requestBookMarks } from "./utils/bookmarkHandler";

// https://developer.chrome.com/docs/extensions/reference/runtime/#event-onMessage
const App = ({
  open,
  toggleOpen,
}: {
  open: boolean;
  toggleOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [modal, openModal] = useState(false);

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
            <div>
              Create New Bookmark
              <div>
                <label>
                  title
                  <input />
                </label>
              </div>
              <div>
                <label>
                  url
                  <input />
                </label>
              </div>
              <button onClick={createNewBooMark}>Save</button>
            </div>
          </Modal>
        )}
      </>
    );
  }

  return (
    <div
      className={`pointer-events-auto fixed right-0 w-[20] h-full opacity-20 bg-slate-300 hover:opacity-100 `}
      onClick={openBookMark}
    ></div>
  );
};

export default App;
