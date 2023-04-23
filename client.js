const regexp =
  /<input type="hidden" name="promiseAsin-[\d*]" value="([a-zA-Z0-9]*)">/g;
const matches = [...document.documentElement.outerHTML.matchAll(regexp)];
const ids = matches.map((arr) => arr[1]);
console.log("Bye");
console.log(ids);
chrome.runtime.sendMessage(ids);
