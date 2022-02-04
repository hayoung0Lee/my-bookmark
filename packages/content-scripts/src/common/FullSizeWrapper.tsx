interface Props {
  children: JSX.Element | string;
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
}

const FullSizeWrapper = ({ children, onClick }: Props) => {
  return (
    <div
      className={`absolute w-screen h-screen flex justify-center items-center`}
      onClick={(_e) => {
        onClick(false);
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default FullSizeWrapper;
