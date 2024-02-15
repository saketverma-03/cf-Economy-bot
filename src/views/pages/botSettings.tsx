export default function BotSettings() {
    return (
        <>
            <main id="main" class="max-w-6xl w-full p-4">
                <script src="./public/assits/js/permissions.js"></script>
                <section class="grid gap-3">
                    <h2 class=" mb-4 ">
                        <span class="text-3xl">
                            Manage Role and Command Access
                        </span>
                    </h2>
                    <div x-data={'permsData'}>
                        <button x-on:click="roles.push('extra')">lol</button>
                        <div class="grid grid-cols-1 md:grid-cols-2  gap-4">
                            <template x-for="(role ,index) in roles">
                                <div class="bg-card p-4 rounded-xl border border-border">
                                    <h1
                                        class="text-xl  mb-2"
                                        x-text="role"
                                    ></h1>
                                    {/*add commands manuall here*/}
                                    <div class="flex gap-2 ">
                                        <div class="flex  w-fit has-[:checked]:bg-green-800 items-center border border-zinc-800 rounded-md ">
                                            <label
                                                x-bind:for="role+'p2'"
                                                class="text-sm block p-2 accent-red-600 font-medium rounded "
                                                x-bind:class="!perms.get(role).includes('s') ? '' : 'bg-green-800'"
                                                x-on:click="() => toogleProperty(role,'s')"
                                            >
                                                Checked state
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
