import React, { useState } from "react";
import Active from "./Active";
import InActive from "./InActive";

const App = () => {
  const [bookmark, toggleBookmark] = useState(false);

  if (bookmark) {
    return <Active toggleBookmark={toggleBookmark} />;
  }

  return <InActive openBookMark={() => toggleBookmark(true)} />;
};

export default App;
