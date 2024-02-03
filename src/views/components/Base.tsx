import { Html } from '@elysiajs/html';
import { liveReloadScript } from '../../../reload';
import { config } from '@config/index';

const safeScript =
    config.env.NODE_ENV === 'devlopment' ? liveReloadScript() : '';

const Base = (props: Html.PropsWithChildren) => {
    return (
        <>
            <html lang="en" class="dark">
                <head>
                    <meta charset="UTF-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0"
                    />
                    <title>Document</title>
                    <link rel="stylesheet" href="/public/dist/index.css" />
                    <script
                        src="https://unpkg.com/htmx.org@1.9.10"
                        integrity="sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC"
                        crossorigin="anonymous"
                    />
                    <script>{safeScript}</script>
                    <script
                        defer
                        src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"
                    />
                </head>

                <body
                    hx-boost="true"
                    class="min-h-screen font-geist w-full bg-zinc-900 text-foreground flex flex-col items-center "
                >
                    {props.children}
                </body>
            </html>
        </>
    );
};

export default Base;
