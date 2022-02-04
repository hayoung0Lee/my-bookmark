const InActive = ({ activate }: { activate: () => void }) => {
  return (
    <div
      className={`fixed right-0 w-[20px] h-full bg-orange-400 opacity-20 hover:opacity-100`}
      onClick={activate}
    ></div>
  );
};

export default InActive;
