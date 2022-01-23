import { MessageTarget } from "./types";

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
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      const tabID = sender.tab?.id;

      if (request.type === "create_bookmark") {
        this.messageTarget.create({
          title: "Test",
          url: "https://hayoung-techlog.com/",
        });
      }

      if (request.type === "close_bookmark") {
        this.messageTarget.close(tabID);
      }
    });
  }
}
