import { Html } from "@elysiajs/html";
const App = (props: Html.PropsWithChildren) => {
  return (
    <>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Document</title>
          <link rel="stylesheet" href="/public/dist/index.css" />
          <script src="https://unpkg.com/htmx.org@1.9.10" integrity="sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC" crossorigin="anonymous" />
        </head>
        <body id="body" />
      </html>
      <h1
        onclick="ddd"
        class="bg-red-200 text-gray-500"
      >
        Hellow World
      </h1>
      <button
        hx-get="/api/data"
        hx-trigger="click"
        hx-target="#data"
        class="bg-blue-600 px-2 py-1 m-4 hover:bg-blue-800 rounded-md text-white"> Click me</button>
      <p id={"data"} >
        data
      </p>
    </>
  );
};

export default App;
