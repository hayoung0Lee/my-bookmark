import BgWrapper from "../BgWrapper";

interface Props {
  children: JSX.Element | string;
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ children, toggleModal }: Props) => {
  return (
    <BgWrapper onClick={() => toggleModal(false)}>
      <div className="border-solid border-2  border-indigo-600 w-[400] h-[500] bg-white">
        Modal
        {children}
      </div>
    </BgWrapper>
  );
};

export default Modal;
