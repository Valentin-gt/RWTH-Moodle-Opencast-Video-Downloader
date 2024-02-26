const script = document.createElement("script");
script.src = chrome.runtime.getURL("injectInner.js");
document.body.append(script);

document.addEventListener("videoFound", function (e) {
  var title = e.detail.title;
  var streams = e.detail.streams;
  chrome.runtime.sendMessage({ action: "saveVideos", title, streams });
});
