import { MessageTarget, ContentScriptMessage } from "./types";
import { CREATE_BOOKMARK, CLOSE_BOOKMARK } from "./constants";

export class MessageHandler<T extends MessageTarget> {
  constructor(public messageTarget: T) {
    this.initializeEvent();
  }

  initializeEvent() {
    this.iconClickHandler();
    this.contentScriptMessageReceiver();
  }

  iconClickHandler() {
    // // When icon clicked
    chrome.action.onClicked.addListener((tab) => {
      // toggle message action 눌러서
      if (tab.id) {
        // send bookmark to contentscript
        this.messageTarget.trigger(); // 보냄
      }
    });
  }

  contentScriptMessageReceiver() {
    // When button clicked in content script
    chrome.runtime.onMessage.addListener(
      (request: ContentScriptMessage, sender, sendResponse) => {
        const tabID = sender.tab?.id;

        if (request.type === CREATE_BOOKMARK) {
          this.messageTarget.create(request);
        }

        // if (request.type === CLOSE_BOOKMARK) {
        //   this.messageTarget.close(tabID);
        // }
      }
    );
  }
}
