import { isAuthenticated, isGuildIdInCookie } from '@/middlewares/auth';
import Base from '@/views/components/Base';
import NavBar from '@/views/components/NavBar';
import { Elysia } from 'elysia';

const onboard = new Elysia();

onboard.get('/', async () => {
    return (
        <Base>
            <NavBar />
            <div>{JSON.stringify('saket')} </div>
            <BotSettings />
        </Base>
    );
});

export const botSettingsRoute = new Elysia().guard(
    {
        beforeHandle: (ctx) => {
            isGuildIdInCookie(ctx);
            isAuthenticated(ctx);
        },
    },
    (app) => app.use(onboard),
);

const BotSettings = (params) => {
    const name = 'saket';
    const script = `<script> console.log('${name}') </script>`;
    return (
        <>
            <div class="max-w-6xl w-full p-4">
                <section>
                    <h2 class="text-xl mb-4 ">General Settings</h2>
                    <div>
                        <label
                            for="username"
                            class="block mb-2 text-sm text-gray-500 dark:text-gray-300"
                        >
                            Shiba Coin
                        </label>

                        <input
                            type="text"
                            placeholder="John Doe"
                            class="rounded p-4 bg-background focus-within:bg-zinc-800/10 outline-none border border-transparent focus-within:border-blue-500 "
                        />
                    </div>
                </section>
                <div
                    x-data="{ message: 'saket' , oldMessage: 'saket' }"
                    x-init="$watch('message', value => console.log(oldMessage === message))"
                >
                    <input
                        type="text"
                        x-model="message"
                        class="rounded p-4 mt-4 bg-background focus-within:bg-zinc-800/10 outline-none border border-transparent focus-within:border-blue-500 "
                    />

                    <span x-text="message" />

                    <span>SAVE</span>
                </div>
                {script}
                <section>
                    <h2 class="text-xl mt-8 mb-4 ">General Settings</h2>
                </section>
            </div>
        </>
    );
};
