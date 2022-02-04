import { IoTrashBin } from "react-icons/io5";
import { removeBookmark } from "../utils/bookmarkHandler";

const DeleteButton = ({ id, isFolder }: { id: string; isFolder: boolean }) => {
  console.log("id", id, isFolder);
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        removeBookmark({ id, isFolder });
      }}
    >
      <IoTrashBin className="mx-2"></IoTrashBin>
    </button>
  );
};

export default DeleteButton;
