const Button = ({
  children,
  onClick,
}: {
  children: JSX.Element | string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  return (
    <button
      className={
        "px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm mx-2"
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
