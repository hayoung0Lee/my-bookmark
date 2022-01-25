import BgWrapper from "./BgWrapper";

const Bookmark = ({
  closeBookMark,
  openModal,
}: {
  closeBookMark: () => void;
  openModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <BgWrapper onClick={closeBookMark}>
      <div
        className={`fixed right-0 w-[500] h-full bg-slate-100 g-cyan-500 shadow-lg shadow-cyan-500/50 opacity-100`}
      >
        Test
        <button
          className="border-solid border-2 border-indigo-600 block"
          onClick={closeBookMark}
        >
          close
        </button>
        <button
          className="border-solid border-2 border-indigo-600 block"
          onClick={(e) => {
            e.stopPropagation();
            openModal((prev) => !prev);
          }}
        >
          create New bookmark
        </button>
      </div>
    </BgWrapper>
  );
};

export default Bookmark;
