import {
  FreshContext,
  Handlers,
  LayoutConfig,
  PageProps,
} from "$fresh/server.ts";
import { setCookie } from "$std/http/cookie.ts";
import Login from "../components/Login.tsx";
import { Data, User } from "../types.ts";
import jwt from "jsonwebtoken";

export const config: LayoutConfig = {
  skipInheritedLayouts: true, // Skip already inherited layouts
};

export const handler: Handlers = {
  POST: async (req: Request, ctx: FreshContext<unknown, Data>) => {
    const url = new URL(req.url);
    const headers = new Headers();

    const form = await req.formData();
    const email = form.get("email")?.toString() || "";
    const password = form.get("password")?.toString() || "";

    const JWT_SECRET = Deno.env.get("JWT_SECRET");
    if (!JWT_SECRET) throw new Error("JWT_SECRET is not set in the .env");

    const API_URL = Deno.env.get("API_URL");
    if (!API_URL) throw new Error("API_URL is not set in the .env");

    const response = await fetch(API_URL + "/checkuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.status == 404 || response.status == 400) {
      return ctx.render({
        message: "Incorrect credentials or user does not exist",
      });
    }

    if (response.status == 200) {
      const data: Omit<User, "password"> = await response.json();

      const token = jwt.sign(
        { email: data.email, id: data.id, name: data.name },
        JWT_SECRET,
        { expiresIn: "24h" },
      );

      setCookie(headers, {
        name: "auth",
        value: token,
        sameSite: "Lax",
        domain: url.hostname,
        path: "/",
        secure: true,
      });

      headers.set("location", "/videos");

      return new Response(null, {
        status: 303,
        headers,
      });
    } else {
      return ctx.render({ message: "Unknown error" });
    }
  },
};

const Page = (props: PageProps<Data>) => (
  <Login
    message={props.data?.message}
  />
);

export default Page;
