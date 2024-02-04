import { LoadCommands } from '@/discord/loader';
import { isAuthenticated } from '@/middlewares/auth';
import { createCommunity } from '@/db/services/communityService';
import { Elysia } from 'elysia';

const onboard = new Elysia();

onboard.get('/', async ({ query, set }) => {
    // TODO: add more steps if required
    await createCommunity({ guildId: query.guild_id });
    const guildId = query.guild_id;
    console.log(guildId);
    LoadCommands(guildId);

    return (set.redirect = '/dashboard');
});

export const onBoardRoute = new Elysia().guard(
    {
        beforeHandle: isAuthenticated,
    },
    (app) => app.use(onboard),
);
