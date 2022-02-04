import { IoAddCircle } from "react-icons/io5";
import { openModalType, parentType } from "../utils/types";

type props = {
  openModal: openModalType;
} & parentType;

const CreateButton = ({ parentId, openModal }: props) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        openModal({ parentId });
      }}
    >
      <IoAddCircle className="mx-2" />
    </button>
  );
};

export default CreateButton;
