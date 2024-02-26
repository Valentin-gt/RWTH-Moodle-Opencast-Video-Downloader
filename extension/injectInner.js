const intervalId = setInterval(() => {
  try {
    let streams =
      window.__paella_instances__[0].videoContainer.player.videoManifest
        .streams[0].sources.mp4;
    let name =
      window.__paella_instances__[0].videoContainer.player.videoManifest
        .metadata.title;
    var videoFound = new CustomEvent("videoFound", {
      detail: { title: name, streams: streams },
    });
    document.dispatchEvent(videoFound);

    clearInterval(intervalId);
  } catch (error) {}
}, 500);
