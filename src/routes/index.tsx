import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import { jwt } from "@elysiajs/jwt";
import { Elysia } from "elysia";
import HomePage from "@/views/pages/HomePage";
import Base from "@/views/components/Base";
import { dashboardRoute } from "./dashboard";
import { OauthRoute } from "./oauth";
import { errorHandler } from "@/middlewares/errorHandler";
import { errors } from "@/middlewares/errorHandler/types";


const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .use(
    jwt({
      name: "jwt",
      secret: "12345",
    }),
  )
  .error(errors)
  .onError(errorHandler)
  .get("/", async ({ jwt, cookie: { name } }) => {
    const token = await jwt.sign({ name: "saketverma" });
    name.value = token;
    return (
      <Base>
        <HomePage />
      </Base>
    );
  }).group('/dashboard', (route) => route.use(dashboardRoute))
  .use(OauthRoute)

export default app;
