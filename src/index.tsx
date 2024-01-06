import Dashboard from "@/pages/Dashboard";
import { config } from "@config/index";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";
import Base from "./components/Base";
import HomePage from "./pages/HomePage";

new Elysia()
	.use(html())
	.use(staticPlugin())
	.get("/", () => (
		<Base>
			<HomePage />
		</Base>
	))
	.get("/dashboard", () => <Dashboard />)
	.onStart(() => {
		// hot relpoad
		if (config.env.NODE_ENV === "development") {
			void fetch("http://localhost:3001/restart");
			console.log("🦊 Triggering Live Reload");
		}
	})
	.listen(3000);
