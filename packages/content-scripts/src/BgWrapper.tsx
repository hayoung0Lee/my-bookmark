interface Props {
  children: JSX.Element | string;
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
}

const BgWrapper = ({ children, onClick }: Props) => {
  return (
    <div
      className={`absolute w-screen h-screen flex justify-center items-center`}
      onClick={(e) => {
        onClick(false);
      }}
    >
      <div
        className="h-screen"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default BgWrapper;
