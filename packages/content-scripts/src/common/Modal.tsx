import BgWrapper from "../BgWrapper";

interface Props {
  children: JSX.Element | string;
  openModal: () => void;
}

const Modal = ({ children, openModal }: Props) => {
  return (
    <BgWrapper onClick={openModal}>
      <div className="border-solid border-2 border-indigo-600 w-[400] h-[500] bg-white">
        Modal
        {children}
      </div>
    </BgWrapper>
  );
};

export default Modal;
