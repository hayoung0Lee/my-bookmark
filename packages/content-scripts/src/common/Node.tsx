const Node = ({
  children,
  className,
  ...props
}: {
  [key: string]: string | React.ReactChild[]; // 이렇게밖에 안된다는듯. https://www.typescriptlang.org/docs/handbook/2/objects.html
  children: React.ReactChild[];
  className?: string;
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
