import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Bookmark from "./Bookmark";

// https://developer.chrome.com/docs/extensions/reference/runtime/#event-onMessage
const App = ({
  open,
  toggleOpen,
}: {
  open: boolean;
  toggleOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [modal, openModal] = useState(false);

  useEffect(() => {
    // message받았을때
    onReceiveMessage();
  }, []);

  const onReceiveMessage = () => {
    // backgroundScript에서 메시지 받음
    chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
      toggleOpen(message.bookmarkOpen);
      console.log("bookmarks", message.bookmarks);
    });
  };

  const createNewBooMark = () => {
    // backgroundScript에 메시지 보냄
    chrome.runtime.sendMessage(
      { type: "create_bookmark" },
      function (response) {
        console.log("Bookmarks", response);
      }
    );
  };

  const openBookMark = () => {
    toggleOpen(true);
  };

  const closeBookMark = () => {
    toggleOpen(false);
  };

  if (open) {
    return (
      <>
        <Bookmark closeBookMark={closeBookMark} openModal={openModal} />
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
