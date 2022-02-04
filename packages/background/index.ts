import { BookmarkManager } from "./src/BookmarkManager";
import { IframeManager } from "./src/IframeManager";
import { MessageHandler } from "./src/MessageHandler";

// https://github.com/refined-github/refined-github/blob/main/source/background.ts 이거 참고해서 코드 개선.
new MessageHandler([
  new BookmarkManager(),
  new IframeManager(),
  //추가적으로 이벤트 있는것들 여기서 추가
]).execute();
