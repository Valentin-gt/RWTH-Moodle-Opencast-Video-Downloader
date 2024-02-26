var videos = {};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "saveVideos") {
    var pageUrl = sender.tab.url;
    if (!videos[pageUrl]) {
      videos[pageUrl] = [];
    }
    if (videos[pageUrl].some((video) => video.title === request.title)) return;
    videos[pageUrl].push({ title: request.title, streams: request.streams });
    videos[pageUrl].sort((a, b) => a.title.localeCompare(b.title));
    for (let i = 0; i < videos[pageUrl].length; i++) {
      videos[pageUrl][i].streams.sort((a, b) => a.res.w - b.res.w);
    }

    chrome.runtime.sendMessage(
      { action: "updateVideos", pageUrl, videos },
      function (response) {
        if (chrome.runtime.lastError) {
        }
      }
    );
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getVideos") {
    var pageUrl = request.pageUrl;
    sendResponse({ videos: videos[pageUrl] });
    return true;
  }
});
