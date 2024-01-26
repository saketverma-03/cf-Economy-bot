import { getAllCommunityIn } from '@/db/services/communityService';
import { isAuthenticated } from '@/middlewares/auth';
import cookieParser from '@/utils/cookieParser';
import { getUserGuilds } from '@/utils/discord_wrapper/user';
import Base from '@/views/components/Base';
import SelectServer from '@/views/pages/selectServer';
import { Elysia } from 'elysia';

const selectServer = new Elysia();

selectServer.get('/', async (ctx) => {
    const { headers } = ctx;
    if (!headers.cookie) {
        throw new Error('not authorised');
    }
    const cookies = cookieParser(headers.cookie);

    if (!cookies.access_token) throw new Error('user un authorised');

    const userGuilds = await getUserGuilds(cookies.access_token);
    const community = await getAllCommunityIn(
        userGuilds.map((guild) => guild.id),
    );
    const gWithBot = [];
    const gWithoutBot = [];
    let flag = false;
    for (const i in userGuilds) {
        flag = false;
        for (const j in community) {
            if (gWithBot.length === community.length) break;
            if (community[j]._id === userGuilds[i].id) {
                gWithBot.push(userGuilds[i]);
                flag = true;
                break;
            }
        }
        if (flag === false) gWithoutBot.push(userGuilds[i]);
    }

    if (headers['HX-Boosted']) {
        return <SelectServer guilds={gWithoutBot} communitys={gWithBot} />;
    }
    return (
        <Base>
            <SelectServer guilds={userGuilds} communitys={gWithBot} />
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
