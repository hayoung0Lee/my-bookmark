import BgWrapper from "../BgWrapper";

interface Props {
  children: JSX.Element | string;
  openModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ children, openModal }: Props) => {
  return (
    // <div
    //   className="absolute w-screen h-screen flex justify-center items-center"
    //   onClick={() => {
    //     openModal(false);
    //   }}
    // >
    <BgWrapper onClick={openModal}>
      <div className="border-solid border-2 border-indigo-600 w-[400] h-[500] bg-white">
        Modal
        {children}
      </div>
    </BgWrapper>
    // </div>
  );
};

export default Modal;
