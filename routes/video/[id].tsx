import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import VideoDisp from "../../components/VideoDisp.tsx";
import { State,Video, VideoProps } from "../../types.ts";

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<State, VideoProps>) => {
    const userId = ctx.state.id;
    const videoID = ctx.params.id;

    console.log(videoID)

    const API_URL = Deno.env.get("API_URL");
    if (!API_URL) throw new Error("API_URL is not set in the .env");

    const response = await fetch(`${API_URL}/video/${userId}/${videoID}`);

    if (response.status == 200) {
      const video: Video = await response.json();

      return (ctx.render({ video: video, userID: userId }));
    } else {
      return new Response("",
        {
        status: 307,
        headers: {location: "/videos"}
        }
      )
    }
  },
};

const Page = (props: PageProps<VideoProps>) => {
  return (
    <VideoDisp userID={props.data.userID} video={props.data.video}/>
  );
};

export default Page;