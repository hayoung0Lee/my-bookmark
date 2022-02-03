const Node = ({
  children,
  className,
  ...props
}: {
  children: React.ReactChild[];
  className?: string;
  props?: { [key: string]: string };
}) => {
  return (
    <a
      className={`flex items-center text-base py-2.5 hover:bg-red-300 ${
        className ? className : ""
      }`}
      {...props}
    >
      {children}
    </a>
  );
};

export default Node;
