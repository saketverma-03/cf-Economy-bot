import { getAllCommunityIn } from '@/db/services/communityService';
import { isAuthenticated } from '@/middlewares/auth';
import { getUserGuilds } from '@/utils/discord_wrapper/user';
import Base from '@/views/components/Base';
import SelectServer from '@/views/pages/selectServer';
import { Elysia } from 'elysia';

const selectServer = new Elysia();

selectServer.get('/', async ({ cookie, headers }) => {
    const { access_token } = cookie;

    const userGuilds = await getUserGuilds(access_token.get());
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
