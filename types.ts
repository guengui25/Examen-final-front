export type State = {
  email: string;
  name: string;
  id: string;
};

export type Data = {
  message?: string;
};

export type User = {
  email: string;
  password: string;
  id: string;
  name: string;
};

export type Video = {
  title:string,
  thumbnail: string,
  description: string,
  duration: number,
  youtubeid: string,
  date: string,
  id: string,
  fav: boolean
}

export type VideosDisplayProps = {
  videos: Video[];
  userID: string;
};

export type VideoProps = {
  video: Video;
  userID: string;
};

