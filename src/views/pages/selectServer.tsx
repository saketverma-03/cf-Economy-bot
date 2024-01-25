//

import { Guild } from '@/utils/discord_wrapper/user';

export default function Page({ guilds }: { guilds: Guild[] }) {
    return (
        <>
            <main>
                <div>Hellow this is it</div>
                <ul>
                    {guilds.map((item) => (
                        <li>{item.name}</li>
                    ))}
                </ul>
            </main>
        </>
    );
}
