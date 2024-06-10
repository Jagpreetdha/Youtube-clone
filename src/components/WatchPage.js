import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import { GOOGLE_API_KEY } from "../utils/contants";
import CommentContainer from "./CommentContainer";
import LiveChat from "./LiveChat";

function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M"; // Formats to millions
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K"; // Formats to thousands
  }
  return num.toString(); // Returns the number as is if less than 1000
}

function WatchPage() {
  const [searchParams] = useSearchParams();
  // eslint-disable-next-line no-unused-vars
  const [videoData, setVideoData] = useState(null);

  const videoId = searchParams.get("v");
  const dispatch = useDispatch();
  async function getVideoId() {
    const data = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${GOOGLE_API_KEY}`
    );
    const json = await data.json();
    console.log(json);
    setVideoData(json);
  }
  useEffect(
    function () {
      dispatch(closeMenu());
    },
    [dispatch]
  );
  useEffect(function () {
    getVideoId();
  }, []);
  return (
    <div className="flex ">
      <div className="flex flex-col">
        <div className="col-span-11 p-6">
          <iframe
            width="1000"
            height="500"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen></iframe>
          {videoData ? (
            <h3 className="font-bold text-xl mt-2 px-6">
              {videoData.items[0].snippet.title}
            </h3>
          ) : null}
          <div className="flex items-center mt-2">
            <div>
              {videoData ? (
                <p className="font-bold px-6 text-sm mt-2 text-gray-700 ">
                  {videoData.items[0].snippet.channelTitle} ✅
                </p>
              ) : null}
              {videoData ? (
                <p className="font-bold px-6 text-xs  text-gray-700 opacity-50">
                  {formatNumber(
                    Number(videoData.items[0].statistics.viewCount)
                  )}{" "}
                  viewcount
                </p>
              ) : null}
            </div>

            <button className="bg-black text-white px-4 py-2 rounded-3xl ml-2 mt-2 text-sm">
              Subscribe
            </button>

            {videoData ? (
              <button className="ml-16 bg-gray-200 px-2 py-2 rounded-l-lg border-r-2 border-black ">
                👍{formatNumber(+videoData.items[0].statistics.likeCount)}
              </button>
            ) : null}
            <button className=" bg-gray-200 px-2 py-2 rounded-r-lg">👎</button>
          </div>
        </div>
        <CommentContainer />
      </div>
      <LiveChat />
    </div>
  );
}

export default WatchPage;
