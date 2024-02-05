import { discordImage } from '@/utils/discord_wrapper/general';
import { Guild } from '@/utils/discord_wrapper/user';

export const SelectServerCard = ({ guild }: { guild: Guild }) => {
    const { id, name, icon } = guild;

    return (
        <>
            <a
                href={`/dashboard/redirect?id=${guild.id}`}
                hx-target="main"
                class={`bg-zinc-800 p-2 gap-4 rounded flex items-center border border-transparent gra hover:border-primary  `}
            >
                <div class={`h-16 w-16 grid place-items-center `}>
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
                    <p>{name}</p>
                </div>
            </a>
        </>
    );
};
