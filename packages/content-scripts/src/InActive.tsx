
const InActive = ({ activate }: { activate: () => void }) => {
  return (
    <div
      className={`
        fixed
        cursor-pointer
        right-0
        w-[20px]
        h-full
        group`}
      onClick={activate}
    >
      <div
        className={`
        bg-slate-600
          opacity-50
          h-full
          absolute
          left-full
          right-0
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
