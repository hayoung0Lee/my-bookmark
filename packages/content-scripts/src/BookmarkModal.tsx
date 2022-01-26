import { createNewBooMark } from "./utils/bookmarkHandler";

const BookmarkModal = () => {
  return (
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
  );
};

export default BookmarkModal;
