import React, { useState, useCallback } from "react";
import Active from "./Active";
import InActive from "./InActive";
import { requestCloseIframe, requestOpenIframe } from "./utils/bookmarkHandler";

const App = () => {
  const [active, setActive] = useState(false);

  const activate = useCallback(() => {
    requestOpenIframe();
    setActive(true);
  }, []);

  const deActivate = useCallback(() => {
    requestCloseIframe();
    setActive(false);
  }, []);

  if (active) {
    return <Active deActivate={deActivate} />;
  }

  return <InActive activate={activate} />;
};

export default App;
