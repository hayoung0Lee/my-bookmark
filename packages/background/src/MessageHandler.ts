import {
  MessageTarget,
  ContentScriptCallback,
  Callback,
} from "../../shared-types";

export class MessageHandler<T extends MessageTarget> {
  private installedEvent: Callback[] = [];
  private clickIconEvent: Callback[] = [];
  private contentScriptEvent: ContentScriptCallback[] = [];

  constructor(private messageTarget: T[]) {
    this.registerEvents();
  }

  registerEvents() {
    this.messageTarget.map((mt) => {
      this.installedEvent.push(...mt.installedEvent);
      this.clickIconEvent.push(...mt.clickIconEvent);
      this.contentScriptEvent.push(...mt.contentScriptEvent);
    });
  }

  installedHandler = (callback: Callback[]) => {
    // installed Event
    chrome.runtime.onInstalled.addListener(
      (details: chrome.runtime.InstalledDetails) => {
        callback.map((cb) => {
          console.log(details);
          cb();
        });
      }
    );
  };

  clickIconHandler = (callback: Callback[]) => {
    chrome.action.onClicked.addListener((tab) => {
      console.log(tab);
      if (tab.id) {
        // send bookmark to contentscript
        callback.map((cb) => {
          cb();
        });
      }
    });
  };

  contentScriptHandler = (callback: ContentScriptCallback[]) => {
    // When button clicked in content script
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      callback.map((cb) => {
        cb(request, sender, sendResponse);
      });
    });
  };

  execute = () => {
    this.installedHandler(this.installedEvent);
    this.clickIconHandler(this.clickIconEvent);
    this.contentScriptHandler(this.contentScriptEvent);
  };
}
