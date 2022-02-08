import {
  Callback,
  ContentScriptCallback,
  CLOSE_IFRAME,
  OPEN_IFRAME,
  MessageTarget,
  IframeMessageType,
  TARGET_IFRAME,
} from "@hayoung-bookmark/common";

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
    if (message.type === OPEN_IFRAME) {
      const tabID = sender.tab?.id;
      this.open(tabID);
      return;
    }

    if (message.type === CLOSE_IFRAME) {
      const tabID = sender.tab?.id;
      this.close(tabID);
      return;
    }
  };

  open(tabID: number | undefined) {
    if (tabID) {
      chrome.tabs.sendMessage(
        tabID,
        {
          iframeOpen: true,
          to: TARGET_IFRAME,
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
        { iframeOpen: false, to: TARGET_IFRAME } as IframeMessageType,
        function (response) {
          console.log(response);
        }
      );
    }
  }
}
