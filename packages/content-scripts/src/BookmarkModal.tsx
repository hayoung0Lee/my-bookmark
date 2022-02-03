import { createNewBooMark } from "./utils/bookmarkHandler";
import { useState } from "react";

const BookmarkModal = ({ closeModal }: { closeModal: () => void }) => {
  const [title, setTitle] = useState<string>("");
  const [url, setUrl] = useState<string>(window.location.href);

  return (
    <div className={"bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"}>
      <div className={"mb-4"}>
        <label
          className={"block text-gray-700 text-sm font-bold mb-2"}
          htmlFor="title"
        >
          title
        </label>
        <input
          id="title"
          className={
            "shadow appearance-none border rounded w-[400] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
          }
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div className={"mb-6"}>
        <label
          className={"block text-gray-700 text-sm font-bold mb-2"}
          htmlFor="title"
        >
          url
        </label>
        <input
          id="title"
          className={
            "shadow appearance-none border rounded w-[400] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          }
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
      </div>
      <div className={"flex items-center justify-between"}>
        <button
          className={
            "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          }
          onClick={() => {
            createNewBooMark({ parentId: "1", title, url });
            closeModal();
          }}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default BookmarkModal;
