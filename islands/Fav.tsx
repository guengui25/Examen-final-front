import { useState } from "preact/hooks";
import { FunctionComponent } from "preact";

type FavProps = {
  videoId: string;
  userId: string;
  favorite: boolean;
};

const Fav: FunctionComponent<FavProps> = ({ videoId, userId, favorite }) => {
  const [fav_state, setFavState] = useState<boolean>(favorite);

  const onFav = async (videoID: string, userID: string, fav: boolean) => {
    const response = await fetch(
      `https://videoapp-api.deno.dev/fav/${userID}/${videoID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (response.status == 200) {
      console.log("Fav toggled");
      setFavState(!fav);
    } else {
      console.error("Error toggling fav");
    }
  };

  return (
    <button
      onClick={() => onFav(videoId, userId, fav_state)}
      class="fav-button"
    >
      {fav_state ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
    </button>
  );
};

export default Fav;
