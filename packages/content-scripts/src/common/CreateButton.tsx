import { IoAddCircle } from "react-icons/io5";

type Props = Pick<chrome.bookmarks.BookmarkCreateArg, "parentId"> & {
  openModal: () => void;
};

const CreateButton = ({ parentId, openModal }: Props) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        openModal();
      }}
    >
      <IoAddCircle className="mx-2" />
    </button>
  );
};

export default CreateButton;
