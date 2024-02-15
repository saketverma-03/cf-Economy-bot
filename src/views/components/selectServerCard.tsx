import { discordImage } from '@/utils/discord';
import { Guild } from '@/selector/discord/user';

export const SelectServerCard = ({ guild }: { guild: Guild }) => {
    const { id, name, icon } = guild;

    return (
        <>
            <a
                href={`/dashboard/redirect?id=${guild.id}`}
                hx-target="main"
                class={`bg-cardy transition-colors p-2 shadow-sm gap-4 rounded flex items-center border border-transparent dark:border-border hover:border-primary  `}
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
                        <div class="h-full text-foreground from-amber-50 dark:text-foreground w-full rounded grid place-items-center bg-gradient-to-tr dark:from-cyan-950 ">
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
