export default function BotSettings() {
    const commands = ['commandX', 'commandY'];
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
                        <button
                            class="btn btn-primary my-2"
                            x-on:click="handleSubmit"
                        >
                            save changes
                        </button>
                        <div class="grid grid-cols-1 md:grid-cols-2  gap-4">
                            <template x-for="[id, value] in Object.entries(roles.perms)">
                                <div class="bg-card p-4 rounded-xl border border-border">
                                    <h1
                                        class="text-xl mb-2"
                                        x-text="getNameById(id)"
                                    ></h1>
                                    <div class="flex gap-2 ">
                                        {commands.map((item) => (
                                            <Btn action={item} />
                                        ))}
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

const Btn = ({ action }: { action: string }) => {
    return (
        <>
            <label
                class="text-sm block border border-border p-2 accent-red-600 font-medium rounded-xl "
                x-bind:class={`!value.includes('${action}') ? 'opacity-60' : 'bg-green-800'`}
                x-on:click={`() => toogleProperty(id,'${action}')`}
            >
                {action}{' '}
            </label>
        </>
    );
};
