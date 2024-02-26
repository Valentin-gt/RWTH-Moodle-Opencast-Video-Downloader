import Accordion, { AccordionItem } from "./Components/Accordion";
import NoFile from "./Components/NoFile";
import "./App.css";
import { useEffect } from "react";
import { useState } from "react";

const initiateDownload = (url, filename) => {
  chrome.downloads.download({ url, filename });
};

function App() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const queryTabsAndSendMessage = () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.runtime.sendMessage(
          { action: "getVideos", pageUrl: tabs[0].url },
          function (response) {
            if (chrome.runtime.lastError) {
              // Handle errors from sendMessage (e.g., no listener exists)
              console.error(
                "sendMessage failed: ",
                chrome.runtime.lastError.message
              );
              return;
            }
            if (response && response.videos) {
              setVideos(response.videos);
            }
          }
        );
      });
    };

    queryTabsAndSendMessage();
  }, []);

  useEffect(() => {
    const handleMessage = (request) => {
      if (request.action === "updateVideos") {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            if (tabs[0].url !== request.pageUrl) return;
            setVideos(request.videos[request.pageUrl]);
          }
        );
      }
    };
    chrome.runtime.onMessage.addListener(handleMessage);
  }, []);

  return (
    <>
      <h1>Moodle Downloader</h1>
      {videos.length > 0 ? (
        <div className="video-list">
          <Accordion>
            {videos.map((video, index) => (
              <AccordionItem key={index} value={index} trigger={video.title}>
                {video.streams.map((stream, index) => (
                  <a
                    className="accordion-button"
                    onClick={() =>
                      initiateDownload(
                        stream.src,
                        `${video.title}.${stream.src.split(".").pop()}`
                      )
                    }
                    key={index}
                  >
                    {stream.res.w} x {stream.res.h}
                  </a>
                ))}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ) : (
        <NoFile />
      )}
    </>
  );
}

export default App;
