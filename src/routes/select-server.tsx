import { isAuthenticated } from '@/middlewares/auth';
import cookieParser from '@/utils/cookieParser';
import { getUserGuilds } from '@/utils/discord_wrapper/user';
import Base from '@/views/components/Base';
import SelectServer from '@/views/pages/selectServer';
import { Elysia } from 'elysia';

const selectServer = new Elysia();

selectServer.get('/', async (ctx) => {
    const { headers } = ctx;
    const cookies = cookieParser(headers.cookie);

    if (!cookies.access_token) throw new Error('user un authorised');

    const userGuilds = await getUserGuilds(cookies.access_token);

    if (headers['HX-Boosted']) {
        return <SelectServer guilds={userGuilds} />;
    }
    return (
        <Base>
            <SelectServer guilds={userGuilds} />
        </Base>
    );
});

export const selectServerRoute = new Elysia().guard(
    {
        // @ts-ignore
        beforeHandle: isAuthenticated,
    },
    (app) => app.use(selectServer),
);
