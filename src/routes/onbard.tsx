import { isAuthenticated } from '@/middlewares/auth';
import cookieParser from '@/utils/cookieParser';
import { getUserData } from '@/utils/discord_wrapper/user';
import Base from '@/views/components/Base';
import { Elysia } from 'elysia';

const onboard = new Elysia();

onboard.get('/', async (ctx) => {
    const { headers } = ctx;

    if (!headers.cookie) {
        throw new Error('not authorised');
    }
    const cookies = cookieParser(headers.cookie);
    const user = await getUserData(cookies?.access_token);
    // TODO:update securety
    // const newCommunity = await createCommunity({ guildId: query.guild_id });

    if (!cookies.access_token) throw new Error('user un authorised');
    return (
        <Base>
            <div>{JSON.stringify(user.username)} </div>
        </Base>
    );
});

export const onBoardRoute = new Elysia().guard(
    {
        beforeHandle: isAuthenticated,
    },
    (app) => app.use(onboard),
);
