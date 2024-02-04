const NavBar = () => {
    return (
        <>
            <div class="w-full flex justify-center items-center gap-4 bg-zinc-800/30 p-1">
                <div
                    class="w-full flex gap-4 max-w-6xl px-4 text-lg"
                    x-data="{open:false}"
                >
                    <button
                        class={'active:bg-gray-700'}
                        x-on:click="$refs.md.showModal()"
                    >
                        switch server
                    </button>
                    <dialog
                        class={
                            'p-6 bg-gray-700 text-white border hover:border-blue-800'
                        }
                        x-ref="md"
                        hx-get="/dashboard/ping"
                        hx-trigger="intersect"
                    >
                        {' '}
                        things{' '}
                        <h1 class="htmx-indicator animate-bounce">
                            Loading ...
                        </h1>
                    </dialog>
                    <div x-show="open" class="fixed h-1/2 w-1/2 bg-blue-950">
                        Dropdown Contents...
                    </div>
                    <a
                        class="hover:text-zinc-100 px-2 py-1 rounded hover:bg-zinc-800"
                        href="/dashboard"
                    >
                        DashBoard
                    </a>
                    <a
                        class="hover:text-zinc-100 px-2 py-1 text-zinc-400 rounded hover:bg-zinc-800"
                        href="/bot-settings"
                        hx-target="main"
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
