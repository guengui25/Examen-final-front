import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import VideosDisplay from "../components/VideosDisplay.tsx";
import { State } from "../types.ts";
import { Video, VideosDisplayProps } from "../types.ts";

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<State, VideosDisplayProps>) => {
    const userId = ctx.state.id;

    const API_URL = Deno.env.get("API_URL");
    if (!API_URL) throw new Error("API_URL is not set in the .env");

    const response = await fetch(`${API_URL}/videos/${userId}`);

    if (response.status == 200) {
      const videos: Video[] = await response.json();

      return (ctx.render({ videos: videos, userID: userId }));
    } else {
      return ctx.render();
    }
  },
};

const Page = (props: PageProps<VideosDisplayProps>) => {
  return (
    <div class="video-page-container">
      <h1 class="video-list-title">Curso Deno Fresh</h1>
      <VideosDisplay userID={props.data.userID} videos={props.data.videos} />
    </div>
  );
};

export default Page;
