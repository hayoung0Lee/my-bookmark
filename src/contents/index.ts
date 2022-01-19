(async () => {
  console.log("Ts");
  const src = chrome.runtime.getURL("dist/contents/main.js");
  const contentScript = await import(src);
  contentScript.main(/* chrome: no need to pass it */);
})();
