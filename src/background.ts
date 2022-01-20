// Fired when an action icon is clicked. This event will not fire if the action has a popup.
chrome.action.onClicked.addListener((tab) => {
  // toggle message action 눌러서
  if (tab.id) {
    chrome.tabs.sendMessage(tab.id, { toggle: "toggle" }, {}, (res) => {
      console.log(`toggled!!`);
    });
  }
});
