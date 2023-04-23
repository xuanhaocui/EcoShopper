async function background() {
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
async function background2() {
  const urlPattern = /https:\/\/*.amazon.com\/*/;
  chrome.webNavigation.onCompleted.addListener(function (details) {
    // Check if the navigation was successful
    // if (details.frameId === 0 && details.tabId !== -1) {
    if (true) {
      // Get the URL of the tab
      chrome.tabs.get(details.tabId, function (tab) {
        if (urlPattern.test(tab.url)) {
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
        }
      });
    }
  });
}
// background();
background2();
