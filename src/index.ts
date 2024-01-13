import app from "@/routes/index";
import { config } from "@config/index";
import dbConnect from "@/db/dbConnect";

dbConnect().then(() => {
  app
    .onStart(() => {
      if (config.env.NODE_ENV === "devlopment") {
        fetch("http://localhost:3001/restart");
        console.log("🦊 Triggering Live Reload");
      }
    })
    .listen(3000, () => console.log("STARTED: 3000"));
})
