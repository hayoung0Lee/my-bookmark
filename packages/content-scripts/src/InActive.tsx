
const InActive = ({ activate }: { activate: () => void }) => {
  return (
    <div
      className={`
      fixed
      right-0
      w-[20px]
      h-full
      group`}
      onClick={activate}
    >
      <div
        className={`
      top-0
      bottom-0
      absolute
      left-full
      right-0
      bg-slate-600
      opacity-50
      transition-left
      duration-200
      group-hover:left-0
    `}
      >
      </div>
    </div>
  );
};

export default InActive;
