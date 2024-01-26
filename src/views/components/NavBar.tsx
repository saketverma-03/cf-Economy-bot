const NavBar = () => {
    return (
        <>
            <div class="w-full flex justify-center items-center gap-4 bg-zinc-800/30 p-1">
                <div class="w-full flex gap-4 max-w-6xl px-4 text-lg">
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
                </div>
            </div>
        </>
    );
};

export default NavBar;
