//

import {
    discordImage,
    generateBotInviteLink,
} from '@/utils/discord_wrapper/general';
import { Guild, isGuildAdmmin } from '@/utils/discord_wrapper/user';
import { config } from '@config/index';

export default function Page({
    guilds,
    communitys,
}: {
    guilds: Guild[];
    communitys: Guild[];
}) {
    return (
        <>
            <main class="p-8">
                <div class={'text-3xl my-8'}>Select Server</div>
                <div class={'text-xl my-4'}>Server With Bot</div>
                <ul class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {communitys.map((item) => (
                        <BotServerCard guild={item} />
                    ))}
                </ul>

                <div class={'text-xl my-4'}>Add Bot To Server</div>
                <ul class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {guilds.map(
                        (item) =>
                            isGuildAdmmin(item.permissions) && (
                                <ServerCard guild={item} />
                            ),
                    )}
                    {guilds.map(
                        (item) =>
                            !isGuildAdmmin(item.permissions) && (
                                <ServerCard guild={item} />
                            ),
                    )}
                </ul>
            </main>
        </>
    );
}

const ServerCard = ({ guild }: { guild: Guild }) => {
    const { id, name, icon, permissions } = guild;
    const isAdmin = isGuildAdmmin(permissions);

    return (
        <>
            <a
                href={generateBotInviteLink(config.env.DISCORD_CLIENT_ID, id)}
                class={`bg-card  border-border  p-2 gap-4 rounded flex items-center border hover:border-primary  ${isAdmin ? ' ' : 'pointer-events-none'} `}
            >
                <div
                    class={`h-16 w-16 grid place-items-center ${isAdmin ? '' : 'grayscale opacity-50'}`}
                >
                    {icon ? (
                        <img
                            loading="lazy"
                            src={discordImage.getGuildIcon(id, icon)}
                            class="rounded"
                            alt=""
                        />
                    ) : (
                        <div class="h-full w-full rounded grid place-items-center bg-zinc-900">
                            {name[0] + name[2]}
                        </div>
                    )}
                </div>
                <div>
                    <p class={`${isAdmin ? '' : 'opacity-50'}`}>{name}</p>
                    <div
                        class={'text-yellow-700 text-sm hover:text-yellow-500'}
                    >
                        {!isGuildAdmmin(permissions)
                            ? 'No Admin Permissions for this Server'
                            : ''}
                    </div>
                </div>
            </a>
        </>
    );
};

const BotServerCard = ({ guild }: { guild: Guild }) => {
    const { id, name, icon, permissions } = guild;
    const isAdmin = isGuildAdmmin(permissions);

    return (
        <>
            <a
                href={`/dashboard/redirect?id=${guild.id}`}
                hx-boost="false"
                class={`bg-card border-border transition-colors p-2 gap-4 rounded flex items-center border hover:border-primary  ${isAdmin ? ' ' : 'pointer-events-none'} `}
            >
                <div
                    class={`h-16 w-16 grid place-items-center ${isAdmin ? '' : 'grayscale opacity-50'}`}
                >
                    {icon ? (
                        <img
                            loading="lazy"
                            src={discordImage.getGuildIcon(id, icon)}
                            class="rounded"
                            alt=""
                        />
                    ) : (
                        <div class="h-full w-full rounded grid place-items-center bg-gradient-to-tr from-green-300/50 to-cyan-400 dark:from-green-950/50 dark:to-cyan-950 ">
                            {name[0] + name[2]}
                        </div>
                    )}
                </div>
                <div>
                    <p class={`${isAdmin ? '' : 'opacity-50'}`}>{name}</p>
                    <div
                        class={'text-yellow-700 text-sm hover:text-yellow-500'}
                    >
                        {!isGuildAdmmin(permissions)
                            ? 'No Admin Permissions for this Server'
                            : ''}
                    </div>
                </div>
            </a>
        </>
    );
};
