import {
  Callback,
  ContentScriptCallback,
  CLOSE_IFRAME,
  OPEN_IFRAME,
  MessageTarget,
  IframeMessageType,
  TARGET_IFRAME,
} from "../../shared-types";

export class IframeManager implements MessageTarget {
  installedEvent: Callback[] = [];
  clickIconEvent: Callback[] = [];
  contentScriptEvent: ContentScriptCallback[] = [];

  constructor() {
    this.contentScriptEvent.push(this.contentScriptEventHandler);
  }

  contentScriptEventHandler = async (
    message: any,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void
  ) => {
    console.log("iframe message", message);
    if (message.type === "open_iframe") {
      const tabID = sender.tab?.id;
      this.open(tabID);
      return;
    }

    if (message.type === "close_iframe") {
      const tabID = sender.tab?.id;
      this.close(tabID);
      return;
    }
  };

  open(tabID: number | undefined) {
    console.log("open!", tabID);
    if (tabID) {
      chrome.tabs.sendMessage(
        tabID,
        {
          iframeOpen: true,
          to: "iframe",
        } as IframeMessageType,
        function (response) {
          console.log(response);
        }
      );
    }
  }

  close(tabID: number | undefined) {
    if (tabID) {
      chrome.tabs.sendMessage(
        tabID,
        { iframeOpen: false, to: "iframe" } as IframeMessageType,
        function (response) {
          console.log(response);
        }
      );
    }
  }
}
