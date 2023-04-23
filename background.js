chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  chrome.storage.local.set({ info: message });
});
function background() {
  chrome.tabs.query({ url: ["https://*.amazon.com/*"] }, function (tabs) {
    tabs.forEach(function (tab) {
      console.log("Hello");
      chrome.scripting
        .executeScript({
          target: { tabId: tab.id },
          func: function () {
            const regexp =
              /<input type="hidden" name="promiseAsin-[\d*]" value="([a-zA-Z0-9]*)">/;
            const matches = [
              ...document.documentElement.outerHTML.matchAll(regexp),
            ];
            const ids = matches.map((arr) => arr[1]);
            console.log("Bye");
            console.log(ids);
            chrome.runtime.sendMessage(ids);
          },
        })
        .then(function () {
          console.log("Function injected");
        });
    });
  });
}
function background2() {
  const urlPattern = /https:\/\/.*\.amazon\.com\/.*/;
  chrome.webNavigation.onCompleted.addListener(function (details) {
    // Check if the navigation was successful
    // if (details.frameId === 0 && details.tabId !== -1) {
    if (true) {
      // Get the URL of the tab
      chrome.tabs.get(details.tabId, function (tab) {
        if (urlPattern.test(tab.url)) {
          // if (true) {
          console.log(tab);
          chrome.scripting
            .executeScript({
              target: { tabId: tab.id, allFrames: true },
              files: ["client.js"], // has to be separate file to avoid CSP problems
              injectImmediately: true,
            })
            .then(function (result) {
              console.log(result);
              //   console.log("Function injected");
            });
        }
      });
    }
  });
}
// background();
background2();
