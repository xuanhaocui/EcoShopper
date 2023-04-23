chrome.storage.local.get("info", function (data) {
  // document.getElementById("content").innerHTML = data.info;
  const ids = data.info;
  fetch("http://localhost:8000/api/query", {
    method: "POST",
    body: JSON.stringify({
      asins: ids,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then(function (response) {
    if (response.ok) {
      document.getElementById("content").innerHTML = JSON.stringify(response);
    } else {
      console.warn("Something went wrong", response);
    }
  });
});
