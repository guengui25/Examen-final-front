import { FunctionComponent } from "preact";
import Fav from "../islands/Fav.tsx";
import { VideosDisplayProps } from "../types.ts";

const VideosDisplay: FunctionComponent<VideosDisplayProps> = (
  { videos, userID },
) => {
  return (
    <div class="video-list-container">
      {videos.map((video) => {
        return (
          <div class="video-item" key={video.id}>
            <a href={`/video/${video.id}`} class="video-link">
              <img
                src={video.thumbnail}
                alt={video.title}
                class="video-thumbnail"
              />
              <div class="video-info">
                <h3 class="video-title">{video.title}</h3>
                <p class="video-description">{video.description}</p>
                <p class="video-release-date">
                  Release date: {new Date(video.date).toLocaleDateString()}
                </p>
              </div>
            </a>
            <Fav videoId={video.id} userId={userID} favorite={video.fav} />
          </div>
        );
      })}
    </div>
  );
};

export default VideosDisplay;
