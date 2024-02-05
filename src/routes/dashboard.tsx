import { getAllCommunityIn } from '@/db/services/communityService';
import { isAuthenticated } from '@/middlewares/auth';
import { getUserGuilds } from '@/utils/discord_wrapper/user';
import Base from '@/views/components/Base';
import NavBar from '@/views/components/NavBar';
import { SelectServerCard } from '@/views/components/selectServerCard';
import Dashboard from '@/views/pages/Dashboard';
import { Elysia, t } from 'elysia';

const route = new Elysia();
route.get('/ping', async ({ cookie }) => {
    const { access_token } = cookie;

    const userGuilds = await getUserGuilds(access_token.get());
    const community = await getAllCommunityIn(
        userGuilds.map((guild) => guild.id),
    );
    const gWithBot = [];

    // NOTE: scope for improvment
    for (const i in userGuilds) {
        for (const j in community) {
            if (gWithBot.length === community.length) break;
            if (community[j]._id === userGuilds[i].id) {
                gWithBot.push(userGuilds[i]);
                break;
            }
        }
    }

    return (
        <>
            {gWithBot.map((guild) => (
                <SelectServerCard guild={guild} />
            ))}
        </>
    );
});
route.get('/', (ctx) => {
    const { headers } = ctx;
    if (headers['hx-boosted']) {
        return (
            <>
                <Dashboard />
            </>
        );
    }
    return (
        <Base>
            <NavBar />
            <Dashboard />
        </Base>
    );
});

route.get(
    '/redirect',
    ({ query, cookie, set }) => {
        cookie.guildId.set({
            value: query.id,
        });

        set.redirect = '/dashboard';
    },
    {
        query: t.Object({
            id: t.String(),
        }),
    },
);

export const dashboardRoute = new Elysia().guard(
    {
        beforeHandle: isAuthenticated,
    },
    (app) => app.use(route),
);
