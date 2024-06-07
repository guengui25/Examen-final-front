import { FreshContext } from "$fresh/server.ts";
import Header from "../components/Header.tsx";
import { State } from "../types.ts";

export default async function  Layout(_req: Request, ctx: FreshContext<State>) {
    
    const name = await ctx.state.name;
  
    return (
    <div class="page-container">
      <Header name={name} />
      <ctx.Component />
    </div>
  );
}
