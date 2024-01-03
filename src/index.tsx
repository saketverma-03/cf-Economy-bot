import { html } from "@elysiajs/html";
import { Elysia } from "elysia";
import App from "./components/Base";

import { staticPlugin } from "@elysiajs/static";

new Elysia()
  .use(html())
  .use(staticPlugin())
  .get("/jsx", () => <App />)
  .get("/api/data", () => {
    const Component = () => <div>Hellow world</div>
    return <Component />
  })
  .listen(3000);
