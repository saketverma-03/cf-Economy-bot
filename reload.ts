
export function liveReloadScript({
  debounceTime = 100,
  url = "ws://localhost:3001/ws",
}: {
  url?: string;
  debounceTime?: number;
} = {}): string {
  return `
        (function () {
          let ws = new WebSocket(\"${url}\");

          ws.onopen = function(e) {
            console.log("connected")
          };


ws.addEventListener('message', (msg) => {
console.log("::recived:message");

    window.location.reload()
});

          ws.onclose = function(event) {
            console.log("closed");
          };

          ws.onerror = function(error) {
            console.log("error: " + error.message);
          };
        })();
        `;
}
