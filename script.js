async function fetchData() {
  chrome.runtime.onMessage.addListener(function (
    message,
    sender,
    sendResponse
  ) {
    document.getElementById("content").innerHTML = message;
  });
}
fetchData();
