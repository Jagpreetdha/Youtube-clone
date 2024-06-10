function VideoCard({ info }) {
  if (!info || !info.snippet || !info.statistics) {
    return null;
  }

  // eslint-disable-next-line no-unused-vars
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;
  return (
    <div className="p-2 m-2 w-64 shadow-lg">
      <img className="rounded-lg" src={thumbnails.medium.url} alt="thumbnail" />
      <ul>
        <li className="font-bold py-2">{title}</li>
        <li>{channelTitle}</li>
        <li>{Number(statistics.viewCount).toLocaleString("en-IN")} views</li>
      </ul>
    </div>
  );
}

export function AdVideoCard({info}) {
  return (
    <div className="p-1 m-1 border border-red-900">
      <VideoCard info={info}/>
    </div>
  );
}

export default VideoCard;
