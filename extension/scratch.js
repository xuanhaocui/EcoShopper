async function background() {
  chrome.tabs.query({ url: ["https://*.amazon.com/*"] }, function (tabs) {
    tabs.forEach(function (tab) {
      console.log("Hello");
      chrome.scripting
        .executeScript({
          target: { tabId: tab.id },
          func: function () {
            console.log("Bye");
          },
        })
        .then(function () {
          console.log("Function injected");
        });
    });
  });
}
background();
