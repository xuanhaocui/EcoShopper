chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log("Message received");
  document.getElementById("content").innerHTML = message;
});
