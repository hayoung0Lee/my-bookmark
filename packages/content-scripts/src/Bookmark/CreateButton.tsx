import { IoAddCircle } from "react-icons/io5";
import { openModalType, parentType } from "../utils/types";
import { ModalContext } from "../context/ModalContext";
import { useContext } from "react";

const CreateButton = ({ parentId }: parentType) => {
  const { openModal } = useContext(ModalContext);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        openModal(parentId);
      }}
    >
      <IoAddCircle className="mx-2" />
    </button>
  );
};

export default CreateButton;
