const NavBar = () => {
    return (
        <>
            <div class="w-full flex justify-center items-center gap-4 border-b border-border py-2 p-1">
                <div
                    class="w-full flex gap-4 max-w-6xl px-4 text-lg"
                    x-data="{open:false}"
                >
                    <button
                        class={
                            'active:bg-secondary/30 bg-secondary hover:border-primary border border-border px-3 py-1 rounded-xl items-center flex gap-1 '
                        }
                        x-on:click="$refs.md.showModal()"
                        title="switch server"
                    >
                        <span>server title</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-chevrons-down-up opacity-65"
                        >
                            <path d="m7 20 5-5 5 5" />
                            <path d="m7 4 5 5 5-5" />
                        </svg>
                    </button>
                    <dialog
                        x-ref="md"
                        hx-get="/dashboard/ping"
                        hx-trigger="intersect"
                        hx-target="#servers"
                        class="rounded-xl p-4 dark:backdrop:bg-card text-foreground bg-card border border-border "
                    >
                        <div class={''}>
                            <h1 class="mb-4">Select a Server</h1>
                            <div class="grid gap-2 md:grid-cols-2" id="servers">
                                <h1 class="htmx-indicator animate-bounce">
                                    loading animation
                                </h1>
                            </div>
                        </div>
                    </dialog>

                    <a
                        class="hover:text-zinc-100 px-2 py-1 rounded hover:bg-zinc-800"
                        href="/dashboard"
                        hx-target="#main"
                    >
                        DashBoard
                    </a>
                    <a
                        class="hover:text-zinc-100 px-2 py-1 text-zinc-400 rounded hover:bg-zinc-800"
                        href="/bot-settings"
                        hx-target="#main"
                    >
                        Bot Settings
                    </a>
                    <button
                        class="hover:text-red-700 ml-full"
                        hx-delete="/auth"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

export default NavBar;
