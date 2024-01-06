import { Elysia } from "elysia";
import { type ElysiaWS } from "elysia/ws";

let wsConnections = new Set<ElysiaWS<any, any>>();

function dispatch() {
  wsConnections.forEach((connection) => {
    // console.log("sending refresh");
    connection.send("refresh");
  });
}

const port = process.argv[2] || 3001;

const app = new Elysia()
  .ws("/ws", {
    open(ws) {
      // console.log("open");
      wsConnections.add(ws);
    },
    close(ws) {
      // console.log("close");
      wsConnections.delete(ws);
    },
    // message(ws, message) {
    //   console.log("message", message);
    // },
  })
  .get("/restart", () => {
    // console.log("recieved restart");
    dispatch();
  })
  .listen(port);

console.log(
  `🦊 Livereload running ${app.server?.hostname}:${app.server?.port}`,
);
export function liveReloadScript({
  debounceTime = 100,
  url = "ws://localhost:3001/ws",
}: {
  url?: string;
  debounceTime?: number;
} = {}): string {
  return `
        let reloadTimeout;
        (function () {
          let socket = new WebSocket(\"${url}\");

          socket.onopen = function(e) {
            console.log("connected")
          };


          socket.onmessage = function(event) {
            console.log("event", event.data)
            // Clear any existing reload timeout
            clearTimeout(reloadTimeout);

            // Set a new reload timeout
            reloadTimeout = setTimeout(() => {
              location.reload();
            }, ${debounceTime});  // 50ms debounce time
          };

          socket.onclose = function(event) {
            console.log("closed");
          };

          socket.onerror = function(error) {
            console.log("error: " + error.message);
          };
        })();
        `;
}
