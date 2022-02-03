import BgWrapper from "../BgWrapper";

interface Props {
  children: JSX.Element | string;
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ children, toggleModal }: Props) => {
  return <BgWrapper onClick={() => toggleModal(false)}>{children}</BgWrapper>;
};

export default Modal;
