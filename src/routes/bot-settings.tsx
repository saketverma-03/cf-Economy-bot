import { isAuthenticated } from '@/middlewares/auth';
import Base from '@/views/components/Base';
import NavBar from '@/views/components/NavBar';
import { Elysia } from 'elysia';

const onboard = new Elysia();

onboard.get('/', async (ctx) => {
    if (ctx.headers['hx-boosted']) {
        return <BotSettings />;
    }

    return (
        <Base>
            <NavBar />
            <BotSettings />
        </Base>
    );
});

export const botSettingsRoute = new Elysia().guard(
    {
        beforeHandle: (ctx) => isAuthenticated(ctx),
    },
    (app) => app.use(onboard),
);

const BotSettings = () => {
    return (
        <>
            <main id="main" class="max-w-6xl w-full p-4">
                <h2 class=" mb-4 ">
                    <span class="text-xl">General Settings </span>
                    <span class="mx-2">
                        {' '}
                        <button class="px-2 rounded text-sm py-1 bg-green-800">
                            Update
                        </button>{' '}
                    </span>
                </h2>
                <section class="flex mb-4 flex-col md:flex-row md:gap-4">
                    <div>
                        <label
                            for="username"
                            class="block mb-2 text-sm text-gray-500 dark:text-gray-300"
                        >
                            Currency Name
                        </label>

                        <input
                            type="text"
                            placeholder="John Doe"
                            class="rounded p-2 bg-background focus-within:bg-zinc-800/10 outline-none border border-transparent focus-within:border-blue-500 "
                        />
                    </div>
                    <div>
                        <label
                            for="username"
                            class="block mb-2 text-sm text-gray-500 dark:text-gray-300"
                        >
                            Tax per transaction
                        </label>

                        <input
                            type="text"
                            placeholder="John Doe"
                            class="rounded p-2 bg-background focus-within:bg-zinc-800/10 outline-none border border-transparent focus-within:border-blue-500 "
                        />
                    </div>
                </section>

                <section class="grid gap-3">
                    <h2 class=" mb-4 ">
                        <span class="text-xl">
                            Manage Role and Command Access
                        </span>
                        <span class="mx-2">
                            {' '}
                            <button class="px-2 rounded text-sm py-1 bg-green-800">
                                Update
                            </button>{' '}
                        </span>
                    </h2>
                    <button>+ add role</button>
                    <div>
                        <h3>Role A</h3>
                        <div class="grid md:grid-cols-3 gap-2 mt-2">
                            <div class="p-4 bg-zinc-800/50 text-zinc-300 rounded">
                                commannd a
                            </div>

                            <div class="p-4 opacity-45 bg-zinc-800 rounded">
                                commannd a
                            </div>
                            <div class="p-4 bg-zinc-800/50 text-zinc-300 rounded">
                                commannd a
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3>Role A</h3>
                        <div class="grid md:grid-cols-3 gap-2 mt-2">
                            <div class="p-4 bg-zinc-800/50 text-zinc-300 rounded">
                                commannd a
                            </div>

                            <div class="p-4 opacity-45 bg-zinc-800 rounded">
                                commannd a
                            </div>
                            <div class="p-4 bg-zinc-800/50 text-zinc-300 rounded">
                                commannd a
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3>Role A</h3>
                        <div class="grid md:grid-cols-3 gap-2 mt-2">
                            <div class="p-4 bg-zinc-800/50 text-zinc-300 rounded">
                                commannd a
                            </div>

                            <div class="p-4 opacity-45 bg-zinc-800 rounded">
                                commannd a
                            </div>
                            <div class="p-4 bg-zinc-800/50 text-zinc-300 rounded">
                                commannd a
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3>Role A</h3>
                        <div class="grid md:grid-cols-3 gap-2 mt-2">
                            <div class="p-4 bg-zinc-800/50 text-zinc-300 rounded">
                                commannd a
                            </div>

                            <div class="p-4 opacity-45 bg-zinc-800 rounded">
                                commannd a
                            </div>
                            <div class="p-4 bg-zinc-800/50 text-zinc-300 rounded">
                                commannd a
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};
