import React, { useState } from "react";
import Active from "./Active";
import InActive from "./InActive";
import { requestOpenIframe } from "./utils/bookmarkHandler";

const App = () => {
  const [bookmark, toggleBookmark] = useState(false);

  if (bookmark) {
    return <Active toggleBookmark={toggleBookmark} />;
  }

  return (
    <InActive
      openBookMark={() => {
        requestOpenIframe();
        toggleBookmark(true);
      }}
    />
  );
};

export default App;
